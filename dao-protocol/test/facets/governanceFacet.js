const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const helpers = require('@nomicfoundation/hardhat-network-helpers');

const { deployDiamond } = require('../../scripts/deploy.js');

describe('Governance Facet test', function() {
	// function Inputs
	const PROPOSAL_NAME_1 = 'Proposal One';
	const PROPOSAL_DELAY_MINUITES_1 = 0;
	const PROPOSAL_DELAY_HOURS_1 = 0;
	const PROPOSAL_VOTING_DAYS_1 = 1;

	const PROPOSAL_NAME_2 = 'Proposal Two';
	const PROPOSAL_DELAY_MINUITES_2 = 0;
	const PROPOSAL_DELAY_HOURS_2 = 2;
	const PROPOSAL_VOTING_DAYS_2 = 1;

	GovernanceFixture = async () => {
		const [ owner, signer1, signer2, signer3 ] = await ethers.getSigners();

		const ekoStable = await ethers.getContractFactory('EkoStable');
		const EkoStableInstance = await ekoStable.deploy();
		await EkoStableInstance.mint(owner.address, '1000000000000000000000000000');
		await EkoStableInstance.transfer(signer1.address, '100000000000000000000');

		diamondAddress = await deployDiamond(true);
		const GovernanceFacet = await ethers.getContractAt('GovernanceFacet', diamondAddress);

		await GovernanceFacet.intializeGovernance(EkoStableInstance.address, '100');

		return { GovernanceFacet, owner, signer1, signer2, signer3 };
	};

	it('should be able to set and get the minimum token requirement', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.setMinimumTokenRequiremnent('200');

		const newMinTokenRequirement = await GovernanceFacet.getMinimumTokenRequirement();

		expect(await newMinTokenRequirement).to.equal('200000000000000000000');
	});

	it('should be able to create a new proposal, store it and get the number of proposls', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);
		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_2,
			PROPOSAL_DELAY_MINUITES_2,
			PROPOSAL_DELAY_HOURS_2,
			PROPOSAL_VOTING_DAYS_2
		);

		const firstProposal = await GovernanceFacet.viewProposal('1');

		expect(await firstProposal.name).to.equal(PROPOSAL_NAME_1);
		expect(await GovernanceFacet.getNumberOfProposals()).to.equal(2);
	});

	it('should be able to allow voting delegation on a particular proposal  and view delegate', async () => {
		const { GovernanceFacet, owner, signer1, signer2, signer3 } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		await GovernanceFacet.addVotingDelegate('1', signer1.address);
		await GovernanceFacet.connect(signer2).addVotingDelegate('1', signer3.address);

		const delegateOne = await GovernanceFacet.viewDelegate('1', owner.address);
		const delegateTwo = await GovernanceFacet.viewDelegate('1', signer2.address);

		expect(await delegateOne).to.equal(signer1.address);
		expect(await delegateTwo).to.equal(signer3.address);
	});

	it('should be able to remove voting delegate on a proposal', async () => {
		const { GovernanceFacet, owner, signer1 } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		await GovernanceFacet.addVotingDelegate('1', signer1.address);

		const delegateOneBefore = await GovernanceFacet.viewDelegate('1', owner.address);

		console.log(`The currrent delegate is ${delegateOneBefore}`);

		await GovernanceFacet.removeDelegate('1');

		const delegateOneAfter = await GovernanceFacet.viewDelegate('1', owner.address);

		console.log(`The address after delegate removal is ${delegateOneAfter}`);

		expect(await GovernanceFacet.viewDelegate('1', owner.address)).to.equal(ethers.constants.AddressZero);
	});

	it('should be able to vote for or against a proposal', async () => {
		const { GovernanceFacet, owner, signer1 } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);
		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_2,
			PROPOSAL_DELAY_MINUITES_2,
			PROPOSAL_DELAY_HOURS_2,
			PROPOSAL_VOTING_DAYS_2
		);

		const firstProposalBefore = await GovernanceFacet.viewProposal('1');
		const secondProposalBefore = await GovernanceFacet.viewProposal('2');

		console.log(
			`The votes on the First Proposal before voting: votesFor:${firstProposalBefore.votesFor} || votesAgainst:${firstProposalBefore.votesAgainst}`
		);
		console.log(
			`The votes on the Second Proposal before voting: votesFor:${secondProposalBefore.votesFor} || votesAgainst:${secondProposalBefore.votesAgainst}`
		);

		await GovernanceFacet.voteFor('1');
		await GovernanceFacet.connect(signer1).voteAgainst('1');

		await helpers.time.increase(2 * 60 * 60);

		await GovernanceFacet.voteAgainst('2');
		await GovernanceFacet.connect(signer1).voteFor('2');

		const firstProposalAfter = await GovernanceFacet.viewProposal('1');
		const secondProposalAfter = await GovernanceFacet.viewProposal('2');

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
		const { GovernanceFacet, owner, signer1, signer2, signer3 } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);
		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_2,
			PROPOSAL_DELAY_MINUITES_2,
			PROPOSAL_DELAY_HOURS_2,
			PROPOSAL_VOTING_DAYS_2
		);

		const firstProposalBefore = await GovernanceFacet.viewProposal('1');
		const secondProposalBefore = await GovernanceFacet.viewProposal('2');

		console.log(
			`The votes on the First Proposal before voting: votesFor:${firstProposalBefore.votesFor} || votesAgainst:${firstProposalBefore.votesAgainst}`
		);
		console.log(
			`The votes on the Second Proposal before voting: votesFor:${secondProposalBefore.votesFor} || votesAgainst:${secondProposalBefore.votesAgainst}`
		);

		await GovernanceFacet.addVotingDelegate('1', signer2.address);
		await GovernanceFacet.addVotingDelegate('2', signer2.address);

		await GovernanceFacet.connect(signer1).addVotingDelegate('1', signer3.address);
		await GovernanceFacet.connect(signer1).addVotingDelegate('2', signer3.address);

		await GovernanceFacet.connect(signer2).voteForAsDelegate('1', owner.address);
		await GovernanceFacet.connect(signer3).voteAgainstAsDelegate('1', signer1.address);

		await helpers.time.increase(2 * 60 * 60);

		await GovernanceFacet.connect(signer2).voteAgainstAsDelegate('2', owner.address);
		await GovernanceFacet.connect(signer3).voteForAsDelegate('2', signer1.address);

		const firstProposalAfter = await GovernanceFacet.viewProposal('1');
		const secondProposalAfter = await GovernanceFacet.viewProposal('2');

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
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_2,
			PROPOSAL_DELAY_MINUITES_2,
			PROPOSAL_DELAY_HOURS_2,
			PROPOSAL_VOTING_DAYS_2
		);

		await GovernanceFacet.deleteProposal(2);

		const secondProposal = await GovernanceFacet.viewProposal('2');

		expect(await secondProposal.state).to.equal(5);
	});

	it('should bea able to get last 15 proposals that have not started', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_2,
			PROPOSAL_DELAY_MINUITES_2,
			PROPOSAL_DELAY_HOURS_2,
			PROPOSAL_VOTING_DAYS_2
		);

		const notStarted = await GovernanceFacet.getNotStarted();

		expect(await notStarted[0].name).to.equal(PROPOSAL_NAME_2);
	});

	it('should be able to get the last 15 propsals that are ongoing', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		const ongoing = await GovernanceFacet.getOngoing();

		expect(await ongoing[0].name).to.equal(PROPOSAL_NAME_1);
	});

	it('should be able to get the last 15 proposals that were won', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		await GovernanceFacet.voteFor('1');

		await helpers.time.increase(24 * 60 * 60);

		await GovernanceFacet.endVoting('1');

		const won = await GovernanceFacet.getWon();

		expect(await won[0].name).to.equal(PROPOSAL_NAME_1);
	});

	it('should be able to get the last 15 proposals that were lost', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		await GovernanceFacet.voteAgainst('1');

		await helpers.time.increase(24 * 60 * 60);

		await GovernanceFacet.endVoting('1');

		const lost = await GovernanceFacet.getLost();

		expect(await lost[0].name).to.equal(PROPOSAL_NAME_1);
	});

	it('should be able to get the last 15 proposals that ended in stalemate', async () => {
		const { GovernanceFacet, signer1 } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_1,
			PROPOSAL_DELAY_MINUITES_1,
			PROPOSAL_DELAY_HOURS_1,
			PROPOSAL_VOTING_DAYS_1
		);

		await GovernanceFacet.voteFor('1');

		await GovernanceFacet.connect(signer1).voteAgainst('1');

		await helpers.time.increase(24 * 60 * 60);

		await GovernanceFacet.endVoting('1');

		const stalemate = await GovernanceFacet.getStalemate();

		expect(await stalemate[0].name).to.equal(PROPOSAL_NAME_1);
	});

	it('should be able to start voting on a proposal', async () => {
		const { GovernanceFacet } = await loadFixture(GovernanceFixture);

		await GovernanceFacet.newProposal(
			PROPOSAL_NAME_2,
			PROPOSAL_DELAY_MINUITES_2,
			PROPOSAL_DELAY_HOURS_2,
			PROPOSAL_VOTING_DAYS_2
		);

		await helpers.time.increase(2 * 60 * 60);

		await GovernanceFacet.startVoting('1');

		const ongoing = await GovernanceFacet.getOngoing();

		expect(await ongoing[0].name).to.equal(PROPOSAL_NAME_2);
	});
});
