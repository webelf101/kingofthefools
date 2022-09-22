import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.WEB3_INFURA_PROJECT_ID!,
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;
