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
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { HackathonWinnersDto } from '../dtos/hackathon-winners.dto';
import { HackathonDto } from '../dtos/hackathon.dto';
import { InitHackathonDto } from '../dtos/init-hackathon.dto';
import { HackathonsService } from '../services/hackathons.service';

@ApiTags('Hackathons')
@Controller('hackathons')
export class HackathonsController {
  constructor(private readonly hackathonsService: HackathonsService) {}

  @ApiOperation({
    summary: 'Create Ekolance hackathon',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Hackathon successfully created',
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
  create(@Body() hackathonDto: HackathonDto): { [key: string]: any } {
    return this.hackathonsService.create(hackathonDto);
  }

  @ApiOperation({
    summary: 'Init Ekolance hackathon',
  })
  @ApiParam({
    description: 'Ekolance hackathon id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Hackathon successfully initialized',
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
    description: 'Conflict, when hackathon has already been initialized',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/init/:id')
  init(
    @Param('id') id: number,
    @Body() initHackathonDto: InitHackathonDto,
  ): Promise<void> {
    return this.hackathonsService.init(id, initHackathonDto);
  }

  @ApiOperation({
    summary: 'Start Ekolance hackathon',
  })
  @ApiParam({
    description: 'Ekolance hackathon id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Hackathon successfully started',
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
  @Post('/start/:id')
  start(@Param('id') id: number): Promise<void> {
    return this.hackathonsService.start(id);
  }

  @ApiOperation({
    summary: 'End Ekolance hackathon',
  })
  @ApiParam({
    description: 'Ekolance hackathon id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Hackathon successfully ended',
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
  @Post('/end/:id')
  end(@Param('id') id: number): Promise<void> {
    return this.hackathonsService.end(id);
  }

  @ApiOperation({
    summary: 'Add Ekolance hackathon winners',
  })
  @ApiParam({
    description: 'Ekolance hackathon id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Winners successfully added',
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
  @Post('/winners/:id')
  updateStatus(
    @Param('id') id: number,
    @Body() hackathonWinnersDto: HackathonWinnersDto,
  ): Promise<void> {
    return this.hackathonsService.addWinners(id, hackathonWinnersDto);
  }
}
