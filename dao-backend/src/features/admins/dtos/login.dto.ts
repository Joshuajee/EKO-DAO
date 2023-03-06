import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "Admin's wallet address",
    example: '0xE33C28d21BB90a95E3745296124d338a4D15603f',
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
