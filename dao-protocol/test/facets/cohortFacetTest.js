/* global describe it before ethers */

const { deployDiamond } = require("../../scripts/deploy.js");

const { assert } = require("chai");

describe("CohortFacetTest", async function () {
  let diamondAddress;
  let cohortFactoryFacet;
  let cohort;
  let cohortAddress;
  let usdc;
  let ekoNft;
  let ekoUsdc;
  let studentAddress;

  before(async function () {
    [owner] = await ethers.getSigners();
    studentAddress = owner.address;
    diamondAddress = await deployDiamond(true);
    cohortFactoryFacet = await ethers.getContractAt(
      "CohortFactoryFacet",
      diamondAddress
    );
    const USDC = await ethers.getContractFactory("USDC");
    usdc = await USDC.deploy();
    await usdc.deployed();
    console.log("USDC deployed:", usdc.address);

    const EkoNFT = await ethers.getContractFactory("EkoNFT");
    ekoNft = await EkoNFT.deploy();
    await ekoNft.deployed();
    console.log("EkoNFT deployed:", ekoNft.address);
  });

  it("should create new cohort", async () => {
    const name = "Solidity Developer fall 2023";
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const startDate = currentTimestamp + 30;
    const endDate = currentTimestamp + 60;
    await cohortFactoryFacet.newCohort(1, name, startDate, endDate, 100, 10);
    const cohortsList = await cohortFactoryFacet.cohorts();
    assert.equal(cohortsList[0].name, name);
    const cohortData = await cohortFactoryFacet.cohort(1);
    cohortAddress = cohortData.contractAddress;
    const Cohort = await ethers.getContractFactory("Cohort");
    cohort = await Cohort.attach(cohortAddress);
    const record = await cohort.cohort();
    assert.equal(record.name, name);
    assert.equal(record.startDate, startDate);
    assert.equal(record.endDate, endDate);
    assert.equal(record.size, 100);
    assert.equal(record.commitment, 10);
  });

  it("should enroll student in a cohort", async () => {
    await usdc.mint(studentAddress, 10);
    await usdc.approve(cohortAddress, 10);

    await cohort.init(usdc.address, ekoNft.address);

    const ekoStableAddress = await cohort.ekoStableAddress();
    const EkoStable = await ethers.getContractFactory("EkoStable");
    ekoUsdc = await EkoStable.attach(ekoStableAddress);

    const studentUsdcBalanceBeforeEnroll = await usdc.balanceOf(studentAddress);
    assert.equal(studentUsdcBalanceBeforeEnroll, 10);
    const studentEkoUsdcBalanceBeforeEnroll = await ekoUsdc.balanceOf(
      studentAddress
    );
    assert.equal(studentEkoUsdcBalanceBeforeEnroll, 0);
    const cohortUsdcBalanceBeforeEnroll = await usdc.balanceOf(cohortAddress);
    assert.equal(cohortUsdcBalanceBeforeEnroll, 0);

    await cohort.enroll(10);

    const studentUsdcBalanceAfterEnroll = await usdc.balanceOf(studentAddress);
    assert.equal(studentUsdcBalanceAfterEnroll, 0);
    const studentEkoUsdcBalanceAfterEnroll = await ekoUsdc.balanceOf(
      studentAddress
    );
    assert.equal(studentEkoUsdcBalanceAfterEnroll, 10);
    const cohortUsdcBalanceAfterEnroll = await usdc.balanceOf(cohortAddress);
    assert.equal(cohortUsdcBalanceAfterEnroll, 10);
  });

  it("should refund student after cohort ended", async () => {
    const tokenId = await ekoNft.safeMint(studentAddress);
    await ekoUsdc.approve(cohortAddress, 10);

    await cohort.refund(10, tokenId.value);

    const studentUsdcBalanceAfterRefund = await usdc.balanceOf(studentAddress);
    assert.equal(studentUsdcBalanceAfterRefund, 10);
    const studentEkoUsdcBalanceAfterRefund = await ekoUsdc.balanceOf(
      studentAddress
    );
    assert.equal(studentEkoUsdcBalanceAfterRefund, 0);
    const cohortUsdcBalanceAfterRefund = await usdc.balanceOf(cohortAddress);
    assert.equal(cohortUsdcBalanceAfterRefund, 0);
  });
});
