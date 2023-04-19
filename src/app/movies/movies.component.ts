import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../models/movie.model';
import { HttpDataService } from '../services/http-data.service';
import { catchError, Observable, retry, throwError } from 'rxjs';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  displayedColumns: string[] = ['id', 'name', 'photo', 'duration', 'genre'];
  movieForm!: NgForm
  moviedata!: Movie
  dataSource = new MatTableDataSource();
  constructor(private HttpDataService: HttpDataService) { 
    this.moviedata= {} as Movie;
  }


  @ViewChild(MatPaginator, {static:true}) paginator! : MatPaginator;
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllMovies();
  }

  getAllMovies(){
    this.HttpDataService.getList().subscribe((res: any) => {
      this.dataSource.data = res;
    })

  }
  
}
