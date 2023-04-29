import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../models/movie.model';
import { HttpDataService } from '../services/http-data.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  displayedColumns: string[] = ['id', 'name', 'photo', 'duration', 'genre','actions'];
  @ViewChild('movieForm', {static: false})
  movieForm!: NgForm
  moviedata!: Movie
  dataSource = new MatTableDataSource();
  beignEdited = false;
  totalHours = 0;
  totalMovies = 0;
  constructor(private HttpDataService: HttpDataService) { 
    this.moviedata= {} as Movie;
  }


  
  @ViewChild(MatPaginator, {static:true}) paginator! : MatPaginator;
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllMovies();
  }


  resetForm(){
    this.movieForm.resetForm();
    this.beignEdited = false;
  }

  getAllMovies(){
    this.HttpDataService.getList().subscribe((res: any) => {
      
      this.dataSource.data= res;
    })

  }

  addMovie(){
    this.moviedata.id = 0
    this.HttpDataService.createMovie(this.moviedata).subscribe((res : any)=>{
        this.getAllMovies();
    })
  }
  

  deleteMovie(el_id : string){
    this.HttpDataService.deleteMovie(el_id).subscribe((res: any) =>{
      const idx = this.dataSource.data.findIndex((o : any) => o.id === el_id)
      if(idx != -1){
        this.dataSource.data.splice(idx,1);
        // splice(elemento a eliminar, cant de elementos)
        this.dataSource.data = [... this.dataSource.data];
        //... operator crea una nueva instancia de dataSource y la actualiza
      }
    })    
  }
  
  onSubmit(){
    if(this.movieForm.form.valid){
      console.log("Todos los campos son válidos");
    }
  }



  editMovie(movie : Movie){
    this.moviedata = _.cloneDeep(movie);
    this.beignEdited = true;
  }
  updateMovie(el_id : string){
    this.HttpDataService.updateMovie(el_id, this.moviedata).subscribe((res: any) => {      
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if(o.id == res.id){
          o = res;
        }
        return o;
        });
        this.resetForm()
    });
  }


  getTotalHours(){
    this.totalHours = this.dataSource.data.map((t: any) => t.duration).reduce((acc: any, value: any) => acc + value);
  }
  getTotalMovies(){
    
    this.totalMovies = this.dataSource.data.length +1;
    
  }
}
