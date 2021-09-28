import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ClassesResponse, ClassResponse } from '../types/api';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  pay(data: any, student_id: number) {
    return this.http.post(this.apiUrl + `pay/${student_id}`, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
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
