// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const setAdmin = async (address) => {

    const govt = await ethers.getContractAt("AdminFacet", address);

    await govt.setAdmin("0xd0F6816983cdDD67ec49d607D6B33f1f988dD244", 2);

    console.log("Done!")
}

if (require.main === module) {
    setAdmin("0x7BB86D93B8e4D6F6ffEb6Ab4bb3B959135c98E43")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  