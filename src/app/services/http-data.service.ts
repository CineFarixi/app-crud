import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Movie} from '../models/movie.model';
import { Observable } from 'rxjs';


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
  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.base_url}/${id}`,this.httpOptions)
  }
  createMovie(item: Movie){
    return this.http.post<Movie>(this.base_url,JSON.stringify(item),this.httpOptions)
  }
}
