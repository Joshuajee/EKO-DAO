import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/commons/constants/constants';
import { INVALID_PASSWORD } from 'src/commons/constants/messages';
import { RolesEnum } from '../enums/roles.enum';

export class AdminDto {
  @ApiProperty({
    description: "Admin's email address",
    example: 'admin@ekolance.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin's wallet address",
    example: '0x72e05ff8738D7919aa346Ad553AF2f1e770c0008',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    description: "Admin's password",
    example: 'Password@123',
  })
  @Matches(PASSWORD_REGEX, { message: INVALID_PASSWORD })
  password: string;

  @ApiProperty({
    description: "Admin's role",
    example: RolesEnum.ADMIN,
  })
  @IsEnum(RolesEnum)
  role: RolesEnum;
}
