// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../libraries/LibGovernance.sol";

contract GovernanceFacet {
  IERC20 Ekotoken;
  bool init = false;

  // Modifier to ensure that user inputs an existing Proposal_ID
  modifier existingId(uint Proposal_ID) {
    LibGovernance.Tracker storage pt = LibGovernance.getProposalTracker();
    if (!(Proposal_ID <= pt.Proposal_Tracker || Proposal_ID > 0)) {
      revert("Invalid");
    } else {
      _;
    }
  }

  // A modifier that is used to ensure that a user can not input an empty string
  modifier noEmptiness(string memory name) {
    string memory a = "";
    if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(a))) {
      revert("Can't be empty");
    } else {
      _;
    }
  }

  // modifier to protect against address zero
  modifier addressValidation(address a) {
    if (a == address(0)) {
      revert("Invalid address");
    } else {
      _;
    }
  }

  // modifier to ensure the voter has enough Eko Stables to vote .
  modifier enoughEkoStables(address a) {
    if (Ekotoken.balanceOf(a) < LibGovernance.MINIMUM_TOKEN_REQUIREMENT) {
      revert("Insufficient Balance");
    } else {
      _;
    }
  }

  //Ekotoken contract address is passed on Governance contract initialization
  function intializeGovernance(
    address _token
  ) public addressValidation(_token) {
    if (init) revert("Already Initialized");
    Ekotoken = IERC20(_token);
    init = true;
  }

  // fucntion to create a new voting Proposal by Ekolance Admins.
  function newProposal(string calldata _name) external noEmptiness(_name) {
    LibGovernance.Tracker storage pt = LibGovernance.getProposalTracker();
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    LibGovernance.Proposal memory _newProposal = LibGovernance.Proposal({
      name: _name,
      author: msg.sender,
      creationTime: block.timestamp,
      votingDelay: LibGovernance.VOTING_DELAY + block.timestamp,
      votingPeriod: LibGovernance.VOTING_DELAY +
        LibGovernance.VOTING_PERIOD +
        block.timestamp,
      votesFor: 0,
      votesAgainst: 0
      //   Bool state would need a chainlink integration.
      //   proposalState: false
    });
    pt.Proposal_Tracker += 1;
    uint Proposal_ID = pt.Proposal_Tracker;
    mp.proposal[Proposal_ID] = _newProposal;
    emit LibGovernance.New_Proposal(msg.sender, _newProposal, Proposal_ID);
  }

  // function to view an existing proposal
  function viewProposal(
    uint Proposal_ID
  )
    external
    view
    existingId(Proposal_ID)
    returns (LibGovernance.Proposal memory)
  {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    return mp.proposal[Proposal_ID];
  }

  // function to get the number of existing proposals
  function getNumberOfProposals() external view returns (uint) {
    LibGovernance.Tracker storage pt = LibGovernance.getProposalTracker();
    return pt.Proposal_Tracker;
  }

  // function to delegate voting power for a particular proposal
  function addVotingDelegate(
    uint Proposal_ID,
    address _delegate
  ) external existingId(Proposal_ID) addressValidation(_delegate) {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    mp.votingDelegate[Proposal_ID][msg.sender] = _delegate;
    emit LibGovernance.Add_Delegate(msg.sender, _delegate, Proposal_ID);
  }

  // function to view the delegate of an address on a particular proposal
  function viewDelegate(
    uint Proposal_ID,
    address _delegate
  )
    external
    view
    existingId(Proposal_ID)
    addressValidation(_delegate)
    returns (address)
  {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    return mp.votingDelegate[Proposal_ID][_delegate];
  }

  // function to remove voting delegate
  function removeDelegate(uint Proposal_ID) external existingId(Proposal_ID) {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    address _delegate = mp.votingDelegate[Proposal_ID][msg.sender];
    delete mp.votingDelegate[Proposal_ID][msg.sender];
    emit LibGovernance.Remove_Delegate(msg.sender, _delegate, Proposal_ID);
  }

  // function to vote on a proposal
  function voteFor(
    uint Proposal_ID
  ) external existingId(Proposal_ID) enoughEkoStables(msg.sender) {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    if (
      (mp.proposal[Proposal_ID].votingDelay >= block.timestamp) ||
      (mp.proposal[Proposal_ID].votingPeriod <= block.timestamp) ||
      (mp.proposalVoter[Proposal_ID][msg.sender].voted)
    ) revert("Can't Vote");
    mp.proposalVoter[Proposal_ID][msg.sender].voted = true;
    mp.proposal[Proposal_ID].votesFor += 1;
    emit LibGovernance.Vote_For(msg.sender, Proposal_ID);
  }

  // 3 >= 1
  // function to vote for a proposal as delegate.
  function voteForAsDelegate(
    uint Proposal_ID,
    address delegator
  )
    external
    existingId(Proposal_ID)
    enoughEkoStables(delegator)
    addressValidation(delegator)
  {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    if (
      (mp.proposal[Proposal_ID].votingDelay >= block.timestamp) ||
      (mp.proposal[Proposal_ID].votingPeriod <= block.timestamp) ||
      (mp.proposalVoter[Proposal_ID][delegator].voted) ||
      (mp.votingDelegate[Proposal_ID][delegator] != msg.sender)
    ) revert("Can't Vote");
    mp.proposalVoter[Proposal_ID][delegator].voted = true;
    mp.proposal[Proposal_ID].votesFor += 1;
    emit LibGovernance.Vote_For_As_Delegate(delegator, msg.sender, Proposal_ID);
  }

  // function to vote against a proposal
  function voteAgainst(
    uint Proposal_ID
  ) external existingId(Proposal_ID) enoughEkoStables(msg.sender) {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    if (
      (mp.proposal[Proposal_ID].votingDelay >= block.timestamp) ||
      (mp.proposal[Proposal_ID].votingPeriod <= block.timestamp) ||
      (mp.proposalVoter[Proposal_ID][msg.sender].voted)
    ) revert("Can't Vote");
    mp.proposalVoter[Proposal_ID][msg.sender].voted = true;
    mp.proposal[Proposal_ID].votesAgainst += 1;
    emit LibGovernance.Vote_Against(msg.sender, Proposal_ID);
  }

  // function to vote against on a proposal as delegate.
  function voteAgainstAsDelegate(
    uint Proposal_ID,
    address delegator
  )
    external
    existingId(Proposal_ID)
    enoughEkoStables(delegator)
    addressValidation(delegator)
  {
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    if (
      (mp.proposal[Proposal_ID].votingDelay >= block.timestamp) ||
      (mp.proposal[Proposal_ID].votingPeriod <= block.timestamp) ||
      (mp.proposalVoter[Proposal_ID][delegator].voted) ||
      (mp.votingDelegate[Proposal_ID][delegator] != msg.sender)
    ) revert("Can't Vote");
    mp.proposalVoter[Proposal_ID][delegator].voted = true;
    mp.proposal[Proposal_ID].votesAgainst += 1;
    emit LibGovernance.Vote_Against_As_Delegate(
      delegator,
      msg.sender,
      Proposal_ID
    );
  }

  // function to delete the last proposal that has been created.
  function deleteProposal() external {
    // require function caller is an ekolance admin
    LibGovernance.Tracker storage pt = LibGovernance.getProposalTracker();
    LibGovernance.Mappings storage mp = LibGovernance.getMappingStruct();
    uint Proposal_ID = pt.Proposal_Tracker;
    if (
      (mp.proposal[Proposal_ID].votingDelay < block.timestamp) ||
      (Proposal_ID < 0)
    ) revert("Can't delete");
    pt.Proposal_Tracker -= 1;
    delete mp.proposal[Proposal_ID];
    emit LibGovernance.Delete_Proposal(msg.sender, Proposal_ID);
  }
}
