import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { Web3Helper } from './commons/helpers/web3-helper';
import { SwaggerService } from './commons/swagger/swagger.service';
import { ConfigurationService } from './config/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  const appConfig: ConfigurationService = app.get(ConfigurationService);
  app.enableCors({
    origin: appConfig.allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  if (appConfig.swaggerEnabled) {
    const swagger = app.get(SwaggerService);
    swagger.init(app);
  }
  await app.listen(appConfig.port);
  const web3Helper: Web3Helper = app.get(Web3Helper);
  web3Helper.instantiateWeb3(appConfig.providerUrl);
}
bootstrap();
