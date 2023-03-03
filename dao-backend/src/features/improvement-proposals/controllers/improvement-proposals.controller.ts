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
import { ImprovementProposalDto } from '../dtos/improvement-proposal.dto';
import { ImprovementProposalsService } from '../services/improvement-proposals.service';

@ApiTags('Improvement Proposals')
@Controller('improvement-proposals')
export class ImprovementProposalsController {
  constructor(
    private readonly improvementProposalsService: ImprovementProposalsService,
  ) {}

  @ApiOperation({
    summary: 'Create Ekolance improvement proposal',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Improvement proposal successfully created',
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
  create(
    @Body() improvementProposalDto: ImprovementProposalDto,
  ): Promise<void> {
    return this.improvementProposalsService.create(improvementProposalDto);
  }

  @ApiOperation({
    summary: 'Start voting on an Ekolance improvement proposal',
  })
  @ApiParam({
    description: 'Ekolance improvement proposal id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vote on improvement proposal successfully started',
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
  @Post('/start-vote/:id')
  start(@Param('id') id: number): Promise<void> {
    return this.improvementProposalsService.start(id);
  }

  @ApiOperation({
    summary: 'End voting Ekolance improvement proposal',
  })
  @ApiParam({
    description: 'Ekolance improvement proposal id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Voting on improvement proposal successfully ended',
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
  @Post('/end-vote/:id')
  end(@Param('id') id: number): Promise<void> {
    return this.improvementProposalsService.end(id);
  }
}
