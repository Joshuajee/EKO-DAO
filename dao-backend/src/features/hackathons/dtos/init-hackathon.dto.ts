import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitHackathonDto {
  @ApiProperty({
    description: 'Accepted stable coin contract address for fees',
    example: '0x531DD64587AC3A75a001325B3658Ec7D0567BEB6',
  })
  @IsString()
  @IsNotEmpty()
  stableCoin: string;

  @ApiProperty({
    description: 'Accepted score token contract address',
    example: '0x531DD64587AC3A75a001325B3658Ec7D0567BEB6',
  })
  @IsString()
  @IsNotEmpty()
  scoreToken: string;
}
