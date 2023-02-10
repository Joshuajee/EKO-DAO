import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminDto } from '../dtos/admin.dto';
import { Admin } from '../entities/admin.entity';
import { AdminsService } from '../services/admins.service';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

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
  @Put(':id')
  async update(@Param('id') id: number, @Body() adminDto: AdminDto) {
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
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.adminsService.deleteOne(id);
  }
}
