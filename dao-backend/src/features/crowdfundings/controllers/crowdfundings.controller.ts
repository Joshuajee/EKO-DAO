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
import { CrowdfundingDto } from '../dtos/crowdfunding.dto';
import { CrowdfundingsService } from '../services/crowdfundings.service';

@ApiTags('Crowdfundings')
@Controller('crowdfundings')
export class CrowdfundingsController {
  constructor(private readonly crowdfundingsService: CrowdfundingsService) {}

  @ApiOperation({
    summary: 'Create Ekolance crowdfunding project',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crowdfunding project successfully created',
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
  create(@Body() crowdfundingDto: CrowdfundingDto): Promise<void> {
    return this.crowdfundingsService.create(crowdfundingDto);
  }

  @ApiOperation({
    summary: 'Withdraw crowdfunding project funds',
  })
  @ApiParam({
    description: 'Ekolance crowdfunding project address',
    name: 'address',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Funds successfully withdrawn',
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
  @Post('/withdraw/:address')
  withdraw(@Param('address') address: string): Promise<void> {
    return this.crowdfundingsService.withdraw(address);
  }
}
