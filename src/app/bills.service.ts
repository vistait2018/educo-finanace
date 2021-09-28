import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConpulsoryBillResponse, GeneralBillResponse, AddOrRemoveResponse, StoreBillResponse, Bill, SchoolBillResponse, studentBillResponse, } from '../types/api';


@Injectable({
  providedIn: 'root'
})
export class BillsService {
  apiUrl: string = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  fetchCompulsoryBills(): Observable<ConpulsoryBillResponse> {

    return this.http.get<ConpulsoryBillResponse>(`${this.apiUrl}compulsoryBills`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  fetchStoreBills(): Observable<StoreBillResponse> {

    return this.http.get<StoreBillResponse>(`${this.apiUrl}storeBills`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  fetchGeneralBills(): Observable<GeneralBillResponse> {

    return this.http.get<GeneralBillResponse>(`${this.apiUrl}generalBills`).pipe(
      retry(1),
      catchError(this.error)
    )
  }

  fetchSpecificCompulsoryBills(): Observable<GeneralBillResponse> {

    return this.http.get<GeneralBillResponse>(`${this.apiUrl}specificCompulsoryBill`).pipe(
      retry(1),
      catchError(this.error)
    )
  }


  fetchBillByStudentId(studentId: any): Observable<studentBillResponse> {
    return this.http.get<studentBillResponse>(this.apiUrl + `student/${studentId}/bill`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  create(compulsory_bill: any): Observable<any> {

    return this.http.post(this.apiUrl + 'bills', JSON.stringify(compulsory_bill), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  saveStoreQuantity(student_id: number, class_id: number, bill: any): Observable<any> {


    return this.http.post(`${this.apiUrl}student/${student_id}/class/${class_id}/payment`, JSON.stringify(bill), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  addGeneralBill(student_id: number, class_id: number, bill: any): Observable<AddOrRemoveResponse> {

    return this.http.post<AddOrRemoveResponse>(`${this.apiUrl}student/${student_id}/class/${class_id}/add`, JSON.stringify(bill), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  removeGeneralBill(student_id: number, class_id: number, bill: any): Observable<AddOrRemoveResponse> {

    return this.http.post<AddOrRemoveResponse>(`${this.apiUrl}student/${student_id}/class/${class_id}/remove`, JSON.stringify(bill), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + 'bills/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }


  updateRole(id: number, bill: Bill) {
    return this.http.post(this.apiUrl + 'bills/' + id, JSON.stringify(bill), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.error)
      )
  }

  // Handle Errors 
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
