import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Alfoli } from '../models/alfoli';
import { Observable, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, concatMap, switchMap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AlfoliService extends BaseService<Alfoli> {

    constructor(injector: Injector) {
        super(injector, "alfoli");
    }

    public getFields() {
        return this.firestore.collection('field-alfoli', ref => ref.orderBy("Grupo").orderBy("Orden")).get();
    }

    public createAlfoli(data: any) {
        return this.create(data).pipe(
            concatMap(() => this.ValidPerson(data.nombre, data.church)),
            switchMap(flag => {
                if (!flag)
                    return this.InsertNewPerson({ nombre: data.nombre, church: data.church })
                else return of(true)
            }),
            catchError(() => of(false))
        );
    }

    private InsertNewPerson(data: any) {
        return from(this.firestore.collection("persona").add(data)).pipe(
            map(x => true)
        )
    }

    private ValidPerson(name: string, church: string) {
        return this.firestore.collection("persona", ref => ref
            .where("nombre", "==", name)
            .where("church", "==", church)
        ).get().pipe(
            map(x => {
                return x.docs.length > 0;
            })
        )
    }


    public findAlfoli(id: string) {
        return this.find(id);
    }

    public updateAlfoli(id: string, data: any) {
        return this.update(id, data);
    }

    public searchUser(search: string): Observable<string[]> {
        const endText = search + '\uf8ff';
        const user = this.GetCurrentUser();
        return this.firestore.collection("persona", ref => ref
            .where("church", "==", user.church)
            .orderBy("Nombre")
            .limit(10)
            .startAt(search)
            .endAt(endText)
        ).snapshotChanges().pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(changes => {
                return changes.map(c => {
                    console.log(c);
                    const data: any = c.payload.doc.data();
                    const id = c.payload.doc.id;
                    return data.Nombre;
                });
            })
        )
    }
}
