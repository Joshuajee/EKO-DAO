/* global describe it before ethers */
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

const { deployDiamond } = require("../../scripts/deploy.js");

const { assert } = require("chai");

const name = "Solidity Developer fall 2023";
const delay = 1000;
const duration = 1000;
const description = `This 13-week course is designed for people seeking a career in the blockchain ecosystem as a Solidity developer. The program starts on the 3rd October and is free of charge. The application deadline is 30th of September 2022.`;

const maxNumAdmittable = 4000 
const winnerPercentage = 50 
const firstRunnerUpPercentage = 30 
const secondRunnerUpPercentage = 20
const minScoreTokenRequiurement = 100

describe("HackFundFacet Test", async function () {

    const deployFixture = (async function () {

        [owner] = await ethers.getSigners();
        const diamondAddress = await deployDiamond(true);
        const hackathonFacet = await ethers.getContractAt("HackathonFacet", diamondAddress);
        const hackathonFacetGetters = await ethers.getContractAt("HackathonFacetGetters", diamondAddress); 
    
        return { diamondAddress, hackathonFacet, hackathonFacetGetters }
    });

    const deployFixture2 = (async function () {

        [owner] = await ethers.getSigners();
        const diamondAddress = await deployDiamond(true);
        const hackathonFacet = await ethers.getContractAt("HackathonFacet", diamondAddress);
        const hackathonFacetGetters = await ethers.getContractAt("HackathonFacetGetters", diamondAddress); 

        await hackathonFacet.newHackathon(
            name,
            description,
            delay, 
            duration, 
            maxNumAdmittable, 
            winnerPercentage, 
            firstRunnerUpPercentage, 
            secondRunnerUpPercentage,
            minScoreTokenRequiurement
        );
    
        return { diamondAddress, hackathonFacet, hackathonFacetGetters }
    });

    it("Should create new hackathon", async () => {


        const { hackathonFacet, hackathonFacetGetters } = await loadFixture(deployFixture);

        await hackathonFacet.newHackathon(
            name,
            description,
            delay, 
            duration, 
            maxNumAdmittable, 
            winnerPercentage, 
            firstRunnerUpPercentage, 
            secondRunnerUpPercentage,
            minScoreTokenRequiurement
        );

        const count = await hackathonFacetGetters.numberofHackathons()

        assert.equal(count, 1)

        // const hackathon = await hackathonFacetGetters.getHackathon(1)
    
        // assert.equal(hackathon.name, name);
        // assert.equal(hackathon.description, description);

        // assert.equal(hackathon.maxNumAdmittable, maxNumAdmittable);
        // assert.equal(hackathon.winnerPercentage, winnerPercentage);

        // assert.equal(hackathon.firstRunnerUpPercentage, firstRunnerUpPercentage);
        // assert.equal(hackathon.winnerPercentage, winnerPercentage);

        // assert.equal(hackathon.maxNumAdmittable, maxNumAdmittable);
        // assert.equal(hackathon.winnerPercentage, winnerPercentage);


    });

});
