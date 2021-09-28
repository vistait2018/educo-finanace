import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SchoolResponse } from '../types/api';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  constructor(private http: HttpClient) { }


  getSchool() {
    return this.http.get<SchoolResponse>(`${this.apiUrl}schools`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  updateSchool(id: number, school: SchoolResponse) {
    return this.http.post(`${this.apiUrl}schools/${id}`, JSON.stringify(school), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  uploadSchoolLogo(id: number, school_logo: any) {
    return this.http.post(`${this.apiUrl}schools/${id}/logo`, school_logo)
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
