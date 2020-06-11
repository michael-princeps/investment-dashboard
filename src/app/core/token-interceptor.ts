import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import { InvestmentService } from './investment.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private service: InvestmentService, private router: Router, private message: NzMessageService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.service.isLoggedIn()) {
            const token = this.service.getAuthToken();
            const tokenV1 = this.service.getAuthV1Token();
            if (req.url.includes('compound.ng')) {
                req = this.addToken(req, token);
            } else {
                req = this.addToken(req, tokenV1);
            }
        }
        return next.handle(req).pipe(catchError((err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.message.error('Unauthorised access');
                this.service.logout().then(() => {
                    this.router.navigate(['/auth/login']);
                });
            }
            return throwError(err);
        }));
    }


    private addToken(req: HttpRequest<any>, token: any) {
        return req.clone({
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        });
    }
}


