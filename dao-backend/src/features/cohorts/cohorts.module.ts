import { Module } from '@nestjs/common';
import { CohortsController } from './controllers/cohorts.controller';
import { CohortsService } from './services/cohorts.service';

@Module({ controllers: [CohortsController], providers: [CohortsService] })
export class CohortsModule {}
