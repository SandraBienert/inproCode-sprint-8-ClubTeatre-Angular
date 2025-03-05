import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ICalendar } from '../interfaces/i-calendar';

@Injectable({
  providedIn: 'root'
})
export class FullCalendarService {
    private myAppUrl: string;
    private myApiUrl: string;


    constructor(private http: HttpClient) {

    this.myAppUrl = environment.endpoint;
    console.log(this.myAppUrl)
    this.myApiUrl = 'api/full-calendar';
    console.log(this.myApiUrl)
    }

    getAgenda(): Observable<ICalendar[]> {
      return this.http.get<ICalendar[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
        tap(events => console.log('📌 Resposta API:', events)), // DEBUG
        catchError(error => {
          console.error('❌ Error carregant API:', error);
          return throwError(() => new Error('Error carregant els esdeveniments'));
        })
      );
    }


    addEvent(event: ICalendar): Observable<void> {
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, event);
    }


    deleteEvent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }
}
