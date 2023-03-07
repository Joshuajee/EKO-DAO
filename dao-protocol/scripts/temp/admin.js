// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const setAdmin = async (address) => {

    const govt = await ethers.getContractAt("AdminFacet", address);

    await govt.setAdmin("0x14Faf58613AE78D6C4e5bfFcEA320ba1E09Dcd1b", 2);

    console.log("Done!")
}

if (require.main === module) {
    setAdmin("0xb0E01Ef91CDDA5dffAa58ff8bb7DbfE63E02550B")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  