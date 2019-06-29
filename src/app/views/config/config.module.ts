import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { IglesiaComponent } from './iglesia/iglesia.component';
import { AppSharedModule } from '../../shared/app.shared.module';
import { ParameterComponent } from './parameter/parameter.component';

@NgModule({
    declarations: [
        IglesiaComponent,
        ParameterComponent
    ],
    imports: [
        ConfigRoutingModule,
        AppSharedModule
    ]
})
export class ConfigModule { }
