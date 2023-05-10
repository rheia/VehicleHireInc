import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const timeoutValue = req.headers.get('timeout') || 20000;
        const timeoutValueNumeric = Number(timeoutValue);

        const skipIntercept = req.headers.has('skip');

        if (skipIntercept) {
            let request = req.clone({
                headers: req.headers.delete('skip')
            });
            return next.handle(request).pipe(timeout(timeoutValueNumeric));
        }

        let authService = this.injector.get(AuthService);
        let tokenizedReq = req.clone(
            {
                headers: req.headers.set('Authorization', 'bearer ' + authService.getToken()),
                url: `${environment.apiUrl}/${req.url}`,
            }
        )
        return next.handle(tokenizedReq);
    }
}
