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
    this.myApiUrl = 'api/full-calendar';
    console.log(this.myApiUrl)
    }

    getAgenda(start?: string, end?: string): Observable<ICalendar[]> {
      let params = '';
      if (start && end) {
        params = `?start=${start}&end=${end}`;
      }

      const apiUrl = `${this.myAppUrl}${this.myApiUrl}${params}`;
      console.log('🔍 Cridant API:', apiUrl); // 👈 Això mostrarà l'URL complet

      return this.http.get<ICalendar[]>(apiUrl);
    }



    addEvent(event: ICalendar): Observable<void> {
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, event);
    }


    deleteEvent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }
}
