import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { SavingsComponent } from './savings/savings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddInvestmentComponent } from './add-investment/add-investment.component';


@NgModule({
  declarations: [DashboardComponent, MainComponent, SavingsComponent, PagenotfoundComponent, ChangePasswordComponent, AddInvestmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
