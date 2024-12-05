import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Movie',
        schema: MovieSchema,
        // El collection no es obligatorio pero LO PONEMOS
        collection: 'moviesDWEC',
      },
    ]),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
