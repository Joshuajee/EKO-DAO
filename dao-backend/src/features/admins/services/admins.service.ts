import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDto } from '../dtos/admin.dto';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  async create(adminDto: AdminDto): Promise<void> {
    try {
      const admin: Admin = await this.adminsRepository.create(adminDto);
      await this.adminsRepository.save(admin);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  async getById(id: number): Promise<Admin> {
    try {
      const admin: Admin = await this.adminsRepository.findOneOrFail({
        where: { id },
      });
      return admin;
    } catch (error) {
      throw new NotFoundException(`Admin ${id} not found`);
    }
  }

  async getByWalletAddress(walletAddress: string): Promise<Admin> {
    try {
      const admin: Admin = await this.adminsRepository.findOneOrFail({
        where: { walletAddress },
      });
      return admin;
    } catch (error) {
      throw new NotFoundException(
        `Admin with wallet address ${walletAddress} not found`,
      );
    }
  }

  async update(id: number, adminDto: AdminDto): Promise<void> {
    const rows = await this.adminsRepository.update(id, adminDto);
    if (rows.affected === 0) {
      throw new NotFoundException(`Admin ${id} not found`);
    }
  }

  async deleteOne(id: number): Promise<void> {
    const rows = await this.adminsRepository.delete(id);
    if (rows.affected === 0) {
      throw new NotFoundException(`Admin ${id} not found`);
    }
  }
}
