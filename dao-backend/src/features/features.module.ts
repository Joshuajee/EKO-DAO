import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { CohortsModule } from './cohorts/cohorts.module';
import { CrowdfundingsModule } from './crowdfundings/crowdfundings.module';
import { HackathonsModule } from './hackathons/hackathons.module';
import { ImprovementProposalsModule } from './improvement-proposals/improvement-proposals.module';

@Module({
  imports: [
    AdminsModule,
    CohortsModule,
    CrowdfundingsModule,
    HackathonsModule,
    ImprovementProposalsModule,
  ],
})
export class FeaturesModule {}
