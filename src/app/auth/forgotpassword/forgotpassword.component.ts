import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TimeoutError } from 'rxjs';
import { InvestmentService } from 'src/app/core/investment.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  resetForm: FormGroup;
  loading: boolean;
  isResetSuccess: boolean;
  constructor(private formbuilder: FormBuilder,
              private loadingBar: LoadingBarService,
              private service: InvestmentService, private message: NzMessageService) {
    this.initialiseForm();
  }

  ngOnInit(): void {

  }

  initialiseForm() {
    this.resetForm = this.formbuilder.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  get email() { return this.resetForm.get('email'); }

  getErrorMessage() {
    // tslint:disable-next-line
    for (const i in this.resetForm.controls) {
      this.resetForm.controls[i].markAsDirty();
      this.resetForm.controls[i].updateValueAndValidity();
    }
  }
  reset(formvalue) {
    if (this.resetForm.invalid) {
      this.getErrorMessage();
      return false;
    }
    this.loadingBar.start();
    this.loading = true;
    this.resetForm.disable();
    this.service.resetpassword(formvalue).subscribe((data: any) => {
      this.loading = false;
      this.loadingBar.complete();
      this.resetForm.enable();
      if (data.status === 'success') {
        this.isResetSuccess = true;
      } else {
        this.resetForm.setErrors({
          emailnotfound: data.message
        });
      }
    }, (err: any) => {
      this.resetForm.enable();
      this.loading = false;
      this.loadingBar.complete();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

        } else if (err.status >= 400 && err.status <= 415) {
          this.message.error(err.error.message);
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    });
  }

}
