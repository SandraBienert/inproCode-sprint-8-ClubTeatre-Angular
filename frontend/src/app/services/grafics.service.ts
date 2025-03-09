
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GraficsService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/grafics';
  }

  getGrafics(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }
};



