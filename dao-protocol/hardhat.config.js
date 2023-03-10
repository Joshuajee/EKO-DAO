require('dotenv').config();
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
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

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_MUMBAI = process.env.PRIVATE_KEY_MUMBAI;

module.exports = {
	solidity: '0.8.17',
	settings: {
		optimizer: { enabled: true, runs: 200 }
	},
	networks: {
		mainnet: {
			url: 'https://mainnet.infura.io/v3/',
			accounts: [ PRIVATE_KEY ]
		},
		goerli: {
			url: 'https://goerli.infura.io/v3/',
			accounts: [ PRIVATE_KEY ]
		},
		polygon: {
			url: 'https://polygon-rpc.com/',
			accounts: [ PRIVATE_KEY ]
		},
		mumbai: {
			url: 'https://polygon-mumbai.g.alchemy.com/v2/1yHVzG9cEm8g0IJKQA0VO-nczdGW4NgO',
			accounts: [ PRIVATE_KEY_MUMBAI ]
		},
		bsc: {
			url: 'https://bsc-dataseed.binance.org/',
			accounts: [ PRIVATE_KEY ]
		},
		bsc_testnet: {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
			accounts: [ PRIVATE_KEY ]
		},
		hardhat: {
			forking: {
				url: 'https://eth-mainnet.g.alchemy.com/v2/L14t96z2IgmC3Nh6z5TpXqQ_e2Eq-pJq'
				//url:'https://eth-goerli.g.alchemy.com/v2/oQb3MTwwXCTwabfOVCMal6xsPve204OB',
			}
		}
	},
	abiExporter: [
		{
			path: '../dao-frontend/src/abi',
			pretty: false,
			runOnCompile: true
		}
	],
	contractSizer: {
		alphaSort: true,
		disambiguatePaths: false,
		runOnCompile: true,
		strict: true,
		only: []
	}
};
