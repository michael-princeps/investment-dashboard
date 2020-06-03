import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { Routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import {IconDefinition} from '@ant-design/icons-angular';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { TokenInterceptor } from './core/token-interceptor';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    SharedModule,
    Routing
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
