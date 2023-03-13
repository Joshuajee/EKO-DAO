// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const mintNFT = async (address) => {

    const ekoNFT = await ethers.getContractAt("EkoNFTCert", address);

    const tokenId = await ekoNFT.safeMint("0x5103BC779fdd4799Cfd5efC6ee827F7B1D57789B", "CERT");

    console.log("Done!", tokenId)
}

if (require.main === module) {
    mintNFT("0xCfe50B893F8f32e17f16DB847716b7e2A480D6B5")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  