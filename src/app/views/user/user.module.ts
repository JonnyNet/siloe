import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AppSharedModule } from '../../shared/app.shared.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    AppSharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
