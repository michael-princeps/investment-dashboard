import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { faHistory, faSignOutAlt, faChartPie, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { InvestmentService } from '../core/investment.service';
import { Router } from '@angular/router';

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
  userDetails;
  visible: boolean;
  constructor(private drawerService: NzDrawerService, private service: InvestmentService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.userDetails = this.service.retrieveUser();
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
