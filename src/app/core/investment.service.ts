import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient) { }

  // saveToken(token) {
  //   return sessionStorage.setItem('accessToken', token);
  // }

  getAuthToken() {
    return sessionStorage.getItem('accessToken');
  }

  isLoggedIn() {
    return !! this.getAuthToken();
  }

  login(credentials: {email: string, password: string}) {
    return this.http.post(``, credentials).pipe();
  }

  resetpassword(credentials: {email: string}) {
    return this.http.post(``, credentials).pipe();
  }
}
