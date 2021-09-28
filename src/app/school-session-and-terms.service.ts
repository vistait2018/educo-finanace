import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {SchoolSessionAndTernmInfo,SchoolSessionAndTernmInfoResponse} from '../types/api'
@Injectable({
  providedIn: 'root'
})
export class SchoolSessionAndTermsService {
  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { }

getSessionTermInfo(){
 return this.http.get<SchoolSessionAndTernmInfoResponse>(`${this.apiUrl}school-session-term-info`).pipe(
    retry(1),
    catchError(this.error)
  )
}
  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
