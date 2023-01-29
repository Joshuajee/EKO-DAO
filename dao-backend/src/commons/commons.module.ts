import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [SwaggerModule],
  exports: [SwaggerModule],
})
export class CommonsModule {}
