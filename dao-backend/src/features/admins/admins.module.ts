import { Module } from '@nestjs/common';
import { AdminsController } from './controllers/admins.controller';
import { AdminsService } from './services/admins.service';

@Module({ controllers: [AdminsController], providers: [AdminsService] })
export class AdminsModule {}
