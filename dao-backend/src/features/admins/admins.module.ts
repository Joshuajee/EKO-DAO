import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsController } from './controllers/admins.controller';
import { Admin } from './entities/admin.entity';
import { AdminsService } from './services/admins.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AuthService, JwtStrategy],
})
export class AdminsModule {}
