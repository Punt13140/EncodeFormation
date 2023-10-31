# Project

## Setup

```sh
mkdir project
cd project/
npm init # yes to all
npm install --save-dev hardhat
npx hardhat init # Typescript / yes to all
npm install --save-dev mocha
touch .mocharc.json
```

Edit `.mocharc.json`
```json
{
  "require": "hardhat/register",
  "timeout": 40000,
  "_": ["test*/**/*.ts"]
}
```

Edit `tsconfig.json`
```json
{
  "include": ["./scripts", "./test", "./typechain-types"],
  "files": ["./hardhat.config.ts"],
  "compilerOptions": {
  //...
```

```sh
touch .env
```

Edit `.env`
```.env
MNEMONIC="here is where your twelve words mnemonic should be put my friend"
PRIVATE_KEY="<your private key here if you don't have a mnemonic seed>"
INFURA_API_KEY="********************************"
INFURA_API_SECRET="********************************"
ALCHEMY_API_KEY="********************************"
ETHERSCAN_API_KEY="********************************"
```

```sh
npx hardhat compile
npx hardhat test
```

Edit `hardhat.config.ts`

```ts
import { HardhatUserConfig, task } from "hardhat/config";

    ...

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
     console.log(account.address);
  }
});
```

Test it out

```sh
npx hardhat accounts 
```