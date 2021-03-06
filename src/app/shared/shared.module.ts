import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzDropDownModule,
    LoadingBarModule,
    NzGridModule,
    NzRadioModule,
    FontAwesomeModule,
    NzMenuModule,
    NzLayoutModule,
    NzTagModule,
    NzStepsModule,
    NzResultModule,
    NzModalModule,
    RouterModule,
    NzDrawerModule,
    NzTableModule,
    NzPaginationModule,
    NzSelectModule,
    NzFormModule,
    NzSpinModule,
    NzDatePickerModule,
    NzNotificationModule
  ],
  exports: [
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzGridModule,
    LoadingBarModule,
    FontAwesomeModule,
    NzRadioModule,
    NzMenuModule,
    NzLayoutModule,
    NzDropDownModule,
    NzTagModule,
    NzStepsModule,
    NzResultModule,
    NzTableModule,
    NzPaginationModule,
    NzFormModule,
    NzDrawerModule,
    NzModalModule,
    NzSelectModule,
    NzSpinModule,
    NzDatePickerModule,
    NzNotificationModule,
    RouterModule,
  ]
})
export class SharedModule { }
