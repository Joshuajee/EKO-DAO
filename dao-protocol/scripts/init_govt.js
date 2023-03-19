// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const initGovt = async (address) => {

    const govt = await ethers.getContractAt("GovernanceFacet", address);
  
    await govt.intializeGovernance("0xd0F6816983cdDD67ec49d607D6B33f1f988dD244");

    console.log("Done!")
  }
  
  if (require.main === module) {
    initGovt("0x82833f86e18c7D22Ea2540F9315465b57d278861")
      .then(() => {
        process.exit(0)
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
  