// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const mintNFT = async (address) => {

    const ekoNFT = await ethers.getContractAt("EkoNFTCert", address);

    const tokenId = await ekoNFT.safeMint("0x5103BC779fdd4799Cfd5efC6ee827F7B1D57789B", "CERT");

    console.log("Done!")
}

if (require.main === module) {
    mintNFT("0x9BDa4DCc9F9785611ccba2593309635B6e6f3Dd1")
        .then(() => {
            process.exit(0)
        })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
  