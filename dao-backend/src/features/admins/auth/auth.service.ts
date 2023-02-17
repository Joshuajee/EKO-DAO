import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../services/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async login(walletAddress: string): Promise<any> {
    try {
      const user = await this.adminsService.getByWalletAddress(walletAddress);
      const payload = { id: user.id, walletAddress: walletAddress };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
