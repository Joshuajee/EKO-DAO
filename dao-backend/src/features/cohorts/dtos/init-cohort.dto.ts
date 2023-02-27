import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitCohortDto {
  @ApiProperty({
    description: 'Accepted stable coin contract address for fees',
    example: '0x531DD64587AC3A75a001325B3658Ec7D0567BEB6',
  })
  @IsString()
  @IsNotEmpty()
  stableCoin: string;

  @ApiProperty({
    description: 'Certificate of completion contract address',
    example: '0x66485BE733c3c9965418592ef286D99C994f8eE9',
  })
  @IsString()
  @IsNotEmpty()
  ekoNft: string;
}
