import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';


@NgModule({
  declarations: [LoginComponent, ForgotpasswordComponent, SetPasswordComponent, InviteInvestorComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
