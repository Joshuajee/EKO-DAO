import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  COHORT_FACET_ABI,
  COHORT_FACTORY_FACET_ABI,
} from 'src/commons/constants/abis';
import {
  COHORT_ALREADY_INITIALIZED,
  COHORT_NOT_FOUND,
} from 'src/commons/constants/messages';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { DataSource, Repository } from 'typeorm';
import { CohortDto } from '../dtos/cohort.dto';
import { InitCohortDto } from '../dtos/init-cohort.dto';
import { UpdateCohortStatusDto } from '../dtos/update-cohort-status.dto';
import { Cohort } from '../entities/cohorts.entity';

@Injectable()
export class CohortsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Cohort)
    private readonly cohortsRepository: Repository<Cohort>,
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async create(cohortDto: CohortDto): Promise<{ [key: string]: any }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const cohort: Cohort = await this.cohortsRepository.create({
        description: cohortDto.exhaustiveDescription,
      });
      const row = await queryRunner.manager.save(cohort);
      const CohortFactoryFacet = this.getCohortFactoryFacet();
      const id: number = row.id;
      const startDate: number = Math.floor(
        cohortDto.startDate.getTime() / 1000,
      );
      const endDate: number = Math.floor(cohortDto.endDate.getTime() / 1000);
      const commitment: string = this.web3Helper.toWei(
        cohortDto.commitment.toString(),
      );
      const encodedData: string = CohortFactoryFacet.methods
        .newCohort(
          id,
          cohortDto.name,
          startDate,
          endDate,
          cohortDto.size,
          commitment,
          cohortDto.briefDescription,
        )
        .encodeABI();
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
      const CohortFacet = this.getCohortFacet();
      const result = await CohortFacet.methods.cohort(id).call();
      await queryRunner.commitTransaction();
      return { id: id, cohort: result.contractAddress };
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  async getById(id: number): Promise<Cohort> {
    try {
      const cohort: Cohort = await this.cohortsRepository.findOneOrFail({
        where: { id },
      });
      return cohort;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(COHORT_NOT_FOUND);
    }
  }

  async init(address: string, initCohortDto: InitCohortDto): Promise<void> {
    const CohortFacet = this.getCohortFacet();
    const encodedData: string = CohortFacet.methods
      .initCohort(address, initCohortDto.stableCoin, initCohortDto.ekoNft)
      .encodeABI();
    try {
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
    } catch (error) {
      console.error(error);
      throw new ConflictException(COHORT_ALREADY_INITIALIZED);
    }
  }

  async updateStatus(
    address: string,
    updateCohortStatusDto: UpdateCohortStatusDto,
  ): Promise<void> {
    const CohortFacet = this.getCohortFacet();
    const encodedData: string = CohortFacet.methods
      .updateStatus(address, updateCohortStatusDto.status)
      .encodeABI();
    try {
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
    } catch (error) {
      console.error(error);
      throw new ConflictException();
    }
  }

  getCohortFactoryFacet() {
    return this.web3Helper.getContractInstance(
      COHORT_FACTORY_FACET_ABI,
      this.configService.diamondAddress,
    );
  }

  getCohortFacet() {
    return this.web3Helper.getContractInstance(
      COHORT_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
