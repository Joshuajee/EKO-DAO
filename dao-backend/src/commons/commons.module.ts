import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [SwaggerModule],
  providers: [HttpExceptionFilter],
  exports: [SwaggerModule, HttpExceptionFilter],
})
export class CommonsModule {}
