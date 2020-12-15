import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { InvestmentService } from 'src/app/core/investment.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

// tslint:disable-next-line: class-name
interface inviteEmail {
  email: string;
}

@Component({
  selector: 'app-invite-investor',
  templateUrl: './invite-investor.component.html',
  styleUrls: ['./invite-investor.component.scss']
})

export class InviteInvestorComponent implements OnInit {
  showSpinner = true;
  hasErrors: boolean;
  error: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: InvestmentService,
              private loadingBar: LoadingBarService, private message: NzMessageService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: inviteEmail) => {
      // console.log(params);
      this.handleInvite(params);
    });
  }

  handleInvite(params) {
    this.loadingBar.start();
    return this.service.inviteInvestor(params).subscribe((data: any) => {
      this.loadingBar.stop();
      this.showSpinner = false;
      // console.log(data);
      if (data.status === 'success') {
        if (data.first_login === 0) {
          this.service.storeToken(data.token);
          this.service.storeSetNewPasswordToken(data.token);
          this.router.navigate(['/auth/set-password']);
        } else {
          this.router.navigate(['/auth/login']);
        }
      } else {
        this.hasErrors = true;
        this.error = data.message;
      }
    }, (err: any) => {
      this.loadingBar.stop();
      // console.log(err);
      this.hasErrors = true;
      this.showSpinner = false;
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
