import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_FACET_ABI } from 'src/commons/constants/abis';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { Repository } from 'typeorm';
import { AdminDto } from '../dtos/admin.dto';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async createWallet(): Promise<{ [key: string]: any }> {
    return this.web3Helper.createAccount();
  }

  async create(adminDto: AdminDto): Promise<void> {
    try {
      const admin: Admin = await this.adminsRepository.create(adminDto);
      await this.adminsRepository.save(admin);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
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
      console.error(error);
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
      console.error(error);
      throw new NotFoundException(
        `Admin with wallet address ${walletAddress} not found`,
      );
    }
  }

  async update(id: number, adminDto: AdminDto): Promise<void> {
    const admin: Admin = await this.getById(id);
    await this.adminsRepository.update(id, adminDto);
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
  }

  async deleteOne(id: number): Promise<void> {
    const admin: Admin = await this.getById(id);
    await this.adminsRepository.delete(id);
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
  }

  getAdminFacet() {
    return this.web3Helper.getContractInstance(
      ADMIN_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
