import { Module } from '@nestjs/common';
import { HackathonsController } from './controllers/hackathons.controller';
import { HackathonsService } from './services/hackathons.service';

@Module({ controllers: [HackathonsController], providers: [HackathonsService] })
export class HackathonsModule {}
