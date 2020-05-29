import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { faHistory, faSignOutAlt, faChartPie, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

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
  constructor(private drawerService: NzDrawerService) { }

  ngOnInit(): void {
  }

  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: this.drawerHeaderTemplate,
      nzContent: this.drawerTemplate
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
    });
  }

}
