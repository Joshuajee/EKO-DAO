// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const initCohort = async (address) => {

  const cohort = await ethers.getContractAt("Cohort", address);

  await cohort.init("0x5679C57F0becc7Fd063E47D5F2DDfA5d97687854", "0x3bB009bC5289D75394Bb06ecA7cAf537281E363D");
}

if (require.main === module) {
  initCohort("0xB037f3B225362DAF1DFaA035e69B093f72cc43DD")
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
