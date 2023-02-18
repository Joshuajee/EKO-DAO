/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require("./libraries/diamond.js");

async function deployTokens(test = false) {
  const accounts = await ethers.getSigners();

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();


  console.log("USDC: ", usdc.address)

  const EkoStable = await ethers.getContractFactory("EkoStable");
  const ekoStable = await EkoStable.deploy();

  console.log("EkoStable: ", ekoStable.address)

  const EkoNFT = await ethers.getContractFactory("EkoStable");
  const ekoNFT = await EkoNFT.deploy();

  console.log("EkoNFT: ", ekoNFT.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployTokens()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.deployTokens = deployTokens;



/*
USDC:  0x5679C57F0becc7Fd063E47D5F2DDfA5d97687854
EkoStable:  0x1076579bf47c78Fb4d9af38BAFAf067d77bf64a0
EkoNFT:  0x3bB009bC5289D75394Bb06ecA7cAf537281E363D
*/