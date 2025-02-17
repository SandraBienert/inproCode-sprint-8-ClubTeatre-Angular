import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Imembers } from '../interfaces/imembers';


@Injectable({
  providedIn: 'root'
})

export class membersService {

  private myAppUrl : string;
  private myApiUrl : string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/members/';
    console.log(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getListMembres(): Observable<Imembers[]> {
    return this.http.get<Imembers[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      tap(membres => console.log('📌 Membres rebuts:', membres)),
      catchError(error => {
        console.error('❌ Error API:', error);
        return throwError(() => new Error('Error carregant membres'));
      })
    );
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
}

saveMember(member: Imembers): Observable<Imembers> {
  return this.http.post<Imembers>(`${this.myAppUrl}${this.myApiUrl}`, member);
}

getMember(id: number): Observable<Imembers> {
  return this.http.get<Imembers>(`${this.myAppUrl}${this.myApiUrl}${id}`);
}

updateMember(id: number, member: Imembers): Observable<void> {
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, member);
}
}
