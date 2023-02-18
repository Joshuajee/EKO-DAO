
/* global ethers */
const {getSelectors, FacetCutAction } = require('./libraries/diamond.js')
  

async function upgradeDiamond() {

    // const accounts = await ethers.getSigners();
    const diamondAddress = "0xA1Aa5d5E21597fc988ab60Ef7212b42f543AE233"

    const diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)

    const Facet = await ethers.getContractFactory('CrowdFundFacet')
    const facet = await Facet.deploy()

    console.log("address", facet.address)

    const selectors = getSelectors(facet)

    const tx = await diamondCutFacet.diamondCut(
        [{
            facetAddress: facet.address,
            action: FacetCutAction.Replace,
            functionSelectors: selectors
        }],
        ethers.constants.AddressZero, '0x', { gasLimit: 100_000_000_000_000 }
    )

    const receipt = await tx.wait()

    if (!receipt.status) {
        throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }

    await diamondLoupeFacet.facetFunctionSelectors(facet.address)

   console.log(result)

    console.log("UPGRADE SUCCESSFUL")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  upgradeDiamond()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.upgradeDiamond = upgradeDiamond;

