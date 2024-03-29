import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('env');
  }

  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get host(): string {
    return this.configService.get<string>('app.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
  get version(): string {
    return this.configService.get<string>('app.version');
  }
  get allowedOrigins(): any {
    return this.configService.get<any>('app.allowedOrigins');
  }
  get jwtSecret(): string {
    return this.configService.get<string>('app.jwtSecret');
  }
  get jwtLife(): string {
    return this.configService.get<string>('app.jwtLife');
  }
  get swaggerEnabled(): boolean {
    return this.configService.get<string>('app.swaggerEnabled') === 'true'
      ? true
      : false;
  }
  get dbtype(): string {
    return this.configService.get<string>('db.type');
  }

  get dbhost(): string {
    return this.configService.get<string>('db.host');
  }

  get dbport(): number {
    return Number(this.configService.get<number>('db.port'));
  }

  get dbname(): string {
    return this.configService.get<string>('db.name');
  }

  get dbuser(): string {
    return this.configService.get<string>('db.user');
  }

  get dbpassword(): string {
    return this.configService.get<string>('db.password');
  }

  get providerUrl(): string {
    return this.configService.get<string>('bc.providerUrl');
  }

  get chainId(): number {
    return this.configService.get<number>('bc.chainId');
  }

  get superAdminAddress(): string {
    return this.configService.get<string>('bc.superAdminAddress');
  }

  get superAdminPrivateKey(): string {
    return this.configService.get<string>('bc.superAdminPrivateKey');
  }

  get superAdminPublicKey(): string {
    return this.configService.get<string>('bc.superAdminPublicKey');
  }

  get diamondAddress(): string {
    return this.configService.get<string>('bc.diamondAddress');
  }
}
