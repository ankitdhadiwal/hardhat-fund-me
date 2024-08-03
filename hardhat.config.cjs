require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");   
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();



const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "999c02f55-a6c0-4218-a315-f40566a471af"
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/mfGoUK2U8Apy_GYGTL8IFf3R-PsZ9zBq"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "PVQ7P116S9NVV8T7W25J9HCWH8UHWBEGWD"



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          chainId: 1337,
          gasPrice: 210000000000,
      },
      sepolia: {
          url: SEPOLIA_RPC_URL,
          accounts: [process.env.PRIVATE_KEY],
          chainId: 11155111,
          blockConfirmations: 6,
      },
  },
  solidity: {
      compilers: [
          {
              version: "0.8.24",
          },
          {
              version: "0.6.6",
          },
      ],
  },
  etherscan: {
      apiKey: ETHERSCAN_API_KEY,
      // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
  gasReporter: {
      enabled: true,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
      // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
      deployer: {
          default: 0, // here this will by default take the first account as deployer
          //1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
  },
  mocha: {
      timeout: 500000,
  },
};