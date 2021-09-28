import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category, CategoryRespone } from '../types/api';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }



  fetchCategories(): Observable<CategoryRespone> {

    return this.http.get<CategoryRespone>(`${this.apiUrl}categories`).pipe(
      retry(1),
      catchError(this.error)
    )
  }

  update(id: number, data: CategoryRespone) {
    return this.http.post(this.apiUrl + 'category/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )

  }

  create(category: any): Observable<any> {

    return this.http.post(this.apiUrl + 'category', JSON.stringify(category), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  delete(id: number) {
    return this.http.delete<Category>(this.apiUrl + 'category/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  getCategoryDepartments(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}category/${categoryId}/departments`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  addDepartmentsToCategories(categoryId: number, departmenId: Array<number>) {
    return this.http.post(this.apiUrl + `category/${categoryId}/departments`, JSON.stringify(departmenId), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  updateDepartmentsToCategories(categoryId: number, departmenId: Array<number>) {
    return this.http.put(this.apiUrl + `category/${departmenId}/departments-update`, JSON.stringify(departmenId), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  getCategoryById(categoryId: number): Observable<CategoryRespone> {
    return this.http.get<CategoryRespone>(`${this.apiUrl}categories/${categoryId}`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  removeDepartmentsFromCategory(categoryId: number, departmentId: number[]) {
    return this.http.post(this.apiUrl + `category/${categoryId}/department`, JSON.stringify(departmentId), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  removeAllDepartmentFromCategory(categoryId: number) {
    return this.http.post(this.apiUrl + `category/${categoryId}/department`, this.httpOptions)
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
