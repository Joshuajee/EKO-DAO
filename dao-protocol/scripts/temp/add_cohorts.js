const addCohorts = async (diamondAddress) => {

  [owner] = await ethers.getSigners();
  cohortFactoryFacet = await ethers.getContractAt("CohortFactoryFacet", diamondAddress);

  const name = "Solidity Developer fall 2020";
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  const startDate = currentTimestamp + 30;
  const endDate = currentTimestamp + 60;

  await cohortFactoryFacet.newCohort(3, name, startDate, endDate, 50, 20);
}

if (require.main === module) {
  addCohorts("0xA1Aa5d5E21597fc988ab60Ef7212b42f543AE233")
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

