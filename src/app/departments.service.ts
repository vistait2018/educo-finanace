import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Department, DepartmentRespose, SchoolClassInDepartmentResponse } from '../types/api';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get<DepartmentRespose>(`${this.apiUrl}departments`).pipe(
      retry(1),
      catchError(this.error)
    )
  }

  update(id: number, data: DepartmentRespose) {
    return this.http.post(this.apiUrl + 'department/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )

  }

  create(department: any): Observable<any> {

    return this.http.post(this.apiUrl + 'department', JSON.stringify(department), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  getDepartmentById(departmentId: number) {
    return this.http.get<Department>(`${this.apiUrl}departments/${departmentId}`).pipe(
      retry(1),
      catchError(this.error)
    )
  }

  delete(departmentId: number) {
    return this.http.delete<Department>(`${this.apiUrl}departments/${departmentId}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  addSchoolClass(departmentId: number, schoolClassIds: number[]) {
    return this.http.post(`${this.apiUrl}departments/${departmentId}/school-classes`, JSON.stringify(schoolClassIds), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  updateDepartmentSchoolClasses(departmentId: number, schoolClassIds: number[]) {
    return this.http.post(`${this.apiUrl}departments/${departmentId}/school-classes-update`, JSON.stringify(schoolClassIds), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  getSchoolClassesFromDepartments(departmentId: number) {
    return this.http.get<SchoolClassInDepartmentResponse>(`${this.apiUrl}departments/${departmentId}/school-classes`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  removeAllSchoolClassesFromDepartment(departmentId: number, schoolClassIds: number[]) {
    return this.http.post(`${this.apiUrl}departments/${departmentId}/school-classes-all`, JSON.stringify(schoolClassIds), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  removeSchoolClassesFromDepartments(departmentId: number) {
    return this.http.post(`${this.apiUrl}departments/${departmentId}/school-classes`, this.httpOptions)
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
