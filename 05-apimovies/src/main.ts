import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Importante hacer esto para poder llamar a la API desde el frontend
  app.enableCors({
    credentials: true,
    // Aqui le decimos que nos conectamos a nuestra maquina local
    // Si la api fuera publica '*'
    origin: 'http://localhost:4200',
  });
  await app.listen(3000);
}
bootstrap();
