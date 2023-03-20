// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const initGovt = async (address) => {

    const govt = await ethers.getContractAt("GovernanceFacet", address);
  
    await govt.intializeGovernance("0xe1d073C740fE2b3c5951aa09EAa2F34717e1599C");

    console.log("Done!")
  }
  
  if (require.main === module) {
    initGovt("0xa53cC18Ec048113D0d7bb494d126C6Ef802296F7")
      .then(() => {
        process.exit(0)
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
  