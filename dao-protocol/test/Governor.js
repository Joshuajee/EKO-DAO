const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect, assert } = require('chai');
const { ethers } = require('hardhat');
const helpers = require('@nomicfoundation/hardhat-network-helpers');

describe('Governor Facet test', function() {
	const VOTING_DELAY = 10800;

	// function Inputs
	const Proposal_Name_1 = 'Proposal One';
	const Proposal_Name_2 = 'Proposal Two';

	GovernorFixture = async () => {
		const [ owner, signer1, signer2, signer3 ] = await ethers.getSigners();

		const ekotoken = await ethers.getContractFactory('EkoToken');
		const EkotokenInstance = await ekotoken.deploy('1000000000000000000000000000');

		await EkotokenInstance.transfer(signer1.address, '100000000000000000000');
		// await EkotokenInstance.transfer(signer2.address, '100000000000000000000');
		// await EkotokenInstance.transfer(signer3.address, '100000000000000000000');

		const governor = await ethers.getContractFactory('Governor');
		const GovernorInstance = await governor.deploy(EkotokenInstance.address);

		return { GovernorInstance, owner, signer1, signer2, signer3 };
	};

	it('should be able to create a new proposal and store it', async () => {
		const { GovernorInstance } = await loadFixture(GovernorFixture);

		await GovernorInstance.newProposal(Proposal_Name_1);
		await GovernorInstance.newProposal(Proposal_Name_2);

		const firstProposal = await GovernorInstance.viewProposal('1');

		expect(await firstProposal.name).to.equal(Proposal_Name_1);
		expect(await GovernorInstance.getNumberOfProposals()).to.equal(2);
	});

	it('should be able to allow voting delegation on a particular proposal', async () => {
		const { GovernorInstance, owner, signer1, signer2, signer3 } = await loadFixture(GovernorFixture);

		await GovernorInstance.newProposal(Proposal_Name_1);

		await GovernorInstance.addVotingDelegate('1', signer1.address);
		await GovernorInstance.connect(signer2).addVotingDelegate('1', signer3.address);

		const delegateOne = await GovernorInstance.viewDelegate('1', owner.address);
		const delegateTwo = await GovernorInstance.viewDelegate('1', signer2.address);

		expect(await delegateOne).to.equal(signer1.address);
		expect(await delegateTwo).to.equal(signer3.address);
	});

	it('should be able to remove voting delegate on a proposal', async () => {
		const { GovernorInstance, owner, signer1 } = await loadFixture(GovernorFixture);

		await GovernorInstance.newProposal(Proposal_Name_1);

		await GovernorInstance.addVotingDelegate('1', signer1.address);

		const delegateOneBefore = await GovernorInstance.viewDelegate('1', owner.address);

		console.log(`The currrent delegate is ${delegateOneBefore}`);

		await GovernorInstance.removeDelegate('1');

		const delegateOneAfter = await GovernorInstance.viewDelegate('1', owner.address);

		console.log(`The address after delegate removal is ${delegateOneAfter}`);

		expect(await GovernorInstance.viewDelegate('1', owner.address)).to.equal(ethers.constants.AddressZero);
	});

	it('should be able to vote for or against a proposal', async () => {
		const { GovernorInstance, owner, signer1 } = await loadFixture(GovernorFixture);

		await GovernorInstance.newProposal(Proposal_Name_1);
		await GovernorInstance.newProposal(Proposal_Name_2);

		const firstProposalBefore = await GovernorInstance.viewProposal('1');
		const secondProposalBefore = await GovernorInstance.viewProposal('2');

		console.log(
			`The votes on the First Proposal before voting: votesFor:${firstProposalBefore.votesFor} || votesAgainst:${firstProposalBefore.votesAgainst}`
		);
		console.log(
			`The votes on the Second Proposal before voting: votesFor:${secondProposalBefore.votesFor} || votesAgainst:${secondProposalBefore.votesAgainst}`
		);

		await helpers.time.increase(VOTING_DELAY);

		await GovernorInstance.voteFor('1');
		await GovernorInstance.connect(signer1).voteAgainst('1');

		await GovernorInstance.voteAgainst('2');
		await GovernorInstance.connect(signer1).voteFor('2');

		const firstProposalAfter = await GovernorInstance.viewProposal('1');
		const secondProposalAfter = await GovernorInstance.viewProposal('2');

		console.log(
			`The votes on the First Proposal after voting: votesFor:${firstProposalAfter.votesFor} || votesAgainst:${firstProposalAfter.votesAgainst}`
		);
		console.log(
			`The votes on the Second Proposal after voting: votesFor:${secondProposalAfter.votesFor} || votesAgainst:${secondProposalAfter.votesAgainst}`
		);

		expect(firstProposalAfter.votesFor).to.equal('1');
		expect(firstProposalAfter.votesAgainst).to.equal('1');
		expect(secondProposalAfter.votesFor).to.equal('1');
		expect(secondProposalAfter.votesFor).to.equal('1');
	});

	it('should be able to allow delegate vote for or against a proposal', async () => {
		const { GovernorInstance, owner, signer1, signer2, signer3 } = await loadFixture(GovernorFixture);

		await GovernorInstance.newProposal(Proposal_Name_1);
		await GovernorInstance.newProposal(Proposal_Name_2);

		const firstProposalBefore = await GovernorInstance.viewProposal('1');
		const secondProposalBefore = await GovernorInstance.viewProposal('2');

		console.log(
			`The votes on the First Proposal before voting: votesFor:${firstProposalBefore.votesFor} || votesAgainst:${firstProposalBefore.votesAgainst}`
		);
		console.log(
			`The votes on the Second Proposal before voting: votesFor:${secondProposalBefore.votesFor} || votesAgainst:${secondProposalBefore.votesAgainst}`
		);

		await GovernorInstance.addVotingDelegate('1', signer2.address);
		await GovernorInstance.addVotingDelegate('2', signer2.address);

		await GovernorInstance.connect(signer1).addVotingDelegate('1', signer3.address);
		await GovernorInstance.connect(signer1).addVotingDelegate('2', signer3.address);

		await helpers.time.increase(VOTING_DELAY);

		await GovernorInstance.connect(signer2).voteForAsDelegate('1', owner.address);
		await GovernorInstance.connect(signer3).voteAgainstAsDelegate('1', signer1.address);

		await GovernorInstance.connect(signer2).voteAgainstAsDelegate('2', owner.address);
		await GovernorInstance.connect(signer3).voteForAsDelegate('2', signer1.address);

		const firstProposalAfter = await GovernorInstance.viewProposal('1');
		const secondProposalAfter = await GovernorInstance.viewProposal('2');

		console.log(
			`The votes on the First Proposal after voting: votesFor:${firstProposalAfter.votesFor} || votesAgainst:${firstProposalAfter.votesAgainst}`
		);
		console.log(
			`The votes on the Second Proposal after voting: votesFor:${secondProposalAfter.votesFor} || votesAgainst:${secondProposalAfter.votesAgainst}`
		);

		expect(firstProposalAfter.votesFor).to.equal('1');
		expect(firstProposalAfter.votesAgainst).to.equal('1');
		expect(secondProposalAfter.votesFor).to.equal('1');
		expect(secondProposalAfter.votesFor).to.equal('1');
	});

	it('should be able to delete a proposal still in voting delay', async () => {
		const { GovernorInstance } = await loadFixture(GovernorFixture);

		await GovernorInstance.newProposal(Proposal_Name_1);
		await GovernorInstance.newProposal(Proposal_Name_2);

		await GovernorInstance.deleteProposal();

		expect(await GovernorInstance.getNumberOfProposals()).to.equal('1');
	});
});
