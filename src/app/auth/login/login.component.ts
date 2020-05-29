import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AssessmentService } from 'src/app/core/assessment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/core/investment.service';

// tslint:disable-next-line: class-name
interface login {
  email: string;
  password: string;
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
    this.service.login(formvalue).subscribe((data: any) => {
      this.loadingBar.stop();
      this.loginForm.enable();
      this.loading = false;
      if (data.status === 'success') {
        // sessionStorage.setItem('firstname', data.user.firstname);
        // sessionStorage.setItem('lastname', data.user.lastname);
        this.storeUser(data.user);
        this.storeToken(data.token);
        this.router.navigate(['/']);
      } else {
        this.message.error(data.message);
      }
    }, (err: any) => {
      this.loadingBar.stop();
      this.loginForm.enable();
      this.loading = false;
      this.message.error('Error connecting to server, please check your internet connection and try again');
    });
  }

  storeToken(token) {
    sessionStorage.setItem('accessToken', token);
  }

  storeUser(user) {
    sessionStorage.setItem('loggedUser', user);
  }
}
