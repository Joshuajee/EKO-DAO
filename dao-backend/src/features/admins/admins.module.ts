import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsController } from './controllers/admins.controller';
import { Admin } from './entities/admin.entity';
import { AdminsService } from './services/admins.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationService } from 'src/config/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    {
      ...JwtModule.registerAsync({
        inject: [ConfigurationService],
        useFactory: async (config: ConfigurationService) => ({
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.jwtLife },
        }),
      }),
      global: true,
    },
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AuthService, JwtStrategy],
})
export class AdminsModule {}
