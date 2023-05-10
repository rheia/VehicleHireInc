import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {
    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //ngCanActivate(): boolean {
        if (this._authService.loggedIn()) {
            console.log('true')
            return true
        } else {
            console.log('false')
            this._router.navigate(['/login'])
            return false
        }
    }
}