import { Injectable, EventEmitter, Output } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() change: EventEmitter<any> = new EventEmitter();
  responseMsg: string;
  errorInApi = false;
  constructor(private http: HttpClient) { }

  dataJsonLoad(path) {
    return this.http.get(path).pipe(
      tap((res: any) => {
        console.log(res);
      }),
      catchError((error: HttpErrorResponse) => {
          this.responseMsg = 'Something went wrong';
          console.log('error find');
          this.errorInApi = true;
          return throwError('notFound');
        }
      )
    );
  }
}
