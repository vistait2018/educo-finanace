import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ClassesResponse, ClassResponse } from '../types/api';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }


  fetchClasses(): Observable<ClassesResponse> {

    return this.http.get<ClassesResponse>(`${this.apiUrl}school-classes`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  update(id: number, data: ClassesResponse): Observable<any> {
    return this.http.post(this.apiUrl + 'school-classes/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )

  }


  create(classes: any): Observable<any> {

    return this.http.post(this.apiUrl + 'school-classes', JSON.stringify(classes), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  delete(id: number) {
    return this.http.delete<ClassesResponse>(this.apiUrl + 'school-classes/' + id)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  getClass(id: number): Observable<ClassResponse> {
    return this.http.get<ClassResponse>(this.apiUrl + 'school-classes/' + id)
      .pipe(
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
    // @ts-ignore
    $.showMessage(errorMessage, 'danger');
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
