/* global ethers task */
//require('@nomiclabs/hardhat-waffle');
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
	solidity: '0.8.17',
	settings: {
		optimizer: { enabled: true, runs: 200 }
	},
	// networks: {
	//   mainnet: {
	//     url: "https://mainnet.infura.io/v3/",
	//     accounts: [PRIVATE_KEY]
	//   },
	//   goerli: {
	//     url: "https://goerli.infura.io/v3/",
	//     accounts: [PRIVATE_KEY]
	//   },
	//   polygon: {
	//     url: "https://polygon-rpc.com/",
	//     accounts: [PRIVATE_KEY]
	//   },
	//   mumbai: {
	//     url: "https://rpc-mumbai.maticvigil.com/",
	//     accounts: [PRIVATE_KEY]
	//   },
	//   bsc: {
	//     url: "https://bsc-dataseed.binance.org/",
	//     accounts: [PRIVATE_KEY]
	//   },
	//   bsc_testnet: {
	//     url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
	//     accounts: [PRIVATE_KEY]
	//   },
	// }

	abiExporter: [
		{
			path: './abi',
			pretty: false,
			flat: true,
			runOnCompile: true,
		//	only: ["NFTMarketplace", "RoyaltyToken"]
		}
	]
};

