import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  public redirectUrl: string;
  constructor(private http: HttpClient) { }


  storeToken(token) {
    return window.sessionStorage.setItem('cw-accessToken', token);
  }
  storeSetNewPasswordToken(token) {
    return window.sessionStorage.setItem('cw-new-password-token', token);
  }
  storeUser(user) {
    return window.sessionStorage.setItem('cw-loggedUser', user);
  }
  getAuthToken() {
    return window.sessionStorage.getItem('cw-accessToken');
  }
  getTokenForSetNewPassword() {
    return window.sessionStorage.getItem('cw-new-password-token');
  }
  getAuthV1Token() {
    return window.sessionStorage.getItem('cw-v1_token');
  }

  saveNotification(notification) {
    return window.sessionStorage.setItem('notification', notification);
  }

  getNotification() {
    return window.sessionStorage.getItem('notification');
  }

  isLoggedIn() {
    return !! this.getAuthToken();
  }

  isInvited() {
    return !! this.getTokenForSetNewPassword();
  }

  login(credentials: {email: string, password: string}) {
    return this.http.post(`${environment.investmentsURL}/login`, credentials).pipe();
  }

  inviteInvestor(credentials: {email: string}) {
    return this.http.post(`${environment.investmentsURL}/invite`, credentials).pipe();
  }
  changePassword(credentials) {
    return this.http.post(`${environment.investmentsURL}/change-password`, credentials).pipe();
  }

  setPassword(credentials) {
    return this.http.post(`${environment.investmentsURL}/set-password`, credentials).pipe();
  }
  async logout() {
    await sessionStorage.removeItem('cw-accessToken');
    await sessionStorage.clear();
  }
  resetpassword(credentials: {email: string}) {
    return this.http.post(``, credentials).pipe();
  }


  fetchDashboard() {
    return this.http.get(`${environment.investmentsURL}/dashboard`).pipe();
  }

  viewSavings(id) {
    return this.http.get(`${environment.investmentsURL}/${id}/single_savings`);
  }

  generatePDF(savingsId) {
    return this.http.get(`${environment.investmentsURL}/${savingsId}/generate-statement`);
  }

  addNewInvestment(credentials: {email: string}) {
    return this.http.post(`${environment.investmentsURL}/stage2/add`, credentials).pipe();
  }
  
  initiateInvestment(credentials: {amount: any, duration: number, savings_id: string, investment_start_date: string}) {
    return this.http.post(`${environment.investmentsURL}/merge/initiate`, credentials).pipe();
  }

  startInvestment(credentials: {amount: any, duration: number, savings_id: string, investment_start_date: string}) {
    return this.http.post(`${environment.investmentsURL}/merge/start`, credentials).pipe();
  }

  
}
