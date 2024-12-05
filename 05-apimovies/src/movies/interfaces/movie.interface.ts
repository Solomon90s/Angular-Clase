// Interfaz de datos completa que vamos a trabajar con el schema
export interface Movie {
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
export interface Imdb {
  rating: number;
  votes: number;
}
