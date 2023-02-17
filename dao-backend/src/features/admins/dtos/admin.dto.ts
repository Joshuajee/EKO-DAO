import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
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
    description: "Admin's role",
    example: RolesEnum.SUPER_ADMIN,
  })
  @IsEnum(RolesEnum)
  role: RolesEnum;
}
