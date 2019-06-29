import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { UserComponent } from './user/user.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PermisosComponent } from './permisos/permisos.component';
import { OpcionesComponent } from './opciones/opciones.component';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Usuarios'
        }
    },
    {
        path: 'perfiles',
        component: PerfilComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Perfiles'
        }
    },
    {
        path: 'permisos',
        component: PermisosComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Permisos'
        }
    },
    {
        path: 'opciones',
        component: OpcionesComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Opciones'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguridadRoutingModule { }
