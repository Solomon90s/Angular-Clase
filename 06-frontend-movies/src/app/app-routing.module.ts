import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviesListComponent} from "./components/movies-list/movies-list.component";
import {MoviesEditComponent} from "./components/movies-edit/movies-edit.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: "full"
  },
  {
    path: 'movies',
    component: MoviesListComponent
  },
  {
    path: 'movies/add',
    component: MoviesEditComponent
  },
  {
    path: 'movies/edit/:id',
    component: MoviesEditComponent
  },
  {
    path: '**',
    redirectTo: '/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
