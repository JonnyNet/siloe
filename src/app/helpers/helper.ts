import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as crypto from 'crypto-js';
import { environment } from '../../environments/environment';

export class Helper {

    public static convertToNumber(value: string): number {
        if (value == undefined || value == '')
            return 0;
        return parseInt(value.split('.').join(''));
    }

    public static formatNumber(value: number): string {
        return value.toLocaleString('es-CO');
    }

    public static insertAuditoria(firestore: AngularFirestore, id: string, fecha: Date, user: string, accion: string, table: string) {
        firestore.collection("Auditoria").add({
            Registro: id,
            Fecha: fecha,
            Usuario: user,
            Accion: accion,
            Table: table
        });
    }

    public static SetForm(sourse: Array<any>, id: string, form: FormGroup) {
        const iglesia = sourse.find(x => x.Id == id);
        for (const key in iglesia) {
            let control = form.get(key);
            if (control !== undefined)
                control.setValue(iglesia[key]);
        }
    }

    public static MapObserverAsync(obj: Observable<any>, callback: any): Observable<any> {
        return obj.pipe(
            map((x: any) => {
                return x.map((x: any) => {
                    return callback(x.payload.doc.id, x.payload.doc.data());
                });
            })
        );
    }

    public static MapObserver(obj: Observable<any>, callback: any): Observable<any> {
        return obj.pipe(
            map((x: any) => {
                return x.docs.map((x: any) => {
                    return callback(x.id, x.data());
                });
            })
        );
    }

    public static EncryptedAES(text: string) {
        const b64 = crypto.AES.encrypt(text, environment.secret).toString();
        const e64 = crypto.enc.Base64.parse(b64);
        const eHex = e64.toString(crypto.enc.Hex);
        return eHex;
    }

    public static DecryptedAES(text: string) {
        const reb64 = crypto.enc.Hex.parse(text);
        const bytes = reb64.toString(crypto.enc.Base64);
        const decrypt = crypto.AES.decrypt(bytes, environment.secret);
        const plain = decrypt.toString(crypto.enc.Utf8);
        return plain;
    }

    public static GetChangedProperties(form: FormGroup, keys: string[]) {
        let ouput = {};
        keys.forEach(key => {
            const control = form.get(key);
            if (control.dirty)
                ouput[key] = control.value;
        });
        return Object.keys(ouput).length > 0 ? ouput : undefined;
    }
}