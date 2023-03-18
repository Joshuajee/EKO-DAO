// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const setAdmin = async (address) => {

    const govt = await ethers.getContractAt("AdminFacet", address);

    await govt.setAdmin("0x120c5810b9aa689037277d1142547f62d961b941", 2);

    console.log("Done!")
}

if (require.main === module) {
    setAdmin("0x82833f86e18c7D22Ea2540F9315465b57d278861")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  