require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */

const INFURA_API_KEY = vars.get("TEST_INFURA_API_KEY");

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "ganache",
  networks: {
    ganache:{
      url: 'HTTP://127.0.0.1:7545',
      // si no pongo ninguna cuenta toma todas las que tiene ganache
      //accounts: [`0x445e5096691a960f888428aaac6feb34dedfd8b41f050cc19d54676bb2ff2cca`], //Clave privada de las wallets
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [vars.get("TEST_ACCOUNT_PRIVATE_KEY")],
    },
  },
};
