// /* global describe it before ethers */

// const {
//   getSelectors,
//   FacetCutAction,
//   removeSelectors,
// } = require("../scripts/libraries/diamond.js");

// const { deployDiamond } = require("../scripts/deploy.js");

// const { assert } = require("chai");

// describe("DiamondTest", async function () {
//   let diamondAddress;
//   let diamondCutFacet;
//   let diamondLoupeFacet;
//   let ownershipFacet;
//   let tx;
//   let receipt;
//   let result;
//   const addresses = [];

//   before(async function () {
//     diamondAddress = await deployDiamond(true);
//     diamondCutFacet = await ethers.getContractAt(
//       "DiamondCutFacet",
//       diamondAddress
//     );
//     diamondLoupeFacet = await ethers.getContractAt(
//       "DiamondLoupeFacet",
//       diamondAddress
//     );
//     ownershipFacet = await ethers.getContractAt(
//       "OwnershipFacet",
//       diamondAddress
//     );
//   });

//   it("should have 7 facets -- call to facetAddresses function", async () => {
//     for (const address of await diamondLoupeFacet.facetAddresses()) {
//       addresses.push(address);
//     }

//     assert.equal(addresses.length, 7);
//   });

//   it("facets should have the right function selectors -- call to facetFunctionSelectors function", async () => {
//     let selectors = getSelectors(diamondCutFacet);
//     result = await diamondLoupeFacet.facetFunctionSelectors(addresses[0]);
//     assert.sameMembers(result, selectors);
//     selectors = getSelectors(diamondLoupeFacet);
//     result = await diamondLoupeFacet.facetFunctionSelectors(addresses[1]);
//     assert.sameMembers(result, selectors);
//     selectors = getSelectors(ownershipFacet);
//     result = await diamondLoupeFacet.facetFunctionSelectors(addresses[2]);
//     assert.sameMembers(result, selectors);
//   });

//   it("selectors should be associated to facets correctly -- multiple calls to facetAddress function", async () => {
//     assert.equal(
//       addresses[0],
//       await diamondLoupeFacet.facetAddress("0x1f931c1c")
//     );
//     assert.equal(
//       addresses[1],
//       await diamondLoupeFacet.facetAddress("0xcdffacc6")
//     );
//     assert.equal(
//       addresses[2],
//       await diamondLoupeFacet.facetAddress("0xf2fde38b")
//     );
//   });

//   it("remove all functions and facets accept 'diamondCut' and 'facets'", async () => {
//     let selectors = [];
//     let facets = await diamondLoupeFacet.facets();
//     for (let i = 0; i < facets.length; i++) {
//       selectors.push(...facets[i].functionSelectors);
//     }
//     selectors = removeSelectors(selectors, [
//       "facets()",
//       "diamondCut(tuple(address,uint8,bytes4[])[],address,bytes)",
//     ]);
//     tx = await diamondCutFacet.diamondCut(
//       [
//         {
//           facetAddress: ethers.constants.AddressZero,
//           action: FacetCutAction.Remove,
//           functionSelectors: selectors,
//         },
//       ],
//       ethers.constants.AddressZero,
//       "0x",
//       { gasLimit: 800000 }
//     );
//     receipt = await tx.wait();
//     if (!receipt.status) {
//       throw Error(`Diamond upgrade failed: ${tx.hash}`);
//     }
//     facets = await diamondLoupeFacet.facets();
//     assert.equal(facets.length, 2);
//     assert.equal(facets[0][0], addresses[0]);
//     assert.sameMembers(facets[0][1], ["0x1f931c1c"]);
//     assert.equal(facets[1][0], addresses[1]);
//     assert.sameMembers(facets[1][1], ["0x7a0ed627"]);
//   });
// });
