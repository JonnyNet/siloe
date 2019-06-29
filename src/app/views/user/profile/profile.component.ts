import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    form: FormGroup;

    constructor(private service: UserService, private build: FormBuilder) { }

    ngOnInit() {
        this.form = this.build.group({
            uid: [''],
            name: [''],
            displayName: [''],
            photoURL: [''],
            phoneNumber: [''],
            email: [''],
            church: [''],
            job: [''],
            rol: ['']
        });


        this.service.getUserCurrent().subscribe((res: any) => {
            this.form.patchValue(res);
        })
    }

}
