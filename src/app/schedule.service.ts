import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GeneratorRequest, Schedule} from './model/schedule.model';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private api = 'http://localhost:8080/generator';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private http: HttpClient) {
  }

  generate(request: GeneratorRequest): Observable<Schedule> {
    return this.http.post<Schedule>(this.api, request, this.httpOptions)
      .pipe(
        catchError(this.handleError<Schedule>('generate'))
      );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
