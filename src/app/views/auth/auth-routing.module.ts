import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from '../../services/secure-inner-pages.guard';
import { NewpasswordComponent } from './newpassword/newpassword.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Auth'
        },
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [SecureInnerPagesGuard],
                data: {
                    title: 'Login Page'
                }
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                canActivate: [SecureInnerPagesGuard],
                data: {
                    title: 'Forgot Password'
                }
            },
            {
                path: 'newpassword/:id',
                component: NewpasswordComponent,
                canActivate: [SecureInnerPagesGuard],
                data: {
                    title: 'New Password'
                }
            },
            {
                path: 'newpassword',
                component: NewpasswordComponent,
                canActivate: [SecureInnerPagesGuard],
                data: {
                    title: 'New Password'
                }
            }
        ]
    }
];;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
