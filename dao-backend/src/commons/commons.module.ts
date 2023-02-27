import { Global, Module } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Web3Helper } from './helpers/web3-helper';
import { SwaggerModule } from './swagger/swagger.module';

@Global()
@Module({
  imports: [SwaggerModule],
  providers: [HttpExceptionFilter, Web3Helper],
  exports: [SwaggerModule, HttpExceptionFilter, Web3Helper],
})
export class CommonsModule {}
