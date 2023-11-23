import config from "../hardhat.config";
import { ethers } from "hardhat";
import { Gas } from "../typechain-types";

const TEST_VALUE = 10;

async function compareDeploy() {
  const userSettings = config?.solidity as any;
  if (userSettings.settings?.optimizer.enabled) {
    console.log(
      `Using ${userSettings.settings?.optimizer.runs} runs optimization`
    );
  }
  const gasContractFactory = await ethers.getContractFactory("Gas");
  let contract: Gas = await gasContractFactory.deploy();
  contract = await contract.waitForDeployment();
  const deployTxReceipt = await contract.deploymentTransaction()?.wait();
  console.log(`Used ${deployTxReceipt?.gasUsed} gas units in deployment`);
  const testTx = await contract.loopActions(TEST_VALUE);
  const testTxReceipt = await testTx.wait();
  console.log(`Used ${testTxReceipt?.gasUsed} gas units in test function`);
}

compareDeploy().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
