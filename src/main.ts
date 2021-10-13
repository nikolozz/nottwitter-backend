import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const allowedOrigins: string[] = config.get('FRONTEND_URL').split(',');
  const corsOtions =
    config.get('NODE_ENV') === 'production'
      ? {
          origin: (origin, cb) => {
            if (allowedOrigins.indexOf(origin) !== -1) {
              return cb(null, origin);
            }
            return cb(new Error(`Origin ${origin} is not allowed`));
          },
        }
      : {};

  app.enableCors({ ...corsOtions, exposedHeaders: ['Authentication'] });
  await app.listen(3000);
}
bootstrap();
