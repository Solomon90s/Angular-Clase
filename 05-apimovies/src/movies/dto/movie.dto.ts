// corresponde a la  parte que vamos a trabajar con el usuario
// Es el objeto con el que vamos hacer la transferencia de datos con el usuario
import { Imdb } from '../interfaces/movie.interface';

export class MovieDto {
  imbd: Imdb;
  _id: string;
  title: string;
  year: number;
  director: string;
  plot: string;
  poster: string;
  genres: string[];
  favorite: boolean;
}
