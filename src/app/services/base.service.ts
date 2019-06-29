import { Injector } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Helper } from '../helpers/helper';
import { User } from '../models/user';



export abstract class BaseService<T> {

    protected colection: AngularFirestoreCollection<any>;
    protected firestore: AngularFirestore;
    protected user: User;

    constructor(injector: Injector, protected table: string) {
        this.firestore = injector.get(AngularFirestore);
        this.colection = this.firestore.collection<T>(table);

        this.user = this.GetCurrentUser();
    }

    protected create(data: any) {
        return new Observable(observer => {
            this.colection.add(data).then(ref => {
                this.InsertAuditoria(ref.id, "Crear");
                observer.next(ref.id);
                observer.complete();
            });
        });
    }

    protected delete(id: string) {
        this.InsertAuditoria(id, "Eliminar");
        return from(this.colection.doc(id).delete());
    }

    protected find(id: string) {
        this.InsertAuditoria(id, "Buscar");
        return this.colection.doc(id).get();
    }

    protected update(id: string, data: any) {
        this.InsertAuditoria(id, "Actualiza");
        return from(this.colection.doc(id).update(data));
    }

    protected getAll() {
        return Helper.MapObserver(this.colection.get(), this.MapObject);
            
    }

    protected getAllAsync() {
        return Helper.MapObserverAsync(this.colection.snapshotChanges(), this.MapObject);
    }

    protected InsertAuditoria(id: string, accion: string) {
        Helper.insertAuditoria(this.firestore, id, new Date(), this.user.email, accion, this.table);
    }

    protected GetCurrentUser() {
        let user = JSON.parse(localStorage.getItem('infouser')) as User;
        const info = JSON.parse(localStorage.getItem('user'));
        user.displayName = info.displayName;
        user.photoURL = info.photoURL;
        user.phoneNumber = info.phoneNumber;
        return user;
    }

    protected MapObject(id: string, data: any) {
        let obj = data as T;
        obj['uid'] = id;
        return obj;
    }

}