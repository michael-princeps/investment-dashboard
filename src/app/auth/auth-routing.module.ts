import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { InviteInvestorComponent } from './invite-investor/invite-investor.component';
import { Auth2Guard } from '../core/guard/auth2.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotpasswordComponent
  },
  {
    path: 'set-password',
    canActivate: [Auth2Guard],
    component: SetPasswordComponent
  },
  {
    path: 'invite',
    component: InviteInvestorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
