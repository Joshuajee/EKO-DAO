// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const setAdmin = async (address) => {

    const govt = await ethers.getContractAt("AdminFacet", address);

    await govt.setAdmin("0x6EE728B52D7787d8eB311257CC41A1Cc4279F58b", 2);

    console.log("Done!")
}

if (require.main === module) {
    setAdmin("0x5Fe56b63EcC5721C60bF709eB906039ED178E6C2")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  