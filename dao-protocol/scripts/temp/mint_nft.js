// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const mintNFT = async (address) => {

    const ekoNFT = await ethers.getContractAt("EkoNFTCert", address);

    await ekoNFT.safeMint("0xBD9acC68b274EEC2AFb4e51caA1a192db70548b6", "CERT");

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
  