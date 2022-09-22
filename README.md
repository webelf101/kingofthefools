# King of the fools

You can deposit ether into a smart contract, as long as it's at least 1.5x more money than the previous person. If you do that, you become "King of the fools", and your money gets sent back to the previous person.

## Smart contract

Try running some of the following tasks:

(You don't need to deploy the contract for UI.)

```shell
npx hardhat test
npx hardhat run scripts/deploy.ts --network goerli
```

## UI

```shell
cd www
npm install
npm start
```