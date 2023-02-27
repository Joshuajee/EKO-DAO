import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COHORT_FACTORY_FACET_ABI } from 'src/commons/constants/abis';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { Repository } from 'typeorm';
import { CohortDto } from '../dtos/cohort.dto';
import { InitCohortDto } from '../dtos/init-cohort.dto';
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
    try {
      const cohort: Cohort = await this.cohortsRepository.create({
        description: cohortDto.exhaustiveDescription,
      });
      const row = await this.cohortsRepository.save(cohort);
      const id = row.id;
      const startDate = Math.floor(cohortDto.startDate.getTime());
      const endDate = Math.floor(cohortDto.endDate.getTime());
      const CohortFcatoryFacet = this.getCohortFcatoryFacet();
      const encodedData: string = CohortFcatoryFacet.methods
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
      const result = await CohortFcatoryFacet.methods.cohort(id).call();
      return { cohort: result.contractAddress };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async init(address: string, initCohortDto: InitCohortDto): Promise<void> {
    const CohortFcatoryFacet = this.getCohortFcatoryFacet();
    const encodedData: string = CohortFcatoryFacet.methods
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
      throw new ConflictException();
    }
  }

  getCohortFcatoryFacet() {
    return this.web3Helper.getContractInstance(
      COHORT_FACTORY_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
