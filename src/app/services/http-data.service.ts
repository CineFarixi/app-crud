import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Movie} from '../models/movie.model';


@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_url = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getList(){
    return this.http.get<Movie>(this.base_url);
  }

}
