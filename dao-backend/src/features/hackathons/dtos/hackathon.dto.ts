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
    description: `Hackathon's start date, Examples of accepted format: ISO Date '2022-03-25'
    (The International Standard ISO 8601 YYYY-MM-DD or the extended format YYYY-MM-DDTHH:mm:ss.sssZ),
    Short Date	'03/25/2022', Long Date	'Mar 25 2022' or '25 Mar 2022'`,
    example: '07/01/2023',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: "Hackathon's end date",
    example: '10/30/2023',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

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
