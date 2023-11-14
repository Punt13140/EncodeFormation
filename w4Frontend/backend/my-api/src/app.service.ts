import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const provider = ethers.getDefaultProvider('sepolia');
    const lastBlock = await provider.getBlockNumber();
    return `Last block: ${lastBlock}`;
  }
}
