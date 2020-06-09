import { Component, OnInit } from '@angular/core';
import { faCoffee, faChartPie, faLandmark, faSignOutAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { InvestmentService } from 'src/app/core/investment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faCoffee = faCoffee;
  faChartPie = faChartPie;
  faLandmark = faLandmark;
  faSignOutAlt = faSignOutAlt;
  faArrowRight = faArrowRight;
  dashboard: any;
  dashboardSavings: any;
  isVisible: boolean;
  transactions: any[] = [];
  modalHeader: string;
  transactionsTotal: any;
  investmentMaturity: any;
  constructor(private service: InvestmentService,
              private loadingBar: LoadingBarService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.loadDashboard();
  }


  loadDashboard() {
    this.loadingBar.start();
    this.service.fetchDashboard().subscribe((data: any) => {
      this.loadingBar.stop();
      this.dashboard = data;
      this.dashboardSavings = data.total_savings;
      this.investmentMaturity = data.maturity;
      window.localStorage.setItem('notification_investor_CW', JSON.stringify(data.notification));
      // this.service.saveNotification(data.notification);
      //console.log(this.dashboard);
    }, (err: any) => {
      this.loadingBar.stop();
      // //console.log(err);
      if (err instanceof HttpErrorResponse) {
        this.loadingBar.stop();
        if (err.status === 401) {
          //  this.message.error(err.error.message);
        } else if (err.status === 400) {
          this.message.error(err.error.message);
        } else {
          this.message.error('Error connecting to server, please check your internet connection and try again');
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    });
  }

  viewSavings(id) {
    //console.log(id);
    this.router.navigate(['/savings/', id]);
  }

  showInfoModal(transaction, type) {
    this.transactions = transaction;
    switch (type) {
      case 1:
        this.modalHeader = 'Total Investment Details';
        break;
      case 2:
        this.modalHeader = 'Total Interest Earned Details';
        break;
      case 3:
        this.modalHeader = 'Total Interest Receivable Details';
        break;
      default:
        this.modalHeader = 'Total Investment Details';
        break;
    }
    // //console.log(this.transactions);
    this.transactionsTotal = this.transactions.reduce((acc, sum) => parseFloat(sum.transaction_amount) + acc, 0);
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }
}
