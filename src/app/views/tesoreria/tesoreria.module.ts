import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../shared/app.shared.module';
import { AlfoliComponent } from './alfoli/alfoli.component';
import { SemanalComponent } from './semanal/semanal.component';
import { TesoreriaRoutingModule } from './tesoreria-routing.module';



@NgModule({
    declarations: [
        SemanalComponent,
        AlfoliComponent
    ],
    imports: [
        TesoreriaRoutingModule,
        AppSharedModule
    ]
})
export class TesoreriaModule { }
