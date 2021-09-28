import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StudentsResponse, Student, StudentResponse } from '../types/api';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {

  }

  getAllStudent() {
    return this.http.get<StudentsResponse>(`${this.apiUrl}students`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  addStudent(student: any) {
    return this.http.post(this.apiUrl + 'student/create/class', JSON.stringify(student), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  findStudentById(studentId: any) {
    return this.http.get<StudentResponse>(this.apiUrl + 'students/' + studentId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )

  }

  getStudentsInClass(classId: any) {
    return this.http.get<StudentsResponse>(this.apiUrl + 'students/class/' + classId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  update(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'students/' + data.id + '/class/' + data.class_id, JSON.stringify(data), this.httpOptions)
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
