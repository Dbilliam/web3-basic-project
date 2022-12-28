const { task } = require("hardhat/config");
// const dotenv = require("dotenv");
// dotenv.config({path: __dirname + '/.env'});
// const { GOERLI_URL_API, WALLET_PRIVATE_KEY } = process.env
require('dotenv').config()


require("@nomicfoundation/hardhat-toolbox");
task("accounts","Prints the list of account", async (taskArgs, hre) =>{
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts){
    const address = await account.getAddress();
    const balance = await account.getBalance();
    // wei to convert ether balance
    console.log(address+ ":" +hre.ethers.utils.formatEther(balance));
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  // set type network we use in the project
  networks: {
    hardhat: {},
     goerli: {
      url: `https://goerli.infura.io/v3/${process.env.GOERLI_URL_API}`,
      accounts: [process.env.WALLET_PRIVATE_KEY.toString()]
    }
  },
  // set path its define a main contract path or file
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
  // set time to connect to contract its timer set wait 40 secound for request com if not its we filed
  // mocha: {
  //   timeout: 40000
  // }
};
