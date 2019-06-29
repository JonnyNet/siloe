import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { Helper } from '../helpers/helper';




@Injectable({
    providedIn: 'root'
})
export class SemanalService {

    constructor(private firestore: AngularFirestore) { }

    public getDataSemana(start: string, end: string) {
        return this.firestore.collection('alfoli', ref => ref
            .where('Fecha', '>', new Date(start))
            .where('Fecha', '<', new Date(end))).get()
            .pipe(
                map((x: QuerySnapshot<any>) => {
                    return x.docs
                        .sort((a, b) => {
                            let keya = a.data().Detalle.filter(y => y.Name == 'Total')[0].Value;
                            let keyb = b.data().Detalle.filter(y => y.Name == 'Total')[0].Value;
                            return keya < keyb ? 1 : keya > keyb ? -1 : 0;
                        })
                        .map((a, index) => {
                            let f = a.data();
                            let id = a.id;
                            return {
                                Id : id,
                                Nombre: f.Nombre,
                                Index: index + 1,
                                Total: Helper.formatNumber(f.Detalle.filter(s => s.Name == 'Total')[0].Value),
                                Diezmo: Helper.formatNumber(f.Diezmo),
                                TotalOfrenda: Helper.formatNumber(f.Detalle.filter(s => s.Name == 'Global')[0].Value),
                                Especiales: f.Especiales.map(s => {
                                    return {
                                        Value : Helper.formatNumber(s.Value),
                                        Label : s.Label,
                                        Local : s.Local
                                    }
                                })
                            };
                        });
                })
            );
        //'2019-03-15'
    }

}
