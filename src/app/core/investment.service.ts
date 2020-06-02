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
    sessionStorage.setItem('accessToken', token);
  }

  storeUser(user) {
    sessionStorage.setItem('loggedUser', user);
  }
  getAuthToken() {
    return sessionStorage.getItem('accessToken');
  }

  isLoggedIn() {
    return !! this.getAuthToken();
  }

  login(credentials: {email: string, password: string}) {
    return this.http.post(`${environment.investmentsURL}/login`, credentials).pipe();
  }

  changePassword(credentials) {
    return this.http.post(`${environment.investmentsURL}/change-password`, credentials).pipe();
  }
  async logout() {
    await sessionStorage.removeItem('accessToken');
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
}
