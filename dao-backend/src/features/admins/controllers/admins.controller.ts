import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { AdminDto } from '../dtos/admin.dto';
import { LoginDto } from '../dtos/login.dto';
import { Admin } from '../entities/admin.entity';
import { AdminsService } from '../services/admins.service';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Create Ekolance super admin wallet',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Super admin wallet successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, when request parameters are missing or invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiExcludeEndpoint()
  @Post('/wallet')
  createWallet(): { [key: string]: any } {
    return this.adminsService.createWallet();
  }

  @ApiOperation({
    summary: 'Create Ekolance admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin successfully created',
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
  create(@Body() adminDto: AdminDto): Promise<void> {
    return this.adminsService.create(adminDto);
  }

  @ApiOperation({
    summary: 'Get Ekolance admins',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of admins successfully returned',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(): Promise<Admin[]> {
    return this.adminsService.getAll();
  }

  @ApiOperation({
    summary: 'Get an Ekolance admin',
  })
  @ApiParam({
    description: 'Ekolance admin id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin info successfully returned',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: number): Promise<Admin> {
    return this.adminsService.getById(id);
  }

  @ApiOperation({
    summary: 'Update an Ekolance admin',
  })
  @ApiParam({
    description: 'Ekolance admin id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin info successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() adminDto: AdminDto): Promise<void> {
    return this.adminsService.update(id, adminDto);
  }

  @ApiOperation({
    summary: 'Delete an Ekolance admin',
  })
  @ApiParam({
    description: 'Ekolance admin id',
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Not authorized, when access token is mising or invalid',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin not found',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.adminsService.deleteOne(id);
  }

  @ApiOperation({
    summary: 'Login Ekolance admin',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Access_token successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, when request parameters are missing or invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @Post('/login')
  login(@Body() loginDto: LoginDto): { [key: string]: any } {
    return this.authService.login(loginDto);
  }
}
