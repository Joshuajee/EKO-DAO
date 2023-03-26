import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';

export class UpdateCohortStatusDto {
  @ApiProperty({
    description: "Cohort's status",
    example: StatusEnum.ENDED,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
