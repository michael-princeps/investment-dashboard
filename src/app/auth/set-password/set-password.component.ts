import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { InvestmentService } from 'src/app/core/investment.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;
  loading: boolean;
  constructor(private fb: FormBuilder, private service: InvestmentService,
    private loadingBar: LoadingBarService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.setPasswordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6), this.changePwdValidator]]
    });
  }

  get form() {
    return this.setPasswordForm.controls;
  }
  updateChangePwdValidator() {
    Promise.resolve().then(() => this.setPasswordForm.controls.password_confirmation.updateValueAndValidity())
  }
  changePwdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true }
    } else if (control.value !== this.setPasswordForm.controls.password.value) {
      return { confirmPassword: true, error: true };
    }
    return {};
  }

  setPassword(formvalue) {
    if (this.setPasswordForm.invalid) {
      return;
    }
    console.log(formvalue);
    this.loadingBar.start();
    this.loading = true;
    this.setPasswordForm.disable();
    this.service.setPassword(formvalue).subscribe((data: any) => {
      this.loadingBar.stop();
      this.loading = false;
      if (data.status === 'success') {
        this.message.success(data.message);
        this.router.navigate(['/auth/login']);
      }
      this.setPasswordForm.enable();
    }, (err: any) => {
      this.loading = false;
      this.loadingBar.stop();
      this.setPasswordForm.enable();
      this.loading = false;
      //console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.setPasswordForm.setErrors({
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
