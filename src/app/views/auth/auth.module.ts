import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../shared/app.shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';



@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        NewpasswordComponent
    ],
    imports: [
        AuthRoutingModule,
        AppSharedModule
    ]
})
export class AuthModule { }
