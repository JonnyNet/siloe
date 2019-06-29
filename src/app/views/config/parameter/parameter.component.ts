import { Component, OnInit } from '@angular/core';
import { ParamterService } from '../../../services/paramter.service';

@Component({
    selector: 'app-parameter',
    templateUrl: './parameter.component.html',
    styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

    constructor(private service: ParamterService) { }

    ngOnInit() {
        // roles.forEach(x => {
        //     this.service.insertParameter(x).subscribe((id: string) => {
        //         console.log(id);
        //     });
        // })

        // this.service.getAllParameter().subscribe((res: any) => {
        //     console.log(res);
        //     res.forEach(element => {
        //         this.service.deleteParameter(element.uid);
        //     });
        // })

        // this.service.updateParameter("LdrtVcZs6VrqkTKPK7VU", {
        //     roles: [
        //         {
        //             nombre: 'Tesorero',
        //             uid: 'X6cQbSO9BOb4UJTnPkwf'
        //         },
        //         {
        //             nombre: 'Anciano',
        //             uid: 'eTDi6eHg44ar23TRdGGt'
        //         },
        //         {
        //             nombre: 'Pastor',
        //             uid: '4jEWhlaaYEnxhanq1cHm'
        //         },
        //         {
        //             nombre: 'Asociación',
        //             uid: 'VEFcc4Gj2VJh4FYg4QbR'
        //         },
        //         {
        //             nombre: 'Admin',
        //             uid: 'LdrtVcZs6VrqkTKPK7VU'
        //         }
        //     ]
        // })
    }


}
