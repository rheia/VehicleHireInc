import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convert } from '../dto/hire-requests/payment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private http: HttpClient) { }

    getSymbols(): Observable<any> {
        const url = `https://api.apilayer.com/exchangerates_data/symbols`;
        return this.http.get(url, {
            headers: {
                skip: "true",
                apikey: environment.apiKey,
            }
        });
    }

    convert(from: string, to: string, ammount: number): Observable<Convert> {
        const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${ammount}`;
        return this.http.get<Convert>(url, {
            headers: {
                skip: "true",
                apikey: environment.apiKey,
            }
        });
    }


}
