import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Add section of Home and Movies
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'business/peliculas', component: MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
