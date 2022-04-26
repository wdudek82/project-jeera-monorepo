import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import {SharedModule} from '@client/shared/shared.module';


@NgModule({
  declarations: [
    UsersManagementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersManagementRoutingModule
  ]
})
export class UsersManagementModule { }
