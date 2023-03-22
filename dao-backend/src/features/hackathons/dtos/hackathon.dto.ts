import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HackathonDto {
  @ApiProperty({
    description: "Hackathon's Name",
    example: 'DAO hackathon 2023',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Hackathon's description",
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Hackathon's delay",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  delay: number;

  @ApiProperty({
    description: "Hackathon's duration",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: "Hackathon's maximum participants admitted",
    example: 100,
  })
  @IsNumber()
  maxParticipants: number;

  @ApiProperty({
    description: "Hackathon's winner percentage",
    example: 50,
  })
  @IsNumber()
  winnerPercentage: number;

  @ApiProperty({
    description: "Hackathon's first runner up percentage",
    example: 30,
  })
  @IsNumber()
  firstRunnerUpPercentage: number;

  @ApiProperty({
    description: "Hackathon's second runner up percentage",
    example: 20,
  })
  @IsNumber()
  secondRunnerUpPercentage: number;

  @ApiProperty({
    description: 'Minimum score tokens required to participate in a hackathon',
    example: 10,
  })
  @IsNumber()
  minScoreTokenRequired: number;
}
