import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'User'
        },
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Profile'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
