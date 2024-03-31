import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config } from "dotenv";

const setup = config();

const ALCHEMY_URL = process.env.ALCHEMY_MUMBAI_URL
const ALCHEMY_API_KEY = process.env.ALCHEMY_MUMBAI_API_KEY
const PRIV_KEY = process.env.PRIV_KEY ?? "" 
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const REPORT_GAS = process.env.REPORT_GAS;

const conf: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: `${ALCHEMY_URL}/${ALCHEMY_API_KEY}`,
      accounts: [PRIV_KEY]
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    currency: 'EUR',
    coinmarketcap: COINMARKETCAP_API_KEY,
    L1: "polygon",
    currencyDisplayPrecision: 18
  }
};

export default conf;
