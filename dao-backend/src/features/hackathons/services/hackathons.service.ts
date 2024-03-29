import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HACKATHON_FACET_ABI } from 'src/commons/constants/abis';
import { HACKATHON_ALREADY_INITIALIZED } from 'src/commons/constants/messages';
import { Web3Helper } from 'src/commons/helpers/web3-helper';
import { ConfigurationService } from 'src/config/configuration.service';
import { HackathonWinnersDto } from '../dtos/hackathon-winners.dto';
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
      const minScoreTokenRequired: string = this.web3Helper.toWei(
        hackathonDto.minScoreTokenRequired.toString(),
      );
      const encodedData: string = HackathonFacet.methods
        .newHackathon(
          hackathonDto.name,
          hackathonDto.description,
          hackathonDto.delay,
          hackathonDto.duration,
          hackathonDto.maxParticipants,
          hackathonDto.winnerPercentage,
          hackathonDto.firstRunnerUpPercentage,
          hackathonDto.secondRunnerUpPercentage,
          minScoreTokenRequired,
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

  async init(id: number, initHackathonDto: InitHackathonDto): Promise<void> {
    const HackathonFacet = this.getHackathonFacet();
    const encodedData: string = HackathonFacet.methods
      .initializeHackathon(
        id,
        initHackathonDto.stableCoin,
        initHackathonDto.scoreToken,
      )
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

  async addWinners(id: number, hackathonWinnersDto: HackathonWinnersDto) {
    try {
      const HackathonFacet = this.getHackathonFacet();
      const encodedData: string = HackathonFacet.methods
        .setPrizeWinners(
          id,
          hackathonWinnersDto.winner,
          hackathonWinnersDto.firstRunnerUp,
          hackathonWinnersDto.secondRunnerUp,
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

  getHackathonFacet() {
    return this.web3Helper.getContractInstance(
      HACKATHON_FACET_ABI,
      this.configService.diamondAddress,
    );
  }
}
