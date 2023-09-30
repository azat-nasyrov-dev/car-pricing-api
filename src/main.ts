import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    cookieSession({
      keys: ['secret'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port, () => console.log(`Server started on port: ${port}`));
}

bootstrap();
