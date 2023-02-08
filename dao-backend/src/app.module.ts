import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonsModule } from './commons/commons.module';
import { HttpExceptionFilter } from './commons/http-exception.filter';
import { ConfigurationModule } from './config/configuration.module';
import { ConfigurationService } from './config/configuration.service';
import { FeaturesModule } from './features/features.module';

const env = process.env.NODE_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/${env}.env`],
    }),
    ConfigurationModule,
    CommonsModule,
    FeaturesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (config: ConfigurationService) => {
        return {
          type: config.dbtype as any,
          host: config.dbhost,
          port: config.dbport,
          database: config.dbname,
          username: config.dbuser,
          password: config.dbpassword,
          entities: [`dist/**/*.entity.{ts,js}`],
          synchronize: false,
          migrationsRun: true,
          logging: false,
          maxQueryExecutionTime: 1000,
          migrations: [`dist/migrations/*.{ts,js}`],
          connectTimeoutMS: 5000,
        };
      },
    }),
  ],
})
export class AppModule {}
