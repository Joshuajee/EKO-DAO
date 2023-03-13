import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  COHORT_ABI,
  COHORT_FACET_ABI,
  COHORT_FACTORY_FACET_ABI,
} from 'src/commons/constants/abis';
import { COHORT_ALREADY_INITIALIZED } from 'src/commons/constants/messages';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { Repository } from 'typeorm';
import { CohortDto } from '../dtos/cohort.dto';
import { InitCohortDto } from '../dtos/init-cohort.dto';
import { UpdateStatusDto } from '../dtos/update-status.dto';
import { Cohort } from '../entities/cohorts.entity';

@Injectable()
export class CohortsService {
  constructor(
    @InjectRepository(Cohort)
    private readonly cohortsRepository: Repository<Cohort>,
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async create(cohortDto: CohortDto): Promise<{ [key: string]: any }> {
    let row;
    try {
      const cohort: Cohort = await this.cohortsRepository.create({
        description: cohortDto.exhaustiveDescription,
      });
      row = await this.cohortsRepository.save(cohort);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
    const id = row.id;
    const startDate = Math.floor(cohortDto.startDate.getTime() / 1000);
    const endDate = Math.floor(cohortDto.endDate.getTime() / 1000);
    const CohortFactoryFacet = this.getCohortFactoryFacet();
    const encodedData: string = CohortFactoryFacet.methods
      .newCohort(
        id,
        cohortDto.name,
        startDate,
        endDate,
        cohortDto.size,
        cohortDto.commitment,
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
    return { id: id, cohort: result.contractAddress };
  }

  async getById(id: number): Promise<Cohort> {
    try {
      const cohort: Cohort = await this.cohortsRepository.findOneOrFail({
        where: { id },
      });
      return cohort;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Cohort ${id} not found`);
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
    updateStatusDto: UpdateStatusDto,
  ): Promise<void> {
    const Cohort = this.getCohort(address);
    const encodedData: string = Cohort.methods
      .updateStatus(updateStatusDto.status)
      .encodeABI();
    try {
      await this.web3Helper.callContract(
        encodedData,
        address,
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

  getCohort(address: string) {
    return this.web3Helper.getContractInstance(COHORT_ABI, address);
  }
}
