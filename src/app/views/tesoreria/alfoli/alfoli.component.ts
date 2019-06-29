import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlfoliService } from '../../../services/alfoli.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../../../helpers/helper';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface Field {
    id: string,
    data: any
}


@Component({
    selector: 'app-alfoli',
    templateUrl: './alfoli.component.html',
    styleUrls: ['./alfoli.component.scss']
})
export class AlfoliComponent implements OnInit, OnDestroy {


    fields2 = new Array<Field>();
    fields3 = new Array<Field>();

    fields4 = new Array<string>();
    fields5 = new Array<string>();

    totalOfrenda: string;
    total: string;

    form: FormGroup;

    id: string;

    options: string[] = [];

    suscription: Subscription;

    constructor(
        private service: AlfoliService,
        private fb: FormBuilder,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("id")

        this.form = this.fb.group({
            Nombre: ['', Validators.required],
            Diezmo: ['', Validators.required]
        });

        let fields = [];
        let seft = this;
        this.service.getFields().subscribe((res: any) => {
            res.forEach(function (doc) {
                fields.push({ id: doc.id, data: doc.data() });
                seft.form.addControl(doc.data().Input, new FormControl(''));
            });
            seft.form.updateValueAndValidity();
            this.fields2 = fields.filter(x => x.data.Grupo == 2);
            this.fields3 = fields.filter(x => x.data.Grupo == 3);

            this.totalOfrenda = this.fields2.filter(x => x.data.Readonly)[0].data.Input;
            this.total = this.fields3.filter(x => x.data.Readonly)[0].data.Input;

            this.fields4 = this.fields2.filter(x => !x.data.Readonly).map(x => x.data.Input);
            this.fields5 = this.fields3.filter(x => !x.data.Readonly).map(x => x.data.Input);
            this.fields5.push("Diezmo");
            this.fields5.push(this.totalOfrenda);

            if (this.id !== null)
                this.service.findAlfoli(this.id).subscribe((res: any) => {
                    this.ShowAlfoli(res.data());
                });
        });

        this.suscription = this.form.get("Nombre").valueChanges.pipe(
            startWith(''),
            switchMap(value => this.service.searchUser(value))
        ).subscribe((res: any) => {
            this.options = res;
        });
    }

    ShowAlfoli(data: any) {
        for (const key in data) {
            let value = data[key];
            if (Array.isArray(value))
                this.GetValuesArray(value);
            else {
                let control = this.form.get(key);
                if (control !== null) {
                    if (typeof value === 'number')
                        control.setValue(Helper.formatNumber(value));
                    else
                        control.setValue(value);
                }
            }
        }
    }

    GetValuesArray(array: Array<any>) {
        array.forEach(item => {
            let obj = {};
            obj[item.Name] = item.Value;
            this.ShowAlfoli(obj);
        });
    }

    sumarOfrendas(array: Array<string>, output: string, flag: boolean = false) {
        let suma = 0;
        array.forEach(x => {
            let input = this.form.get(x);
            let value = Helper.convertToNumber(input.value)
            if (value != 0) {
                suma += value;
                input.setValue(Helper.formatNumber(value));
            }
        });
        this.form.get(output).setValue(Helper.formatNumber(suma));
        if (flag)
            this.sumarOfrendas(this.fields5, this.total);
    }

    onSubmit(value: any) {
        let hoy = new Date();
        let alfoli = this.GetAlfoliSave(value);
        if (this.id === undefined) {
            alfoli.FechaRegistro = hoy;
            alfoli.Fecha = this.PreviusSabat(hoy);
            this.service.createAlfoli(alfoli)
        } else {
            let alfoli = this.GetAlfoliSave(value);
            alfoli.FechaActualiza = hoy;
            this.service.updateAlfoli(this.id, alfoli);
        }
        this.form.reset();
    }

    GetAlfoliSave(value: any): any {
        let alfoli: any = {};
        alfoli.Nombre = value.Nombre.toUpperCase();
        alfoli.Diezmo = Helper.convertToNumber(value.Diezmo);
        let obj = this.clean(value);

        let campos = this.fields2.concat(this.fields3.filter(x => !x.data.Especial));
        alfoli.Detalle = this.MapValues(campos, obj);

        let otros = this.fields3.filter(x => x.data.Especial);
        alfoli.Especiales = this.MapValues(otros, obj);
        return alfoli;
    }

    private MapValues(array: Array<Field>, obj: any): any[] {
        let newArray = [];
        array.filter(x => {
            if (obj[x.data.Input] !== undefined) {
                newArray.push({
                    Name: x.data.Input,
                    Label: x.data.Nombre,
                    Value: Helper.convertToNumber(obj[x.data.Input])
                });
            }
        });
        return newArray;
    }

    PreviusSabat(fecha: Date) {
        let dia = fecha.getDay() + 1;
        let hoy = new Date(fecha.valueOf());
        hoy.setDate(hoy.getDate() - dia);
        hoy.setHours(0, 0, 0);
        return hoy;
    }

    clean(obj: any): any {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
        return obj;
    }

    ngOnDestroy(): void {
        this.suscription.unsubscribe();
    }

}
