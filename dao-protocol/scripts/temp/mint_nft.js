// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const mintNFT = async (address) => {

    const ekoNFT = await ethers.getContractAt("EkoNFT", address);

    const tokenId = await ekoNFT.safeMint("0x5103BC779fdd4799Cfd5efC6ee827F7B1D57789B");

    console.log("Done!", tokenId)
}

if (require.main === module) {
    mintNFT("0x3bB009bC5289D75394Bb06ecA7cAf537281E363D")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  