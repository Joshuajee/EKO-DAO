import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { CohortDto } from '../dtos/cohort.dto';
import { InitCohortDto } from '../dtos/init-cohort.dto';
import { CohortsService } from '../services/cohorts.service';

@ApiTags('Cohorts')
@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @ApiOperation({
    summary: 'Create Ekolance cohort',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cohort successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, when request parameters are missing or invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() cohortDto: CohortDto): { [key: string]: any } {
    return this.cohortsService.create(cohortDto);
  }

  @ApiOperation({
    summary: 'Init Ekolance cohort',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cohort successfully initialized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, when request parameters are missing or invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/init/:address')
  init(
    @Param('address') address: string,
    @Body() initCohortDto: InitCohortDto,
  ): Promise<void> {
    return this.cohortsService.init(address, initCohortDto);
  }
}
