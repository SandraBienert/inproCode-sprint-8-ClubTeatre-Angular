import { MapTeatres } from './../interfaces/map-teatres';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapTeatresService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    console.log(this.myAppUrl)
    this.myApiUrl = 'api/map'; // ← Canviat sense barra final
   console.log(this.myApiUrl)
  }

  getMapTeatres(): Observable<MapTeatres[]> {
    return this.http.get<MapTeatres[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
