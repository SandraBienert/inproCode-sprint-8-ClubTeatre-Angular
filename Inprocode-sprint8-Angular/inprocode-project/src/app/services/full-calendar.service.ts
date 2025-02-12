import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.myApiUrl = 'api/events';
    console.log(this.myApiUrl)
    }

    getAgenda(): Observable<ICalendar[]> {
      return this.http.get<ICalendar[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    addEvent(event: ICalendar): Observable<void> {
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, event);
    }


    deleteEvent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }
}
