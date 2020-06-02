import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavingsComponent } from './savings/savings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddInvestmentComponent } from './add-investment/add-investment.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'savings/:id',
        component: SavingsComponent,
      },
      {
        path: 'investment-merge',
        component: AddInvestmentComponent,
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
