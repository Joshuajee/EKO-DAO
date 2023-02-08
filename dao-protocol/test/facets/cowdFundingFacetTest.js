const {
  impersonateAccount,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const ERC20ABI =
  require("@openzeppelin/contracts/build/contracts/ERC20.json").abi;

describe("CrowdFunding Facet test", () => {
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const USDCHolder1 = "0xda9ce944a37d218c3302f6b82a094844c6eceb17";
  const USDCHolder2 = "0x1b7baa734c00298b9429b518d621753bb0f6eff2";

  //inputs to CrowdFunding campaign project creation
  const projectTitle = "Ekolance";
  const projectDec = "Ekolance Solidity Training";
  const targetFund = ethers.utils.parseUnits("4000", 5);
  const minimumContribution = ethers.utils.parseUnits("50", 5);
  const projectPeriod = 60 * 15; // in seconds

  //input to test cases
  const AmountToDonate = 1000;
  const CampaignIndex = 0;

  CrowdFundingFixture = async () => {
    await impersonateAccount(USDCHolder1);
    await impersonateAccount(USDCHolder2);

    const USDCHolder1_signer = await ethers.getSigner(USDCHolder1);
    const USDCHolder2_signer = await ethers.getSigner(USDCHolder2);

    [owner] = await ethers.getSigners();

    //get the instance of stableCoin and CrowdFunding contracts
    const CrowdFundingFacet = await ethers.getContractFactory("CrowdFundFacet");
    const CrowdFundingFacetInstance = await CrowdFundingFacet.deploy();
    const USDCContractInstance = await new ethers.Contract(
      USDC,
      ERC20ABI,
      USDCHolder1_signer
    );
    const TokenDecimal = await USDCContractInstance.decimals();

    //get the balance of the USDC holders
    const USDCBalanceOfHolder1 = await USDCContractInstance.balanceOf(
      USDCHolder1
    );
    const USDCBalanceOfHolder2 = await USDCContractInstance.connect(
      USDCHolder2_signer
    ).balanceOf(USDCHolder2);
    console.log(
      "The USDC balance of USDCHolder1 is ",
      ethers.utils.formatUnits(USDCBalanceOfHolder1.toString(), 5)
    );
    console.log(
      "The USDC balance of USDCHolder2 is ",
      ethers.utils.formatUnits(USDCBalanceOfHolder2.toString(), 5)
    );

    //send ether to one of the USDCHolder for EVM transactions
    await owner.sendTransaction({
      to: USDCHolder1,
      value: ethers.utils.parseUnits("50", 18),
    });

    //create an isstance of CrowdFunding Campaign contract
    await CrowdFundingFacetInstance.createProject(
      projectTitle,
      projectDec,
      targetFund,
      minimumContribution,
      USDC,
      projectPeriod
    );
    const CampaignContract = {
      ...(await CrowdFundingFacetInstance.getProjectDetails(CampaignIndex)),
    }.projectAddress;

    return {
      USDCHolder1_signer,
      USDCHolder2_signer,
      owner,
      CrowdFundingFacetInstance,
      USDCContractInstance,
      CampaignContract,
      TokenDecimal,
    };
  };

  it("should create project campaign contract and increment project count", async () => {
    const { CrowdFundingFacetInstance } = await loadFixture(
      CrowdFundingFixture
    );

    await CrowdFundingFacetInstance.createProject(
      projectTitle,
      projectDec,
      targetFund,
      minimumContribution,
      USDC,
      projectPeriod
    );
    await CrowdFundingFacetInstance.createProject(
      projectTitle,
      projectDec,
      targetFund,
      minimumContribution,
      USDC,
      projectPeriod
    );
    const ProjectContract1 = {
      ...(await CrowdFundingFacetInstance.getProjectDetails(1)),
    }.projectAddress;
    const ProjectContract2 = {
      ...(await CrowdFundingFacetInstance.getProjectDetails(2)),
    }.projectAddress;

    expect(ProjectContract1).to.be.properAddress;
    expect(ProjectContract2).to.be.properAddress;
    expect(await CrowdFundingFacetInstance.returnProjectsCount()).to.equal(3);
  });

  it("should allow anyone to donate", async () => {
    const {
      USDCContractInstance,
      CrowdFundingFacetInstance,
      USDCHolder1_signer,
      CampaignContract,
      TokenDecimal,
    } = await loadFixture(CrowdFundingFixture);

    const DonatedAmount = ethers.utils.parseUnits(
      AmountToDonate.toString(),
      TokenDecimal
    );

    await USDCContractInstance.connect(USDCHolder1_signer).approve(
      CampaignContract,
      DonatedAmount
    );

    await expect(
      CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
        CampaignIndex,
        DonatedAmount
      )
    ).to.changeTokenBalances(
      USDCContractInstance,
      [USDCHolder1, CampaignContract],
      [-DonatedAmount, DonatedAmount]
    );
  });
});
