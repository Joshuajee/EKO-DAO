import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonsModule } from './commons/commons.module';
import { ConfigurationModule } from './config/configuration.module';
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
  ],
})
export class AppModule {}
