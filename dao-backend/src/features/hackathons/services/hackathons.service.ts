import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HACKATHON_FACET_ABI } from 'src/commons/constants/abis';
import { HACKATHON_ALREADY_INITIALIZED } from 'src/commons/constants/messages';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { HackathonDto } from '../dtos/hackathon.dto';
import { InitHackathonDto } from '../dtos/init-hackathon.dto';

@Injectable()
export class HackathonsService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly web3Helper: Web3Helper,
  ) {}

  async create(hackathonDto: HackathonDto): Promise<void> {
    try {
      const HackathonFacet = this.getHackathonFacet();
      // const target = this.web3Helper.toWei(crowdfundingDto.target.toString());
      const encodedData: string = HackathonFacet.methods
        .newHackathon()
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

  async init(id: number, initHackathonDto: InitHackathonDto): Promise<void> {
    const HackathonFacet = this.getHackathonFacet();
    const encodedData: string = HackathonFacet.methods
      .initializeHackathon()
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
      throw new ConflictException(HACKATHON_ALREADY_INITIALIZED);
    }
  }

  async start(id: number): Promise<void> {
    try {
      const HackathonFacet = this.getHackathonFacet();
      const encodedData: string = HackathonFacet.methods
        .startHackathon(id)
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
      const HackathonFacet = this.getHackathonFacet();
      const encodedData: string = HackathonFacet.methods
        .endHackathon(id)
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

  getHackathonFacet() {
    return this.web3Helper.getContractInstance(
      HACKATHON_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
