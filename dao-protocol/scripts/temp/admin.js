// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const setAdmin = async (address) => {

    const govt = await ethers.getContractAt("AdminFacet", address);

    await govt.setAdmin("0x7CcF109b7833F038FE3aC0e257dF6e8886a15b5C", 2);

    console.log("Done!")
}

if (require.main === module) {
    setAdmin("0xC8854E5CeD88a073A1400CB2c7f6A4F488d44175")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });
}
  