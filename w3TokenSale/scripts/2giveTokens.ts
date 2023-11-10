import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Receive parameters from command line
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 3)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0];
  const giveTo = parameters[1];
  const amount = parameters[2];

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
  const tokenFactory = new MyToken__factory(wallet);
  const tokenContract = tokenFactory.attach(contractAddress) as MyToken;

  const mintTx = await tokenContract.mint(giveTo, ethers.parseUnits(amount));
  await mintTx.wait();
  console.log(`Minted ${amount} tokens to ${giveTo}`);

  const [name, symbol, decimals, totalSupply] = await Promise.all([
    tokenContract.name(),
    tokenContract.symbol(),
    tokenContract.decimals(),
    tokenContract.totalSupply(),
  ]);
  console.log({ name, symbol, decimals, totalSupply });

  const balanceGiveTo = await tokenContract.balanceOf(giveTo);
  console.log(
    `Balance of ${giveTo} is now ${ethers.formatUnits(
      balanceGiveTo
    )} ${symbol} units`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
