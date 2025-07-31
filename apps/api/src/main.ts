import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GeneralConfig } from './config/general.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const frontendUrl = configService.get<GeneralConfig>('general')?.frontendUrl;
  const port = configService.get<GeneralConfig>('general')?.port;

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization',
  });

  console.log('LISTENING FROM PORT: ', port);

  await app.listen(port);
}
bootstrap();
