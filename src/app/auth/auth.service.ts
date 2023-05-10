import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface LoginData {
    email: string;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private _router: Router) { }

    loginUser(postedData: LoginData): Observable<any> {
        const url = 'api/token';
        return this.http.post<any>(url, postedData)
            .pipe(
                catchError(this.handleError<any>('loginUser'))
            );
    }

    logoutUser() {
        localStorage.removeItem('token');
        this._router.navigate(['/']);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }


    /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}