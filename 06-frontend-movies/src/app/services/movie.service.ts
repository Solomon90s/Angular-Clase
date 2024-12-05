import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResultMovies, Movie} from "../common/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // Creamos la url base a la que nos conectamos
  private URI = 'http://localhost:3000/api/movies/';

  constructor(private http: HttpClient) { }

  // funcion getMovies
  getMovies(): Observable<ApiResultMovies>{
    return this.http.get<ApiResultMovies>(this.URI);
  }

  // funcion añadir pelicula
  addMovie(movie: Movie): Observable<ApiResultStatus>{
    return this.http.post<ApiResultStatus>(this.URI,movie);
  }

  // funcion coger una pelicula
  getOneMovie(id:string): Observable<Movie>
  {
    return this.http.get<Movie>(this.URI+'movie/'+id);
  }

  // funcion para coger pelicula por nombre
  getOneMoviesByName(name:string): Observable<Movie[]>
  {
    return this.http.get<Movie[]>(this.URI+'movieByName/'+name);
  }

  // funcion para editar
  updateMovie(movie: Movie): Observable<ApiResultStatus>{
    return this.http.patch<ApiResultStatus>(this.URI+movie._id, movie);
  }

  // funcion para eliminar
  deleteMovie(id: string): Observable<ApiResultStatus>{
    return this.http.delete<ApiResultStatus>(this.URI+id);
  }

  // funcion para sacar los generos
  getGenres(): Observable<string[]>{
    return this.http.get<string[]>(this.URI+'genres');
  }


}

// creamos esta infertaz que solo usamos aquí
interface ApiResultStatus{
  status: string;
}


