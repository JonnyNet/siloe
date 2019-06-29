import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ServerError } from '../helpers/servererror';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: any;

    constructor( 
        protected router: Router,
        protected afAuth: AngularFireAuth,
        protected firestore: AngularFirestore,
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else
                localStorage.setItem('user', null);

        });
    }

    async  login(email: string, password: string) {
        try {
            await this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then((result) => {

                    if (!result.user.emailVerified) {
                        let error = new ServerError("Error");
                        error.code = "auth/mail-verificate";
                        throw error;
                    }

                    this.infoUser(result.user.uid);
                });
        } catch (e) {
            return e.code;
        }
    }

    async setPassword(email: string, password: string) {
        try {
            this.afAuth.auth.signInWithEmailAndPassword(email, environment.password).then((result) => {
                this.afAuth.auth.currentUser.updatePassword(password).then(() => {
                    this.setUserPassword(result.user.uid);
                    this.infoUser(result.user.uid);
                });
            });
        } catch (e) {
            return e.code;
        }
    }

    private async setUserPassword(id: string) {
        await this.firestore.collection('users').doc(id).update({
            password: false
        })
    }

    private infoUser(id: string) {
        this.getInfoCurrentUser(id).subscribe((res) => {
            if (res.password) {
                this.afAuth.auth.signOut().then(() => {
                    this.router.navigate(['auth/newpassword']);
                });
            } else {
                localStorage.setItem('infouser', JSON.stringify(res));
                this.router.navigate(['dashboard']);
            }
        });
    }

    private getInfoCurrentUser(id: string) {
        return this.firestore.collection('users').doc(id).get().pipe(
            map((x: any) => {
                return this.MapUser(x.id, x.data());
            })
        );
    }

    private MapUser(id: string, data: any): User {
        let user = data as User;
        user.uid = id;
        return user;
    }

    public async forgotPassword(passwordResetEmail) {
        try {
            await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
                let info = new ServerError("Info");
                info.code = "auth/mail-send-reset";
                throw info;
            });
        } catch (e) {
            return e.code;
        }
    }

    async logout() {
        await this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('infouser');
        });
        this.router.navigate(['auth/login']);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }
}
