import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/commons/constants/constants';
import { INVALID_PASSWORD } from 'src/commons/constants/messages';

export class LoginDto {
  @ApiProperty({
    description: "Admin's wallet address",
    example: '0xE33C28d21BB90a95E3745296124d338a4D15603f',
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({
    description: "Admin's password",
    example: 'Password@123',
  })
  @Matches(PASSWORD_REGEX, { message: INVALID_PASSWORD })
  password: string;
}
