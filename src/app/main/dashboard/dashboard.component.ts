import { Component, OnInit } from '@angular/core';
import { faCoffee, faChartPie, faLandmark, faSignOutAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faCoffee = faCoffee;
  faChartPie = faChartPie;
  faLandmark = faLandmark;
  faSignOutAlt = faSignOutAlt;
  faArrowRight = faArrowRight;
  constructor() { }

  ngOnInit(): void {
  }

}
