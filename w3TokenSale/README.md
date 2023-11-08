# Week 3

## Challenge

- Smart Contract Features
  - Buy ERC20 tokens with ETH for a fixed ratio
    - Ratio _r_ means that 1 ETH should buy _r_ tokens
  - Withdraw ETH by burning the ERC20 tokens at the contract
  - Mint a new ERC721 for a configured price
    - Price _p_ means that 1 NFT should cost _p_ tokens
  - Allow users to burn their NFTs to recover half of the purchase price
  - Update owner withdrawable amount whenever a NFT is sold
  - Allow owner to withdraw tokens from the contract
    - Only half of sales value is available for withdraw
- Architecture overview
- Contract external calls
