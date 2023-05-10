import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateRental, Kind, Rental } from '../dto/hire-requests/rental';

@Injectable({
    providedIn: 'root'
})
export class RentalService {

    constructor(private http: HttpClient) { }

    getKinds(): Observable<Kind[]> {
        const url = 'api/Kinds';
        return this.http.get<Kind[]>(url)
            .pipe(
                catchError(this.handleError<Kind[]>('getKinds', []))
            );
    }

    getRentals(): Observable<Rental[]> {
        const url = 'api/Rentals';
        return this.http.get<Rental[]>(url)
            .pipe(
                catchError(this.handleError<Rental[]>('getRentals', []))
            );
    }

    getRental(id: number): Observable<Rental> {
        let url = `api/Rentals/${id}`;
        return this.http.get<Rental>(url)
            .pipe(
                catchError(this.handleError<Rental>('getRental'))
            );
    }

    createRental(postedData: CreateRental): Observable<Rental> {
        const url = 'api/Rentals';

        return this.http.post<Rental>(url, postedData)
            .pipe(
                catchError(this.handleError<Rental>('createRental', undefined))
            );
    }

    updateRental(id: number, postedData: any): Observable<any> {
        const url = `api/Rentals/${id}`;

        return this.http.put<any>(url, postedData)
            .pipe(
                catchError(this.handleError<any>('updateRental', undefined))
            );
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
