import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CohortDto } from '../dtos/cohort.dto';
import { InitCohortDto } from '../dtos/init-cohort.dto';
import { UpdateCohortStatusDto } from '../dtos/update-cohort-status.dto';
import { Cohort } from '../entities/cohorts.entity';
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
    summary: 'Get an Ekolance cohort',
  })
  @ApiParam({
    description: 'Ekolance cohort id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cohort info successfully returned',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cohort not found',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: number): Promise<Cohort> {
    return this.cohortsService.getById(id);
  }

  @ApiOperation({
    summary: 'Init Ekolance cohort',
  })
  @ApiParam({
    description: 'Ekolance cohort contract address',
    name: 'address',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
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
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict, when cohort has already been initialized',
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

  @ApiOperation({
    summary: 'Update Ekolance cohort status',
  })
  @ApiParam({
    description: 'Ekolance cohort contract address',
    name: 'address',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cohort status successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, when request parameters are missing or invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Conflict, when cohort is not in the expected state (backword transition, cohort has not started or ended yet)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-status/:address')
  updateStatus(
    @Param('address') address: string,
    @Body() updateCohortStatusDto: UpdateCohortStatusDto,
  ): Promise<void> {
    return this.cohortsService.updateStatus(address, updateCohortStatusDto);
  }
}
