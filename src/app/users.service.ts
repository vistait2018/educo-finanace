import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User, UserRoles, UserPaginate } from '../types/api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }



  getUsers() {
    return this.http.get<UserPaginate>(`${this.apiUrl}users`).pipe(
      retry(1),
      catchError(this.error)
    )
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}users/${id}`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  makeUser(user: User) {
    return this.http.post(this.apiUrl + 'users', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  updateUser(id: number, user: User) {
    return this.http.post(this.apiUrl + 'users/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + 'users/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  getUserTRoles(id: number) {
    return this.http.delete(this.apiUrl + 'users-roles/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  updateUserRole(id: number) {
    return this.http.delete(this.apiUrl + 'users-update/' + id + '/roles', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  getUserERoles(id: number) {
    return this.http.get<UserRoles>(`${this.apiUrl}users/${id}/roles`).pipe(
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
