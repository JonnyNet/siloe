import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class ParamterService extends BaseService<any> {

    constructor(injector: Injector) {
        super(injector, "roles");
    }

    public insertParameter(data: any) {
        return this.create(data);
    }

    public deleteParameter(id: any) {
        return this.delete(id);
    }

    public getAllParameter() {
        return this.getAll();
    }

    public updateParameter(id: any, data: any) {
        return this.update(id, data);
    }
}
