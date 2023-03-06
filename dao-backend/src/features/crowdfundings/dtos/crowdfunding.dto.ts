import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CrowdfundingDto {
  @ApiProperty({
    description: "Crowdfunding's topic",
    example: 'Topic',
  })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({
    description: "Crowdfunding's description",
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Crowdfunding's target",
    example: 100,
  })
  @IsNumber()
  target: number;

  @ApiProperty({
    description: "Crowdfunding's min donation",
    example: 100,
  })
  @IsNumber()
  minDonation: number;

  @ApiProperty({
    description: 'Accepted stable coin contract address for fees',
    example: '0x531DD64587AC3A75a001325B3658Ec7D0567BEB6',
  })
  @IsString()
  @IsNotEmpty()
  stableCoin: string;

  @ApiProperty({
    description: "Crowdfunding's period",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  period: number;
}
