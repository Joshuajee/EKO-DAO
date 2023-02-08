import { Module } from '@nestjs/common';
import { CrowdfundingsController } from './controllers/crowdfundings.controller';
import { CrowdfundingsService } from './services/crowdfundings.service';

@Module({
  controllers: [CrowdfundingsController],
  providers: [CrowdfundingsService],
})
export class CrowdfundingsModule {}
