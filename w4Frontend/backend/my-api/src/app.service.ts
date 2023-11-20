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
    throw await this.provider.getTransactionReceipt(hash);
  }

  getServerWalletAddress() {
    return this.wallet.address;
  }

  async checkMinterRole(address: string) {
    const MINTER_ROLE =
      '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';
    return await this.contract.hasRole(MINTER_ROLE, address);
  }

  async mintTokens(address: any, sig: string) {
    return sig === '123';
  }
}
