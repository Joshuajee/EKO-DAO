/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require("./libraries/diamond.js");

async function deployDiamond(test = false) {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  // Deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded or deployed to initialize state variables
  // Read about how the diamondCut function works in the EIP2535 Diamonds standard
  const DiamondInit = await ethers.getContractFactory("DiamondInit");
  const diamondInit = await DiamondInit.deploy();
  await diamondInit.deployed();

  // Deploy facets and set the `facetCuts` variable
  console.log("Deploying facets");
  const FacetNames = [
    "DiamondCutFacet",
    "DiamondLoupeFacet",
    "OwnershipFacet",
    "AdminFacet",
    "CohortFactoryFacet",
    "CohortFacet",
    "GovernanceFacet",
    "CrowdFundFacet",
    "HackathonFacet",
    "HackathonFacetUsers",
    "HackathonFacetGetters",
  ];
  // The `facetCuts` variable is the FacetCut[] that contains the functions to add during diamond deployment
  const facetCuts = [];
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy();
    await facet.deployed();
    if (!test) console.log(`${FacetName} deployed: ${facet.address}`);
    facetCuts.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
  }

  // Creating a function call
  // This call gets executed during deployment and can also be executed in upgrades
  // It is executed with delegatecall on the DiamondInit address.
  let functionCall = diamondInit.interface.encodeFunctionData("init");

  // Setting arguments that will be used in the diamond constructor

  const diamondArgs = {
    owner: contractOwner.address,
    init: diamondInit.address,
    initCalldata: functionCall,
  };

  // deploy Diamond
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(facetCuts, diamondArgs);
  await diamond.deployed();
  if (!test) console.log("Diamond deployed:", diamond.address);

  /* const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  await usdc.deployed();
  console.log(`USDC deployed: ${usdc.address}`);

  const EkoNFT = await ethers.getContractFactory("EkoNFT");
  const ekoNft = await EkoNFT.deploy();
  await ekoNft.deployed();
  console.log(`EkoNFT deployed: ${ekoNft.address}`);

  const EkoScore = await ethers.getContractFactory("EkoScoreToken");
  const ekoScore = await EkoScore.deploy();
  await ekoScore.deployed();
  console.log(`EkoScore deployed: ${ekoScore.address}`);*/

  // returning the address of the diamond
  return diamond.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.deployDiamond = deployDiamond;
