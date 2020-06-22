import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AssessmentService } from 'src/app/core/assessment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/core/investment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

// tslint:disable-next-line: class-name
interface login {
  email: string;
  password: string;
}
// tslint:disable-next-line: class-name
interface loggedUserData {
  data: any;
  status: string;
  token: string;
  message?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  // tslint:disable-next-line: max-line-length
  constructor(private formbuilder: FormBuilder, private loadingBar: LoadingBarService, private service: InvestmentService, private message: NzMessageService, private router: Router) {
    this.initialiseForm();
  }

  ngOnInit(): void {

  }

  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  getErrorMessage() {
    // tslint:disable-next-line
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }
  login(formvalue: login) {
    if (this.loginForm.invalid) {
      this.getErrorMessage();
      return false;
    }
    this.loadingBar.start();
    this.loginForm.disable();
    this.loading = true;
    this.service.login(formvalue).subscribe((data: loggedUserData) => {
      this.loadingBar.stop();
      this.loginForm.enable();
      this.loading = false;
      // console.log(data);
      if (data.status === 'success') {
      this.service.storeUser(data.data.borrower);
      this.service.storeToken(data.token);

      if (this.service.redirectUrl) {
        this.router.navigateByUrl(this.service.redirectUrl);
      } else {
        this.router.navigate(['/']);
      }
     } else {
       this.message.error(`User ${data.message}`)
     }
    }, (err: any) => {
      this.loadingBar.stop();
      this.loginForm.enable();
      this.loading = false;
      // console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.loginForm.setErrors({
            invalid: err.error.message
          });
        } else {
          this.message.error('Error connecting to server, please check your internet connection and try again');
        }
      } else if (err instanceof TimeoutError) {
        this.message.error('Connection Timeout. Please try again later');
      }
    });
  }

  storeToken(token) {
   return window.sessionStorage.setItem('cw-accessToken', token);
  }

  storeUser(user) {
    return window.sessionStorage.setItem('cw-loggedUser', user);
  }
}
