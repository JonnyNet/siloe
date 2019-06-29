import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { IglesiaService } from '../../../services/iglesia.service';

@Component({
    selector: 'app-iglesia',
    templateUrl: './iglesia.component.html',
    styleUrls: ['./iglesia.component.scss']
})
export class IglesiaComponent implements OnInit, OnDestroy {

    form: FormGroup;
    subscription: Subscription;

    dataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = ['nombre', 'direccion', 'ciudad', 'departamento', 'ver'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private build: FormBuilder, private service: IglesiaService) { }

    ngOnInit() {
        this.subscription = this.service.getAllAsyncglesias().subscribe((res) => {
            this.dataSource = new MatTableDataSource<any>(res);
        });

        this.form = this.build.group({
            uid: [''],
            nombre: ['', Validators.required],
            direccion: ['', Validators.required],
            ciudad: ['', Validators.required],
            departamento: ['', Validators.required],
            celular: [''],
            telefono: [''],
            email: ['', Validators.email]
        });
    }

    onSubmit(value: any) {
        const hoy = new Date();

        for (const key in value)
            value[key] = value[key].toUpperCase();

        if (value.uid === undefined || value.uid === '') {
            delete value['uid'];
            value.fecha = hoy;
            this.service.createIglesia(value).subscribe((res) => {
                this.form.reset();
            });
        } else {
            value.fechaActualiza = hoy;
            this.service.updateIglesia(value.uid, value);
        }
    }

    VerRegistro(data: any) {
        this.form.patchValue(data);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
