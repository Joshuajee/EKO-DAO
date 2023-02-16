import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "Admin's wallet address",
    example: '0x72e05ff8738D7919aa346Ad553AF2f1e770c0008',
  })
  @IsString()
  walletAddress: string;
}
