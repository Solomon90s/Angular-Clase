import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Si al controller no le damos ninguna ruta, por defecto es /
// Le estamos diciendo que en cualquiera de estas rutas

/*
'' ruta vacia -> http://localhost:3000
'api' --> http://localhost:3000/api
'api/movies' --> http://localhost:3000/api/movies
'api' --> http://localhost:3000/movie
 */
@Controller(['', 'api', 'api/movie', 'movie'])
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
