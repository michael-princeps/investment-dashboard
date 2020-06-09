import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InvestmentService } from 'src/app/core/investment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading: boolean;
  constructor(private service: InvestmentService, private fb: FormBuilder, private loadingBar: LoadingBarService, private message: NzMessageService, private router: Router) {
   
   }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldpassword: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6), this.changePwdValidator]]
    });
  }
  get form() {
    return this.changePasswordForm.controls;
  }
  updateChangePwdValidator() {
    Promise.resolve().then(() => this.changePasswordForm.controls.password_confirmation.updateValueAndValidity())
  }
  changePwdValidator = (control: FormControl): {[s: string]: boolean} => {
    if (!control.value) {
      return {error: true, required: true}
    } else if (control.value !== this.changePasswordForm.controls.password.value) {
      return {confirmPassword: true, error: true};
    }
    return {};
  }
  changePassword(value) {
    if (this.changePasswordForm.invalid) {
      return;
    }
    //console.log(value);
    this.loadingBar.start();
    this.loading = true;
    this.service.changePassword(value).subscribe((data: any) => {
      //console.log(data);
      this.loading = false;
      this.message.success(data.message);
      this.service.storeToken(data.token);
      this.router.navigate(['/dashboard']);
    }, (err: any) => {
      this.loading = false;
      this.loadingBar.stop();
      this.changePasswordForm.enable();
      this.loading = false;
      //console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.changePasswordForm.setErrors({
            invalid: err.error.message
          });
        } else {
          this.message.error('Error connecting to server, please check your internet connection and try again');
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    })
  }
}
