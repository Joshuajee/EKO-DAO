import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CohortsController } from './controllers/cohorts.controller';
import { Cohort } from './entities/cohorts.entity';
import { CohortsService } from './services/cohorts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cohort])],
  controllers: [CohortsController],
  providers: [CohortsService],
})
export class CohortsModule {}
