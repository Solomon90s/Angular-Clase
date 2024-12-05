import {Component} from '@angular/core';
import {Movie} from "../../common/movie";
import {MovieService} from "../../services/movie.service";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {

  // creamos un boolean para filtrar por favoritos
  favorites = false;

  // esta lista de peliculas la usaremos para filtrar
  moviesList: Movie[] = [];

  // guardamos la lista de peliculas, donde cogeremos todas
  moviesAux: Movie[] = [];

  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  toastShow = false;

  constructor(private movieService: MovieService) {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getMovies().subscribe({
      // en el next nos viene la información
      next: value => {
        this.moviesList = value.movies;
        this.moviesAux = value.movies;
      },
      error: err => {
        this.mostrarToast(err.message);
      },
      complete: () => {
        this.mostrarToast('Load complete');
      }
    })
  }

  // creamos una funcion para cambiar el favorito
  changeFavorite(movie: Movie) {
    movie.favorite = !movie.favorite;
    this.movieService.updateMovie(movie).subscribe({
      next: value => {
        if (movie.favorite) {
          this.mostrarToast('Añadido a favoritos');
        } else {
          this.mostrarToast('eliminado de favoritos');
        }
        this.loadFavorites();
      }
    })
  }

  // el toast es el mensaje que lanza el mensaje que queremos mandar
  private mostrarToast(message: string) {
    this.toast.body = message;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 2000);
  }

  private loadFavorites() {
    if (this.favorites) {
      /* el filter guarda en un subarray todos los elementos que cumplan la condicion
        Que tiene dentro
      */
      this.moviesList = this.moviesAux.filter(
        movie => movie.favorite
      )
    } else this.moviesList = this.moviesAux;
  }

  favoriteList(){
    // si está en falso la ponemos a verdadero y viceversa
    // Y cargamos los favoritos
    this.favorites = !this.favorites;
    this.loadFavorites();
  }

  // barra de busqueda
  search(event: any){
    // el event es el nombre de la variable
    this.movieService.getOneMoviesByName(event).subscribe({
      next: value => {
        this.moviesList = value;
      },
      error: err => {
        this.mostrarToast(err.message);
      },
      complete: () => {
        console.log('Search complete');
      }
    })
  }

  // borrar pelicula
  deleteMovie(movie: Movie){
    this.movieService.deleteMovie(movie._id).subscribe({
      next: value => {
        this.mostrarToast(value.status);
        // recargamos las peliculas
        this.loadMovies();
      },
      error: err => {
        this.mostrarToast(err.message);
      },
      complete: () => {
        console.log('Deleted movie');
      }
    })
  }

  protected readonly faHeart = faHeart;
  protected readonly faHeartBroken = faHeartBroken;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
}
