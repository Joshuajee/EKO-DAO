
/* global ethers task */
//require('@nomiclabs/hardhat-waffle');
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: '0.8.17',
  settings: {
    optimizer: { enabled: true, runs: 200 }
  },
//   networks: {
                    
//     goerli: {
//       url: "https://eth-goerli.g.alchemy.com/v2/oQb3MTwwXCTwabfOVCMal6xsPve204OB",
//       accounts: ['0x7c9a17ce900d4c227d6a01006681ca4c469c2926c1a0c3c833083468db98284e']
//     },
//     hardhat: {
//       forking:{
//         url:'https://eth-mainnet.g.alchemy.com/v2/L14t96z2IgmC3Nh6z5TpXqQ_e2Eq-pJq',
//         //url:'https://eth-goerli.g.alchemy.com/v2/oQb3MTwwXCTwabfOVCMal6xsPve204OB',
//       }
//     },    
//  }
}
