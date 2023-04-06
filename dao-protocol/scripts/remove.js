
/* global ethers */
const {getSelectors, FacetCutAction } = require('./libraries/diamond.js')
  

async function removeFacet(facetName) {

    console.log("Starting...")

    // const accounts = await ethers.getSigners();
    const diamondAddress = "0x82833f86e18c7D22Ea2540F9315465b57d278861"

    const diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)

    const facet = await ethers.getContractAt(facetName, diamondAddress)

    const selectors = getSelectors(facet)

    const tx = await diamondCutFacet.diamondCut(
        [{
            facetAddress: "0xC52bc65C15DBc403f0339E40ffa8C023080239D9",
            action: FacetCutAction.Remove,
            functionSelectors: selectors
        }],
       "0xC52bc65C15DBc403f0339E40ffa8C023080239D9", '0x', { gasLimit: 1000000000000000 }
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
  removeFacet("HackathonFacet")
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
