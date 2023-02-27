import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CohortDto {
  @ApiProperty({
    description: "Cohort's Name",
    example: 'Solidity Developer Summer 2023',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: `Cohort's start date, Examples of accepted format: ISO Date '2022-03-25'
    (The International Standard ISO 8601 YYYY-MM-DD or the extended format YYYY-MM-DDTHH:mm:ss.sssZ),
    Short Date	'03/25/2022', Long Date	'Mar 25 2022' or '25 Mar 2022'`,
    example: '07/01/2023',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: "Cohort's end date",
    example: '10/30/2023',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: "Cohort's class size",
    example: 100,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    description: "Cohort's commitment fees",
    example: 10,
  })
  @IsNumber()
  commitment: number;

  @ApiProperty({
    description: "Cohort's brief description",
    example: 'Brief description',
  })
  @IsString()
  @IsNotEmpty()
  briefDescription: string;

  @ApiProperty({
    description: "Cohort's more detailed description",
    example:
      'Why this training is important?, Training structure, Meet the team, Why should you apply for this training?',
  })
  @IsString()
  @IsNotEmpty()
  exhaustiveDescription: string;
}
