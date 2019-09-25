import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseApiUrl = 'http://localhost:3000';
  private headers = new HttpHeaders();
  constructor(private _http: HttpClient) {
    this.headers.append('Content-Type', 'application/json; charset=utf-8');

  }

  get(queryParams, url): Observable<any> {
    console.log(queryParams, this.baseApiUrl + url);
    return this._http.get<any>(this.baseApiUrl + url, queryParams).pipe(
      tap((data) => console.log(data, '')),
      catchError(this.handleError)
    );
  }

  post(data, url): Observable<any> {
    return this._http.post(this.baseApiUrl + url, data)
      .pipe(
        tap((response: any) => {

          return response;
        }),
        catchError(this.handleError));
  }

  put(data, url): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    headers = headers.append('Authorization', localStorage.getItem('token'));
    return this._http.put(this.baseApiUrl + url, data, {
      headers
    })
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      alert(error.error.error.message);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
