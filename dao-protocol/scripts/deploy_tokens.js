/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require("./libraries/diamond.js");

async function deployTokens() {
  

    const EkoToken = await ethers.getContractFactory("EkoToken");
    const ekoToken = await EkoToken.deploy();
    console.log(`EkoToken deployed: ${ekoToken.address}`);

    const USDC = await ethers.getContractFactory("USDC");
    const usdc = await USDC.deploy();
    console.log(`USDC deployed: ${usdc.address}`);

    const EkoNFT = await ethers.getContractFactory("EkoNFT");
    const ekoNft = await EkoNFT.deploy();
    
    console.log(`EkoNFT deployed: ${ekoNft.address}`);

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
