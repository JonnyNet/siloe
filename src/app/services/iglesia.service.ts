import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Iglesia } from '../models/iglesia';

@Injectable({
    providedIn: 'root'
})
export class IglesiaService extends BaseService<Iglesia> {

    constructor(injector: Injector) {
        super(injector, "iglesia");
    }

    public createIglesia(data: any) {
        return this.create(data);
    }

    public updateIglesia(id: string, data: any) {
        return this.update(id, data);
    }

    public getAllIglesias() {
        return this.getAll();
    }

    public getAllAsyncglesias() {
        return this.getAllAsync();
    }

    public findIglesia(id: string) {
        return this.find(id);
    }

    public deleteIglesia(id: string) {
        return this.delete(id);
    }
}
