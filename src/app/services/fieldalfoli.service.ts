import { Injectable, Injector } from '@angular/core';
import { Alfoli } from '../models/alfoli';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class FieldAlfoliService extends BaseService<Alfoli> {
    

    constructor(injector: Injector) {
        super(injector, 'field-alfoli');
    }

    //Insertar registros nuevos
    public createFields(data: Alfoli) {
        data.Iglesia = this.user.church;
        return this.create(data);
    }

    //Obtiene todos los campos
    public getFields() {
        return this.firestore.collection(this.table, ref => ref.orderBy("Grupo").orderBy("Orden")).get();
    }

    //Actualiza un campo
    public updateFields(id: string, data: Alfoli) {
        return this.update(id, data);
    }

    //Eliminar una campo
    public DeleteFields(id: string) {
        return this.delete(id);
    }
}
