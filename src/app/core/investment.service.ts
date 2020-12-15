import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  public redirectUrl: string;
  constructor(private http: HttpClient) { }


  storeToken(token) {
    return window.sessionStorage.setItem('cw-accessToken', token);
  }

  storeV1Token(token) {
    return window.sessionStorage.setItem('cw-v1_token', token);
  }

  storeSetNewPasswordToken(token) {
    return window.sessionStorage.setItem('cw-new-password-token', token);
  }

  storeUser(user) {
    return window.sessionStorage.setItem('cw-loggedUser', JSON.stringify(user));
  }

  retrieveUser() {
    return JSON.parse(window.sessionStorage.getItem('cw-loggedUser'));
  }

  getAuthToken() {
    return window.sessionStorage.getItem('cw-accessToken');
  }

  getTokenForSetNewPassword() {
    return window.sessionStorage.getItem('cw-new-password-token');
  }

  getAuthV1Token() {
    return JSON.parse(window.sessionStorage.getItem('cw-v1_token'));
  }

  saveNotification(notification) {
    return window.sessionStorage.setItem('notification_investor_CW', JSON.stringify(notification));
  }

  getNotification() {
    return window.sessionStorage.getItem('notification_investor_CW');
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }

  isInvited() {
    return !!this.getTokenForSetNewPassword();
  }

  login(credentials: {email: string, password: string}) {
    return this.http.post(`${environment.investmentsURLV2}/login`, credentials).pipe();
  }

  inviteInvestor(credentials: {email: string, code: string}) {
    return this.http.post(`${environment.investmentsURLV2}/invite`, credentials).pipe();
  }

  changePassword(credentials) {
    return this.http.post(`${environment.investmentsURLV2}/change-password`, credentials).pipe();
  }

  setPassword(credentials) {
    return this.http.post(`${environment.investmentsURLV2}/set-password`, credentials).pipe();
  }
  async logout() {
    await window.sessionStorage.removeItem('cw-accessToken');
    await window.sessionStorage.removeItem('savingsAccounts');
    await window.sessionStorage.clear();
  }
  resetpassword(credentials: {email: string}) {
    return this.http.post(`${environment.investmentsURLV2}/password/reset`, credentials).pipe();
  }


  fetchDashboard() {
    return this.http.get(`${environment.investmentsURLV2}/dashboard`).pipe();
  }

  viewSavings(id) {
    return this.http.get(`${environment.investmentsURLV2}/${id}/single_savings`).pipe(shareReplay(1));
  }

  generatePDF(savingsId) {
    return this.http.get(`${environment.investmentsURL}/${savingsId}/generate-statement`);
  }

  addNewInvestment(credentials: {email: string}) {
    return this.http.post(`${environment.investmentsURLV2}/stage2/add`, credentials).pipe();
  }

  initiateInvestment(credentials: {amount: any, duration: number, savings_id: string, investment_start_date: string}) {
    return this.http.post(`${environment.investmentsURLV2}/merge/initiate`, credentials).pipe();
  }

  startInvestment(credentials: {amount: any, duration: number, savings_id: string, investment_start_date: string}) {
    return this.http.post(`${environment.investmentsURLV2}/merge/start`, credentials).pipe();
  }


}
