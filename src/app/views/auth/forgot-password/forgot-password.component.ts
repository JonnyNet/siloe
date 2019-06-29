import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { codeerrors } from '../../../helpers/message.errors';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

    form: FormGroup;
    error: any;

    constructor(public authService: AuthService) {

    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    onSubmit(value: any) {
        this.authService.forgotPassword(value.email).then((error) => {
            this.error = codeerrors.find(x => x.code == error);
            this.form.reset();
        });
    }

}