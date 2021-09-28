import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Role, RolesResponse } from '../types/api';
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get<RolesResponse>(`${this.apiUrl}roles`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  getRoleById(id: number) {
    return this.http.get<Role>(`${this.apiUrl}roles/${id}`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  makeRole(role: Role) {
    return this.http.post(this.apiUrl + 'roles', JSON.stringify(role), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  updateRole(id: number, role: Role) {
    return this.http.post(this.apiUrl + 'roles/' + id, JSON.stringify(role), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  deleteRole(id: number) {
    return this.http.delete(this.apiUrl + 'roles/' + id, this.httpOptions)
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
