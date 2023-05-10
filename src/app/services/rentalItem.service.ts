import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RentalItem } from '../dto/hire-requests/rental';

@Injectable({
    providedIn: 'root'
})
export class RentalItemService {

    constructor(private http: HttpClient) { }

    getRentalItems(kindId?: number): Observable<RentalItem[]> {
        let url = 'api/RentalItems';
        if (kindId) {
            url = `${url}?kindId=${kindId}`;
        }

        return this.http.get<RentalItem[]>(url)
            .pipe(
                catchError(this.handleError<RentalItem[]>('getRentalItems', []))
            );
    }

    createRentalItem(postedData: any): Observable<any> {
        const url = 'api/RentalItems';

        return this.http.post<any>(url, postedData)
            .pipe(
                catchError(this.handleError<any>('createRentalItem', undefined))
            );
    }

    // updateRentalItem(id: number, postedData: any): Observable<any> {
    //     const url = `api/RentalItems/${id}`;

    //     return this.http.put<any>(url, postedData)
    //         .pipe(
    //             catchError(this.handleError<any>('createRentalItem', undefined))
    //         );
    // }

    // getRental(id: number): Observable<Rental> {
    //     let url = `api/Rentals/${id}`;
    //     return this.http.get<Rental>(url)
    //         .pipe(
    //             catchError(this.handleError<Rental>('getRental'))
    //         );
    // }

    // createRental(postedData: CreateRental): Observable<Rental> {
    //     const url = 'api/Rentals';

    //     return this.http.post<Rental>(url, postedData)
    //         .pipe(
    //             catchError(this.handleError<Rental>('createRental', undefined))
    //         );
    // }



    // getHireRequest(id: number): Observable<HireRequest> {
    //     let url = `api/HireRequests/${id}`;
    //     return this.http.get<HireRequest>(url)
    //         .pipe(
    //             catchError(this.handleError<HireRequest>('getHireRequest'))
    //         );
    // }

    // createHireRequests(postedData: HireRequestDto): Observable<HireRequestDto> {
    //     const url = 'api/HireRequests';

    //     return this.http.post<any>(url, postedData)
    //         .pipe(
    //             catchError(this.handleError<any>('createHireRequests', undefined))
    //         );
    // }

    // updateHireRequests(id: number, postedData: any): Observable<any> {
    //     const url = `api/HireRequests/${id}`;

    //     return this.http.put<any>(url, postedData)
    //         .pipe(
    //             catchError(this.handleError<any>('createHireRequests', undefined))
    //         );
    // }

    // getVehicleKinds(): Observable<any[]> {
    //     const url = 'api/Kinds';
    //     return this.http.get<any[]>(url)
    //         .pipe(
    //             catchError(this.handleError<any[]>('getVehicleKinds', []))
    //         );
    // }

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
