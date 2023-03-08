// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const initGovt = async (address) => {

    const govt = await ethers.getContractAt("GovernanceFacet", address);
  
    await govt.intializeGovernance("0x5679C57F0becc7Fd063E47D5F2DDfA5d97687854", 10);

    console.log("Done!")
  }
  
  if (require.main === module) {
    initGovt("0xb0E01Ef91CDDA5dffAa58ff8bb7DbfE63E02550B")
      .then(() => {
        process.exit(0)
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
  