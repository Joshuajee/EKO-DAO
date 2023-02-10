import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/commons/constants';
import { INVALID_PASSWORD } from 'src/commons/messages';
import { RolesEnum } from '../enums/roles.enum';

export class AdminDto {
  @ApiProperty({
    description: "Admin's email address",
    example: 'admin@ekolance.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin's password",
    example: 'Password@123',
  })
  @Matches(PASSWORD_REGEX, { message: INVALID_PASSWORD })
  password: string;

  @ApiProperty({
    description: "Admin's role",
    example: RolesEnum.SUPER_ADMIN,
  })
  @IsEnum(RolesEnum)
  role: RolesEnum;
}
