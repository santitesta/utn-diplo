//import { env } from "process";
import { HardhatUserConfig ,vars} from "hardhat/config";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
//import dotenv from "dotenv";

// USE alchemy, pero podria ser infura tambien
//const API_KEY = vars.get("API_KEY"); // M_dnLQawM4Ckl6jg0NbQ0RHRcP1GRGMR
const RPC_URL =vars.get("RPC_AMOY"); //https://polygon-amoy.g.alchemy.com/v2/M_dnLQawM4Ckl6jg0NbQ0RHRcP1GRGMR
const PRIVATE_KEY =vars.get("PRIVATE_KEY"); //algo como 15600cb47e8ffb****************************8a6560376da8d2b07c431c
const ETHERSCAN_API_KEY=vars.get("ETHERSCAN_API_KEY"); //TUJM41246U6A7MXRV2ZTDIASIE7I1HATNY
//dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    amoy: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;