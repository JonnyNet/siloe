import { Injectable, Injector } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, CollectionReference } from 'angularfire2/firestore';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Helper } from '../helpers/helper';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User> {

    constructor(injector: Injector, private afAuth: AngularFireAuth) {
        super(injector, "users");
    }

    public crearUsuario(data: any) {
        return this.SignUp(data);
    }

    public findUser(id: string) {
        return this.find(id);
    }

    public getAllUsers(roles: any) {
        const user = this.GetCurrentUser();
        const rol = roles.find(x => x.uid === user.rol);

        return Helper.MapObserver(this.firestore.collection("users", ref =>
            this.SetWhere(ref, roles, user.church, rol)).get(), this.MapObject);
    }

    private SetWhere(ref: CollectionReference, roles: any, church: string, rol: any) {
        roles.forEach(element => {
            ref.where("rol", "==", element.uid);
        });
        if (rol.nombre !== 'Admin' || rol.nombre !== 'Mision' || rol.nombre !== 'Pastor')
            ref.where("church", "==", church);
        return ref;
    }

    public deleteUser(id: string) {
        return this.delete(id);
    }

    public getUserCurrent() {
        return of(this.GetCurrentUser()).pipe(
            mergeMap(x => {
                return this.firestore.collection('iglesia').doc(x.church).get().pipe(
                    map((s: any) => {
                        x.church = s.data().nombre;
                        return x
                    })
                )
            }),
            mergeMap(x => {
                return this.firestore.collection('roles').doc(x.rol).get().pipe(
                    map((s: any) => {
                        x.rol = s.data().nombre;
                        return x
                    })
                )
            })
        );
    }

    public getListIglesias() {
        return this.firestore.collection('iglesia').get().pipe(
            map((x: any) => {
                return x.docs.map((x: any) => {
                    const f = x.data();
                    const id = x.id;
                    return {
                        uid: id,
                        nombre: f.nombre
                    };
                });
            })
        );
    }

    public getListRoles() {
        const user = this.GetCurrentUser();
        return this.firestore.collection("roles").doc(user.rol).get().pipe(
            map((x: any) => {
                return x.data().roles;
            })
        );
    }

    public UpdateUser(id: string, data: any) {
        return this.update(id, data);
    }

    private SignUp(data: User) {
        return new Observable(observer => {
            from(this.afAuth.auth.createUserWithEmailAndPassword(data.email, environment.password)).subscribe((result: any) => {
                this.SetUserData(result.user, data);
                this.SetNameProfile(data.name);
                this.SendVerificationMail(data.email);
                this.InsertAuditoria(data.uid, "Crear");
                observer.next(data.uid);
                observer.complete();
            });
        });
    }

    private async SetNameProfile(name: string) {
        return await this.afAuth.auth.currentUser.updateProfile({
            displayName: name.split(' ')[0]
        });
    }

    private async SetUserData(user: any, data: User) {
        const userRef = this.firestore.doc(`users/${user.uid}`);
        data.uid = user.uid;
        data.state = true;
        data.password = true;
        data.creation = new Date();
        return await userRef.set(data, { merge: true });
    }

    private async SendVerificationMail(email: string) {
        return await this.afAuth.auth.currentUser.sendEmailVerification({
            url: environment.url + Helper.EncryptedAES(email)
        });
    }


}
