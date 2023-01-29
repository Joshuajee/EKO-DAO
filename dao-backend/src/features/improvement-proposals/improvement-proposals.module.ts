import { Module } from '@nestjs/common';
import { ImprovementProposalsController } from './controllers/improvement-proposals.controller';
import { ImprovementProposalsService } from './services/improvement-proposals.service';

@Module({
  controllers: [ImprovementProposalsController],
  providers: [ImprovementProposalsService],
})
export class ImprovementProposalsModule {}
