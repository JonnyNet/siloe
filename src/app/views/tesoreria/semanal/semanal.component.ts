import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Helper } from '../../../helpers/helper';
import { PdfService } from '../../../services/pdf.service';
import { SemanalService } from '../../../services/semanal.service';

const asociacion = [
    {
        label: "Iglesia Mundial 20%",
        id: "mundial"
    },
    {
        label: "Desarrollo Misión 20%",
        id: "mision"
    },
    {
        label: "Desarrollo Zonal ó Distrital 10%",
        id: "zonal"
    },
    {
        label: "Total Fondos Asociasión",
        id: "totalfondos"
    }
];

const local = [
    {
        label: "Iglesia Local 50%",
        id: "local"
    },
    {
        label: "Ofrenda Especial",
        id: "ofrenda"
    },
    {
        label: "Total Iglesia Local",
        id: "totallocal"
    }
];

export class Asociasion {
    mundial: string;
    mision: string;
    zonal: string;
    totalfondos: string;
    local: string;
    ofrenda: string;
    totallocal: string;
}

@Component({
    selector: 'app-semanal',
    templateUrl: './semanal.component.html',
    styleUrls: ['./semanal.component.scss']
})
export class SemanalComponent {

    camposfondo = asociacion;
    camposlocal = local;
    fondos = new Asociasion();

    mensaje: string = undefined;

    ofrenda: number;

    date = new FormControl('', Validators.required);
    dataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = ['Nombre', 'Index', 'Total', 'Diezmo', 'TotalOfrenda', 'Especiales', 'Observa', 'Ver'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private service: SemanalService,
        private router: Router,
        private pdf: PdfService) {

    }

    InitData() {
        this.dataSource = new MatTableDataSource<any>();
        this.fondos = new Asociasion();
        this.mensaje = "No hay registros para esta semana";
    }

    myFilter = (d: Date): boolean => {
        const day = d.getDay();
        return day === 6;
    }

    buscar = (event: MatDatepickerInputEvent<Date>) => {
        if (this.date.valid) {
            let desde = event.value;
            let hasta = new Date(event.value.valueOf());
            hasta.setDate(hasta.getDate() + 6);
            this.service.getDataSemana(this.formatDate(desde), this.formatDate(hasta)).subscribe((res: any) => {
                if (res.length == 0)
                    this.InitData();
                else {
                    this.dataSource = new MatTableDataSource<any>(res);
                    this.InitForm(res);
                    this.mensaje = undefined;
                }
            });
        }
    }

    InitForm(data: any) {
        if (data.length > 0) {
            this.ofrenda = this.sumaTotal("TotalOfrenda", false);
            let veinte = Helper.formatNumber(this.ofrenda * 0.20);
            let result = this.ofrenda * 0.50;
            let pro = this.ofrendaEspecial();

            let cinco = Helper.formatNumber(result);
            this.fondos.mundial = veinte;
            this.fondos.mision = veinte;
            this.fondos.zonal = Helper.formatNumber(this.ofrenda * 0.10);
            this.fondos.totalfondos = cinco;
            this.fondos.local = cinco;
            this.fondos.ofrenda = Helper.formatNumber(pro);
            this.fondos.totallocal = Helper.formatNumber(result + pro);
        }
    }

    formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0]
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    sumaTotal(name: string, flag: boolean = true): any {
        let value = this.dataSource.data;
        if (value.length > 0) {
            let suma = 0;
            let parcial = value
                .map(x => Helper.convertToNumber(x[name]));

            if (parcial.length > 0)
                suma += parcial
                    .reduce((suma, item) => {
                        return suma + item;
                    });

            if (flag)
                return suma.toLocaleString('es-CO');
            return suma;
        }
    }

    sumaEspecial(): string {
        let value = this.dataSource.data;
        if (value.length > 0) {
            let suma = 0;
            value.forEach(item => {
                let parcial = item.Especiales
                    .map(x => Helper.convertToNumber(x.Value));
                if (parcial.length > 0)
                    suma += parcial
                        .reduce((suma, item) => {
                            return suma + item;
                        });
            });
            return suma.toLocaleString('es-CO');
        }
    }

    ofrendaEspecial() {
        let value = this.dataSource.data;
        if (value.length > 0) {
            let suma = 0;
            value.forEach(item => {
                let parcial = item.Especiales.filter(x => x.Local)
                    .map(x => Helper.convertToNumber(x.Value));
                if (parcial.length > 0)
                    suma += parcial
                        .reduce((suma, item) => {
                            return suma + item;
                        });
            });

            return suma;
        }
    }

    VerRegistro(id: string) {
        this.router.navigate(['/tesoreria/alfoli/' + id]);
    }

    Imprimir(source: any) {
        let data = source.map(f => {
            return {
                Id: f.Id,
                Nombre: f.Nombre,
                Index: f.Index,
                Total: f.Total,
                Diezmo: f.Diezmo,
                Ofrenda: f.TotalOfrenda,
                Especial: f.Especiales.length > 0 ? f.Especiales.map(s => s.Value).join('\n') : undefined,
                Observa: f.Especiales.length > 0 ? f.Especiales.map(s => s.Label).join('\n') : undefined
            };
        });
        console.log(data);
        console.log(this.fondos);
    }
}
