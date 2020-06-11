import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestmentService } from 'src/app/core/investment.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {fadeOutLeftAnimation, fadeInRightAnimation} from 'angular-animations'

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss'],
  animations: [
    fadeOutLeftAnimation(),
    fadeInRightAnimation()
  ]
})
export class SavingsComponent implements OnInit {
  @ViewChild('investModal') modalRef: NzModalRef;
  savings: any;
  savingsId: string;
  savingsTransactions: any;
  savingsData: any;
  isVisible: boolean;
  newInvestmentForm: FormGroup;
  isLoading: boolean;
  DECIMAL_SEPARATOR = '.';
  GROUP_SEPARATOR = ',';
  amount: any;
  isAdding: boolean;
  applySuccess: boolean;
  notification: any;
  // interests: any[] = [];
  isAccepting: boolean;
  newinvestment: any;
  firstmonthpercent: any;
  investmentenddate: any;
  percent: any;
  investmentAmt: any;
  startdate: any;
  investments: any[] = [];
  interest: any;
  constructor(private service: InvestmentService,
              private route: ActivatedRoute, private loadingBar: LoadingBarService,
              private message: NzMessageService, private fb: FormBuilder, private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.notification = JSON.parse(window.localStorage.getItem('notification_investor_CW'));
    this.initForm();
    this.route.params.subscribe((param: Params) => {
      this.savingsId = param.id;
      //console.log(this.savingsId);
      this.fetchSavingsDetails(this.savingsId);
    });
  }

  initForm() {
    this.newInvestmentForm = this.fb.group({
      amount: [this.amount, [this.confirmValidator]],
      duration: [null, Validators.required],
      investment_start_date: [null, Validators.required]
    })
  }
  fetchSavingsDetails(id) {
    this.loadingBar.start();
    this.service.viewSavings(id).subscribe((data: any) => {
      this.loadingBar.stop();
      this.savings = data;
      this.savingsTransactions = data.saving_transactions;
      this.savingsData = data.savings;
      //console.log(this.savings);
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

  handleCancel() {
    this.modalRef.destroy();
    this.modalRef.afterClose.subscribe(() => {
      this.newInvestmentForm.reset();
      this.applySuccess = false;
    });
  }


  generatePDF(savingsId) {
    this.isLoading = true;
    this.service.generatePDF(savingsId).subscribe((data: any) => {
      this.isLoading = false;
      //console.log(data);
      window.open(data.url, '_blank');
    }, (err: any) => {
      this.isLoading = false;
      this.loadingBar.stop();
      //console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
         
        } else {
          this.message.error('Error connecting to server, please check your internet connection and try again');
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    });
  }


  format(valString) {
    if (!valString) {
      return '';
    }
    const val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) + (!parts[1] ? '' : this.DECIMAL_SEPARATOR + parts[1]);
  }


  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/^0+/, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  }

  changeNum(e) {
    const val = e.target.value;
    const inputvalue = this.format(e.target.value);
    this.newInvestmentForm.patchValue({ amount: inputvalue });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    const val = this.unFormat(control.value);
    if (!control.value) {
      return { error: true, required: true };
    } else if (isNaN(val)) {
      return { amount: true, error: true };
    } else if (val < 100000) {
      return { minAmt: true, error: true };
    }
    return {};
  }


  showAddInvestMentModal() {
    this.isVisible = true;
  }


  onChange(event: Date){
    if (event) {
      //console.log(event.toISOString().slice(0, 10));
    }
  }

  addInvestment() {
    if (this.newInvestmentForm.invalid) {
      return;
    }
    this.applySuccess = false;
    this.newinvestment = {...this.newInvestmentForm.value, savings_id: this.savingsData.savings_id};
    this.newinvestment.investment_start_date = this.newinvestment.investment_start_date.toISOString().slice(0, 10);
    this.newinvestment.amount = this.unFormat(this.newinvestment.amount)
    this.loadingBar.start();
    this.isAdding = true;
    this.newInvestmentForm.disable();
    this.investmentAmt = this.unFormat(this.newinvestment.amount);
    this.startdate = this.newinvestment.investment_start_date;
    //console.log(this.newinvestment);
    this.service.initiateInvestment(this.newinvestment).subscribe((data: any) => {
      this.applySuccess = true;
      this.isAdding = false;
      this.newInvestmentForm.enable();
      // this.interests = data;
      this.interest = data.rate;
      this.investments = data.data;
      this.loadingBar.stop();
      console.log(data);
    }, (err: any) => {
      this.newInvestmentForm.enable();
      this.applySuccess = false;
      this.isAdding = false;
      this.loadingBar.stop();
      //console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

        } else {
          this.message.error('Error connecting to server, please check your internet connection and try again');
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    });
  }

  acceptInvestment() {
    this.loadingBar.start();
    this.isAccepting = true;
    //console.log(this.newinvestment);
    this.service.startInvestment(this.newinvestment).subscribe((data: any) => {
      this.isAccepting = false;
      this.loadingBar.stop();
      console.log(data);
      if (data.status === 'success') {
        this.handleCancel();
        // this.message.success(data.message);
        this.notify.success('Success', data.message);
      }
    }, (err: any) => {
      this.isAccepting = false;
      this.loadingBar.stop();
      //console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

        } else {
          this.message.error('Error connecting to server, please check your internet connection and try again');
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    });
  }


  getReturns() {
    let returns = 0;
    for (let index = 0; index < this.investments.length; ++index) {
      returns = returns + (this.investments[index].percent * this.investmentAmt);
      if (index === 0) {
        this.firstmonthpercent = this.investments[index].percent;
      }
      this.investmentenddate = this.investments[index].duedate;
      this.percent = this.investments[index].percent;
    }
    return returns;
  }
}
