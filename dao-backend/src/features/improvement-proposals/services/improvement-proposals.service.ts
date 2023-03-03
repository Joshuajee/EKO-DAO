import { BadRequestException, Injectable } from '@nestjs/common';
import { GOVERNANCE_FACET_ABI } from 'src/commons/constants/abis';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { ImprovementProposalDto } from '../dtos/improvement-proposal.dto';

@Injectable()
export class ImprovementProposalsService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async create(improvementProposalDto: ImprovementProposalDto): Promise<void> {
    try {
      const ImprovementProposalFacet = this.getImprovementProposalFacet();
      const encodedData: string = ImprovementProposalFacet.methods
        .newProposal(
          improvementProposalDto.name,
          improvementProposalDto.description,
          improvementProposalDto.delay,
          improvementProposalDto.votingDuration,
        )
        .encodeABI();
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async start(id: number): Promise<void> {
    try {
      const ImprovementProposalFacet = this.getImprovementProposalFacet();
      const encodedData: string = ImprovementProposalFacet.methods
        .startVoting(id)
        .encodeABI();
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async end(id: number): Promise<void> {
    try {
      const ImprovementProposalFacet = this.getImprovementProposalFacet();
      const encodedData: string = ImprovementProposalFacet.methods
        .endVoting(id)
        .encodeABI();
      await this.web3Helper.callContract(
        encodedData,
        this.configService.diamondAddress,
        this.configService.superAdminAddress,
        this.configService.superAdminPrivateKey,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  getImprovementProposalFacet() {
    return this.web3Helper.getContractInstance(
      GOVERNANCE_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
