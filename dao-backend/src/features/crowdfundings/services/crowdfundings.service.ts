import { BadRequestException, Injectable } from '@nestjs/common';
import { CROWDFUNDING_FACET_ABI } from 'src/commons/constants/abis';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { CrowdfundingDto } from '../dtos/crowdfunding.dto';

@Injectable()
export class CrowdfundingsService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async create(crowdfundingDto: CrowdfundingDto) {
    try {
      const CrowdfundingFacet = this.getCrowdfundingFacet();
      const target = this.web3Helper.toWei(crowdfundingDto.target.toString());
      const minDonation = this.web3Helper.toWei(
        crowdfundingDto.minDonation.toString(),
      );
      const encodedData: string = CrowdfundingFacet.methods
        .createCampaign(
          crowdfundingDto.topic,
          crowdfundingDto.description,
          target,
          minDonation,
          crowdfundingDto.stableCoin,
          crowdfundingDto.period,
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

  getCrowdfundingFacet() {
    return this.web3Helper.getContractInstance(
      CROWDFUNDING_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
