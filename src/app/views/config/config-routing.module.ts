import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { IglesiaComponent } from './iglesia/iglesia.component';
import { ParameterComponent } from './parameter/parameter.component';

const routes: Routes = [
    {
        path: 'iglesia',
        component: IglesiaComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Iglesia'
        }
    },
    {
        path: 'parameter',
        component: ParameterComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Parametrizacion'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigRoutingModule { }
