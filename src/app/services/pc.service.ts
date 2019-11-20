import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, ObservedValueOf, timer } from 'rxjs';
import { catchError, tap, switchMap} from 'rxjs/operators';
import { PC } from '../pc-model/pc.model';
import { Part } from '../part-model/pc-part.model';

@Injectable({
    providedIn: 'root'
})
export class PCService {
    private urlForPCs = 'http://localhost:3000/pcs';
    private urlForParts = 'http://localhost:3000/parts';

    constructor(private http: HttpClient) {
    }

    getPCS(): Observable<PC[]> {
        return this.http.get<PC[]>(this.urlForPCs).pipe(
            tap(data => console.log("PCS fetched")), catchError(this.handleError));
    }

    getParts(): Observable<Part[]>{
        return this.http.get<Part[]>(this.urlForParts).pipe(tap(data => console.log("Parts fetched")), catchError(this.handleError));
    }

    createPart(part: Part) {
        return this.http.post(this.urlForParts, part).pipe(tap(data => console.log('Part Added')), catchError(this.handleError));
    }

    checkIfIdExistsForParts(id: number){
        return timer(5).pipe(switchMap(() => {
            return this.http.get<any>(this.urlForParts + `/${id}`).toPromise().then();
        })
        );
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    };
}