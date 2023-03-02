import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CrowdfundingDto } from '../dtos/crowdfunding.dto';
import { CrowdfundingsService } from '../services/crowdfundings.service';

@ApiTags('Crowdfundings')
@Controller('crowdfundings')
export class CrowdfundingsController {
  constructor(private readonly crowdfundingsService: CrowdfundingsService) {}

  @ApiOperation({
    summary: 'Create Ekolance crowdfunding',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crowdfunding successfully created',
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
  create(@Body() crowdfundingDto: CrowdfundingDto): { [key: string]: any } {
    return this.crowdfundingsService.create(crowdfundingDto);
  }
}
