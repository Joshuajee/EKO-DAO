import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

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
}
