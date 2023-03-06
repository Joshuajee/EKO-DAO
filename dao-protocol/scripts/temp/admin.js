// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const setAdmin = async (address) => {

    const govt = await ethers.getContractAt("AdminFacet", address);

    await govt.setAdmin("0x7F0e4b8e533ae03C16A8eF084Fcc67B4794EFec2", 2);

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
  