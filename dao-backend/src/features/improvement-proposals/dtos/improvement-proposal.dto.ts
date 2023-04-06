import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ImprovementProposalDto {
  @ApiProperty({
    description: "Improvement proposal's Name",
    example: 'Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Improvement proposal's description",
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Improvement proposal's delay",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  delay: number;

  @ApiProperty({
    description: "Improvement proposal's voting duration",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  votingDuration: number;

  @ApiProperty({
    description:
      'Minimum voting tokens required to vote on improvement proposal',
    example: 20,
  })
  @IsNumber()
  minVotingTokenRequired: number;
}
