export interface ApiResultMovies {
  info: Info
  movies: Movie[]
}

export interface Info {
  count: number
  page: number
}

export interface Movie {
  imdb: Imdb
  _id: string
  title: string
  year: number
  director: string
  plot: string
  poster: string
  genres: string[]
  favorite: boolean
}

export interface Imdb {
  rating: number
  votes: number
}
