import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('NewPassword').value; // to get value in input tag
        let confirmPassword = AC.get('ConfPassword').value; // to get value in input tag
        if (password != confirmPassword)
            AC.get('ConfPassword').setErrors({ matchpassword: true })
        else
            return null

    }
}