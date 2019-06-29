import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemanalComponent } from './semanal/semanal.component';
import { AlfoliComponent } from './alfoli/alfoli.component';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
    {
        path: 'alfoli',
        component: AlfoliComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Alfoli'
        }
    },
    {
        path: 'alfoli/:id',
        component: AlfoliComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Alfoli'
        }
    },
    {
        path: 'semanal',
        component: SemanalComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Semanal'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TesoreriaRoutingModule { }
