import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.wallet,
    );
  }

  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): string {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  async getTokenName(): Promise<string> {
    return await this.contract.name();
  }

  async getTotalSupply() {
    return ethers.formatUnits(await this.contract.totalSupply());
  }

  async getTokenBalance(address: string) {
    return ethers.formatUnits(await this.contract.balanceOf(address));
  }

  async getTransactionReceipt(hash: string) {
    throw new Error('Method not implemented.');
  }

  getServerWalletAddress() {
    throw new Error('Method not implemented.');
  }
  async checkMinterRole(address: string) {
    throw new Error('Method not implemented.');
  }
  async mintTokens(address: any) {
    throw new Error('Method not implemented.');
  }
}
