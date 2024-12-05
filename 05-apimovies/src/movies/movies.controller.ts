import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  // emmpezamos con los endpoint
  // Metodo post crear
  @Post()
  async create(@Body() movieDto: MovieDto) {
    try {
      // Guardamos la consulta y si hemos podido insertar se lo decimos, si no mostramos el error
      const movie = await this.movieService.create(movieDto);
      if (movie) {
        return {
          status: 'Movie inserted.',
        };
      }
    } catch (e) {
      return {
        status: e.message(),
      };
    }
  }

  // Metodo get coger información
  @Get()
  async getMovies() {
    const movies = await this.movieService.getMovies();
    return {
      info: {
        count: 1234,
        page: 1,
      },
      movies: movies,
    };
  }

  // Para coger información de una pelicula
  @Get('movie/:id')
  async getMovie(@Param('id') id: string) {
    try {
      const movie = await this.movieService.getMovie(id);
      if (movie) {
        return movie;
      } else {
        return {
          status: 'Ese id no existe en la base de datos',
        };
      }
    } catch (e) {
      return {
        status: e.message(),
      };
    }
  }

  // Para coger información dado el nombre de la pelicula
  @Get('movieByName/:name')
  async getMovieByName(@Param('name') name: string) {
    try {
      const movies = await this.movieService.getMovieByName(name);
      if (movies) {
        return movies;
      } else {
        return {
          status: 'No encuentra películas con ese nombre',
        };
      }
    } catch (e) {
      return {
        status: e.message(),
      };
    }
  }

  // Método para actualizar
  // Para coger información de una pelicula
  @Patch('/:id')
  async updateMovie(@Param('id') id: string, @Body() movieDto: MovieDto) {
    try {
      const movie = await this.movieService.updateMovie(id, movieDto);
      if (movie) {
        return {
          status: 'Movie update',
        };
      } else {
        return {
          status: 'Ese id no existe en la base de datos',
        };
      }
    } catch (e) {
      return {
        status: e.message(),
      };
    }
  }

  // Para eliminar pelicula por id
  @Delete('/:id')
  async deleteMovie(@Param('id') id: string) {
    try {
      const movie = await this.movieService.deleteMovie(id);
      if (movie) {
        return {
          status: 'Movie deleted',
        };
      } else {
        return {
          status: 'Ese id no existe en la base de datos',
        };
      }
    } catch (e) {
      return {
        status: e.message(),
      };
    }
  }

  // Para que me devuelva los generos
  @Get('/genres')
  async getGenres() {
    return await this.movieService.getGenres();
  }
}
