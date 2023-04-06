import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitHackathonDto {
  @ApiProperty({
    description: 'Accepted stable coin contract address',
    example: '0x531DD64587AC3A75a001325B3658Ec7D0567BEB6',
  })
  @IsString()
  @IsNotEmpty()
  stableCoin: string;

  @ApiProperty({
    description: 'Score token contract address',
    example: '0x90a6f7D5a29DB8a786aAfAc0e4b680e42e373F8c',
  })
  @IsString()
  @IsNotEmpty()
  scoreToken: string;
}
