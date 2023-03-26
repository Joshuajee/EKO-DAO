import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HackathonWinnersDto {
  @ApiProperty({
    description: "Hackathon's winner address",
    example: '0x47aa8B66Ba7e409Bce748d3AC9aE694FFe28dA7C',
  })
  @IsString()
  @IsNotEmpty()
  winner: string;

  @ApiProperty({
    description: "Hackathon's first runner up address",
    example: '0xeD0411c67342746840356a181D10dCA8eE3cB209',
  })
  @IsString()
  @IsNotEmpty()
  firstRunnerUp: string;

  @ApiProperty({
    description: "Hackathon's second runner up address",
    example: '0x4b749365b4A95517701bd30EB7Cd4a754C3618c8',
  })
  @IsString()
  @IsNotEmpty()
  secondRunnerUp: string;
}
