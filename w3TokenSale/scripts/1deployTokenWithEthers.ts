import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";
dotenv.config();

async function main() {
  // Configuring the provider
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const lastBlock = await provider.getBlock("latest");
  console.log(`Last block number: ${lastBlock?.number}`);
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);
  console.log(
    `Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`
  );

  // Configuring the wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  console.log(`Using address ${wallet.address}`);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance} ETH`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // TODO Deploy the token contract
  const ballotFactory = new MyToken__factory(wallet);
  const ballotContract = await ballotFactory.deploy();
  await ballotContract.waitForDeployment();
  console.log(`Contract deployed to ${ballotContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
