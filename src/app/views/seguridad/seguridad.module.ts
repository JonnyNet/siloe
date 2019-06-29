import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../shared/app.shared.module';
import { OpcionesComponent } from './opciones/opciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PermisosComponent } from './permisos/permisos.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UserComponent } from './user/user.component';


@NgModule({
    declarations: [
        UserComponent,
        PerfilComponent,
        OpcionesComponent,
        PermisosComponent
    ],
    imports: [
        AppSharedModule,
        SeguridadRoutingModule
    ]
})
export class SeguridadModule { }
