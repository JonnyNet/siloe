import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Helper } from '../../../helpers/helper';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    form: FormGroup;
    iglesias = [];
    id: string = '';
    roles = [];

    subscription: Subscription;

    dataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = ['name', 'email', 'church', 'job', 'Ver'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private build: FormBuilder, private service: UserService) { }

    ngOnInit() {
        this.form = this.build.group({
            uid: [''],
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            church: ['', Validators.required],
            job: ['', Validators.required],
            rol: ['', Validators.required]
        });

        this.service.getListIglesias().subscribe((res) => {
            this.iglesias = res;
            this.service.getListRoles().subscribe((res) => {
                this.roles = res;
                this.subscription = this.service.getAllUsers(res).subscribe((res) => {
                    this.dataSource = new MatTableDataSource<any>(res);
                });
            });
        });
    }


    onSubmit(value: User) {
        if (value.uid === '') {
            value.name = value.name.toUpperCase();
            this.service.crearUsuario(value).subscribe((res) => {
                this.form.reset();
            });
        } else {
            let result = Helper.GetChangedProperties(this.form, Object.keys(value));
            if (result !== undefined)
                this.service.UpdateUser(value.uid, result);
        }
    }

    VerRegistro(data: any) {
        console.log(data);
        this.form.patchValue(data);
    }

    getNameIglesia(id: string) {
        return this.iglesias.find(x => x.uid == id).nombre;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
