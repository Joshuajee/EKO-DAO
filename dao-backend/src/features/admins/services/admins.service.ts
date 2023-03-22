import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_FACET_ABI } from 'src/commons/constants/abis';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminDto } from '../dtos/admin.dto';
import { LoginDto } from '../dtos/login.dto';
import { Admin } from '../entities/admin.entity';
import {
  ADMIN_NOT_FOUND,
  PASSWORD_INCORRECT,
} from 'src/commons/constants/messages';

@Injectable()
export class AdminsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async createWallet(): Promise<{ [key: string]: any }> {
    return this.web3Helper.createAccount();
  }

  async create(adminDto: AdminDto): Promise<void> {
    const admin: Admin = await this.adminsRepository.create(adminDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const AdminFacet = this.getAdminFacet();
      const encodedData: string = AdminFacet.methods
        .setAdmin(adminDto.walletAddress, adminDto.role)
        .encodeABI();
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
      await queryRunner.manager.save(admin);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  async getAll(): Promise<Admin[]> {
    return this.adminsRepository.find({
      select: [
        'id',
        'email',
        'walletAddress',
        'role',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async getById(id: number): Promise<Admin> {
    try {
      const admin: Admin = await this.adminsRepository.findOneOrFail({
        select: [
          'id',
          'email',
          'walletAddress',
          'role',
          'createdAt',
          'updatedAt',
        ],
        where: { id },
      });
      return admin;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(ADMIN_NOT_FOUND);
    }
  }

  async update(id: number, adminDto: AdminDto): Promise<void> {
    const admin: Admin = await this.getById(id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (admin.role !== adminDto.role) {
        const AdminFacet = this.getAdminFacet();
        const encodedData: string = AdminFacet.methods
          .setAdmin(adminDto.walletAddress, adminDto.role)
          .encodeABI();
        await this.web3Helper.callContract(
          encodedData,
          this.configService.diamondAddress,
          this.configService.superAdminAddress,
          this.configService.superAdminPrivateKey,
        );
      }
      await queryRunner.manager.save(Object.assign(admin, adminDto));
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteOne(id: number): Promise<void> {
    const admin: Admin = await this.getById(id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const AdminFacet = this.getAdminFacet();
      const encodedData: string = AdminFacet.methods
        .removeAdmin(admin.walletAddress)
        .encodeABI();
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
      await queryRunner.manager.delete(Admin, id);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginDto): Promise<Admin> {
    try {
      const admin: Admin = await this.adminsRepository.findOneOrFail({
        where: {
          walletAddress: loginDto.walletAddress,
        },
      });
      const match = await bcrypt.compare(loginDto.password, admin.password);
      if (!match) {
        throw new Error(PASSWORD_INCORRECT);
      }
      return admin;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(ADMIN_NOT_FOUND);
    }
  }

  getAdminFacet() {
    return this.web3Helper.getContractInstance(
      ADMIN_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
