import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ImprovementProposalDto {
  @ApiProperty({
    description: "ImprovementProposal's Name",
    example: 'Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "ImprovementProposal's description",
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "ImprovementProposal's delay",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  delay: number;

  @ApiProperty({
    description: "ImprovementProposal's voting duration",
    example: 604800, // 1 week in seconds
  })
  @IsNumber()
  votingDuration: number;
}
