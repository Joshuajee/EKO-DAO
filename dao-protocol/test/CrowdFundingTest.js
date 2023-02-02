const { impersonateAccount, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const ERC20ABI = require("@openzeppelin/contracts/build/contracts/ERC20.json").abi;

describe("CrowdFunding Facet test", () => {

    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const USDCHolder1 = "0xda9ce944a37d218c3302f6b82a094844c6eceb17";
    const USDCHolder2 = "0x1b7baa734c00298b9429b518d621753bb0f6eff2";

    const projectTitle = "Ekolance";
    const projectDec = "Ekolance Solidity Training";
    const targetFund = ethers.utils.parseUnits("4000", 5);
    const minimumContribution = ethers.utils.parseUnits("50", 5);
    const projectPeriod = 60*15;

    

    CrowdFundingFixture = async () => {
        await impersonateAccount(USDCHolder1);
        await impersonateAccount(USDCHolder2);

        const USDCHolder1_signer = await ethers.getSigner(USDCHolder1);
        const USDCHolder2_signer = await ethers.getSigner(USDCHolder2);

        [owner] = await ethers.getSigners();
        const CrowdFundingFacet = await ethers.getContractFactory("CrowdFundFacet");
        const CrowdFundingFacetInstance = await CrowdFundingFacet.deploy();
        const USDCContractInstance = await new ethers.Contract(USDC,ERC20ABI,USDCHolder1_signer); 
        
        const USDCBalanceOfHolder1 = await USDCContractInstance.balanceOf(USDCHolder1);
        const USDCBalanceOfHolder2 = await USDCContractInstance.connect(USDCHolder2_signer).balanceOf(USDCHolder2);
        console.log("The USDC balance of USDCHolder1 is ", ethers.utils.formatUnits(USDCBalanceOfHolder1.toString(),5));
        console.log("The USDC balance of USDCHolder2 is ", ethers.utils.formatUnits(USDCBalanceOfHolder2.toString(),5));

        return {USDCHolder1_signer,USDCHolder2_signer,owner, CrowdFundingFacetInstance, USDCContractInstance }
    }

    it("should create project contract", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance, USDCHolder1_signer, USDCHolder2_signer} = await loadFixture(CrowdFundingFixture);
        const projectContract1 = await CrowdFundingFacetInstance.createProject(projectTitle,projectDec,targetFund,minimumContribution,USDC,projectPeriod);  
        const projectContract2 = await CrowdFundingFacetInstance.createProject(projectTitle,projectDec,targetFund,minimumContribution,USDC,projectPeriod);       
        console.log(projectContract1,projectContract2)
        
        expect(await CrowdFundingFacetInstance.getProjectDetails(1)).to.be.properAddress;
        expect(await CrowdFundingFacetInstance.getProjectDetails(0)).to.be.properAddress;

        await USDCContractInstance.connect(USDCHolder1_signer).approve(projectContract1, ethers.utils.parseUnits("8000",5));
        const donate = await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(0,ethers.utils.parseUnits("10",5))
        console.log(donate)
    }) 
})







