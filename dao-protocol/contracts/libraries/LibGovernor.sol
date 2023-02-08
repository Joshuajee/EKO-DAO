// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

library LibGovernor {
  struct Proposal {
    string name; // the name of a particular proposal
    address author; // the address of the ekolance admin that creates the proposal
    uint creationTime; // the time at which a proposal is made
    uint votingDelay; // time before voting starts on a proposal that was created
    uint votingPeriod; // the time eligible voters would be able to vote on a proposal
    uint votesFor; // the votes in favour of a proposal
    uint votesAgainst; // the votes against a particular proposal
    // Would need a chainlink integration
    // bool proposalState; // False for failed proposals and true for passed proposals
  }

  function getProposalStruct() internal pure returns (Proposal storage ps) {
    bytes32 PROPOSAL_POSITION = keccak256("Proposal");
    bytes32 position = PROPOSAL_POSITION;
    assembly {
      ps.slot := position
    }
  }

  function getVoterStruct() internal pure returns (Voter storage vs) {
    bytes32 VOTER_POSITION = keccak256("Voter");
    bytes32 position = VOTER_POSITION;
    assembly {
      vs.slot := position
    }
  }

  // An integer used to keep track of propsals
  struct Tracker {
    uint Proposal_Tracker;
  }

  function getProposalTracker() internal pure returns (Tracker storage pt) {
    bytes32 PROPOSAL_TRACKER = keccak256("proposal.tracker");
    bytes32 position = PROPOSAL_TRACKER;
    assembly {
      pt.slot := position
    }
  }

  // Voter Struct contains boolean to keep track of users that vote on a proposal
  struct Voter {
    bool voted;
  }

  // A mapping is used to store the proposals
  struct Mappings {
    mapping(uint => Proposal) proposal;
    mapping(uint => mapping(address => Voter)) proposalVoter;
    mapping(uint => mapping(address => address)) votingDelegate;
  }

  function getMappingStruct() internal pure returns (Mappings storage mp) {
    bytes32 MAPPINGS = keccak256("mappings");
    bytes32 position = MAPPINGS;
    assembly {
      mp.slot := position
    }
  }

  // Setting the voting delay of any proposal to 3 hrs ~ 900 blocks ~ 10800 seconds
  // Voting Delay is the time between the creation of a proposal and the time before voting starts
  uint public constant VOTING_DELAY = 10800;

  // Setting the voting period of any proposal to 1 WEEK ~ 50400 blocks ~ 604800 seconds
  // Voting period is the period of time allocated to voting on a proposal
  uint public constant VOTING_PERIOD = 604800;

  // The minimum amount of Ekotokens required to vote
  uint public constant MINIMUM_TOKEN_REQUIREMENT = 100000000000000000000;

  // Events to be emiited on function calls
  event New_Proposal(
    address indexed author,
    Proposal indexed proposal,
    uint indexed Proposal_ID
  );
  event Add_Delegate(
    address indexed delegator,
    address indexed delegate,
    uint indexed Proposal_ID
  );
  event Remove_Delegate(
    address indexed delegator,
    address indexed delegate,
    uint indexed Proposal_ID
  );
  event Vote_For(address indexed Voter, uint Proposal_ID);
  event Vote_For_As_Delegate(
    address indexed delegator,
    address indexed voting_delegate,
    uint Proposal_ID
  );
  event Vote_Against(address indexed Voter, uint Proposal_ID);
  event Vote_Against_As_Delegate(
    address indexed delegator,
    address indexed voting_delegate,
    uint Proposal_ID
  );
  event Delete_Proposal(address indexed deleter, uint indexed Proposal_ID);
}
