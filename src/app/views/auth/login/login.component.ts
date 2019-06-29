import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { codeerrors } from '../../../helpers/message.errors';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    error: string = '';

    constructor(private authService: AuthService, private build: FormBuilder) { }

    ngOnInit() {
        this.form = this.build.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit(value: any) {
        this.authService.login(value.email, value.password).then((error) => {
            const message = codeerrors.find(x => x.code == error);
            if (message != undefined)
                this.error = message.message;
            else this.error = error;
        });
    }

}
