import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Receive parameters from command line
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0];
  const giveTo = parameters[1];

  // Configuring the provider
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );

  // Configuring the wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  console.log(`Using address ${wallet.address}`);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // Attaching to the contract
  const ballotFactory = new MyToken__factory(wallet);
  const ballotContract = ballotFactory.attach(contractAddress) as MyToken;

  // TODO
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
