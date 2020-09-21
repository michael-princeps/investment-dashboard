import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { faHistory, faSignOutAlt, faChartPie, faCog, faBars, faMoneyBill, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { InvestmentService } from '../core/investment.service';
import { Router } from '@angular/router';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  @ViewChild('drawerHeaderTemplate', { static: false }) drawerHeaderTemplate?: TemplateRef<{
    drawerRef: NzDrawerRef<string>;
  }>;

  isCollapsed = true;
  faSignOutAlt = faSignOutAlt;
  faHistory = faHistory;
  faChartPie = faChartPie;
  faCog = faCog;
  faBars = faBars;
  faMoneyBill = faMoneyBill;
  faInfoCircle = faInfoCircle;
  userDetails;
  visible: boolean;
  savingsAccount: any[] = [];
  // tslint:disable-next-line: max-line-length
  constructor(private drawerService: NzDrawerService, private service: InvestmentService, private router: Router, private mainService: MainService) {
    
   }

   public isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
 }
  ngOnInit(): void {
    this.userDetails = this.service.retrieveUser();
    this.mainService.getSavingsAcct$().subscribe((data) => {
      if (data) {
        this.savingsAccount = data;
      } else {
        this.savingsAccount = JSON.parse(window.sessionStorage.getItem('savingsAccounts'))
      }
    });
    //console.log(this.userDetails);
  }

  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: this.drawerHeaderTemplate,
      nzContent: this.drawerTemplate
    });

    drawerRef.afterOpen.subscribe(() => {
      //console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      //console.log('Drawer(Template) close');
    });
  }


  logOut() {
    this.service.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
}
