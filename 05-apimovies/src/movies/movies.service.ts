import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './interfaces/movie.interface';
import { Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

  async create(movieDto: MovieDto): Promise<Movie> {
    const movie = new this.movieModel(movieDto);
    return await movie.save();
  }

  // Las funciones async no sabes cuanto van a tardar
  async getMovies(): Promise<Movie[]> {
    return await this.movieModel.find();
  }

  async getMovie(idMovie: string): Promise<Movie> {
    return await this.movieModel.findById(idMovie);
  }

  async getMovieByName(name: string): Promise<Movie[]> {
    const regex = new RegExp(name, 'i');
    return await this.movieModel.find({ title: { $regex: regex } });
  }

  async updateMovie(idMovie: string, movieDto: MovieDto): Promise<Movie> {
    return await this.movieModel.findByIdAndUpdate(
      idMovie,
      { $set: movieDto },
      { new: true },
    );
  }

  async deleteMovie(idMovie: string): Promise<any> {
    return await this.movieModel.findByIdAndDelete(idMovie);
  }

  // Saca los generos en un array de string sin que se repitan
  async getGenres(): Promise<string[]> {
    return await this.movieModel.find().distinct('genres');
  }
}
