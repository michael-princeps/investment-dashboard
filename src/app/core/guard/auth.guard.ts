import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvestmentService } from '../investment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: InvestmentService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkedLoggedIn(state.url);
  }

  checkedLoggedIn(url: string): boolean {
    if (this.service.isLoggedIn()) {
      return true;
    }
    this.service.redirectUrl = url;
    this.router.navigate(['/auth/login']);
    return false;
  }
}
