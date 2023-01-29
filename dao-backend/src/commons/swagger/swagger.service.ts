import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigurationService } from 'src/config/configuration.service';

@Injectable()
export class SwaggerService {
  constructor(private readonly configurationService: ConfigurationService) {}

  init(app: any) {
    const options = new DocumentBuilder()
      .setTitle(this.configurationService.name)
      .setDescription(`The ${this.configurationService.name} APIs description`)
      .setVersion(this.configurationService.version)
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .addSecurity('basic', {
        type: 'http',
        scheme: 'basic',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('apis', app, document);
  }
}
