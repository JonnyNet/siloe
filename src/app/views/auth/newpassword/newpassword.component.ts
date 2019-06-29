import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Helper } from '../../../helpers/helper';
import { PasswordValidation } from '../../../helpers/passwordvalidation';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-newpassword',
    templateUrl: './newpassword.component.html',
    styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

    form: FormGroup;
    error: string = '';

    constructor(
        private build: FormBuilder,
        private route: ActivatedRoute,
        private service: AuthService
    ) {

    }

    ngOnInit() {
        const param = this.route.snapshot.paramMap.get("id");
        this.form = this.build.group({
            Email: [param, [Validators.required, Validators.email]],
            NewPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
            ConfPassword: ['', Validators.required],
        }, { validator: PasswordValidation.MatchPassword });


        let control = this.form.get('Email');
        if (param != undefined) {
            control.setValue(Helper.DecryptedAES(param));
            control.disable();
        }
    }

    onSubmit(value: any) {
        this.service.setPassword(value.Email, value.NewPassword).then((res) => {
            console.log(res);
        });
    }

}
