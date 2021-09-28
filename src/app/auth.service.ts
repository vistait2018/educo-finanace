import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<{ token: string }>(this.apiUrl + 'login', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error))
  }
  logout() {
    return this.http.post(this.apiUrl + 'logout', JSON.stringify({}), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error))
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // @ts-ignore
    $.showMessage(errorMessage, 'danger');
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
