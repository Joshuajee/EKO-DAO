import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/http-exception.filter';
import { SwaggerService } from './commons/swagger/swagger.service';
import { ConfigurationService } from './config/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  const swagger = app.get(SwaggerService);
  swagger.init(app);
  const appConfig: ConfigurationService = app.get(ConfigurationService);
  await app.listen(appConfig.port);
}
bootstrap();
