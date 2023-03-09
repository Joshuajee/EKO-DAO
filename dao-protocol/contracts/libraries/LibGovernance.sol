  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

  library LibGovernance {

      enum State{
          notStarted,
          ongoing,
          won,
          lost,
          stalemate,
          deleted
      }

    struct Proposal {
      string name; // the name of a particular proposal
      string description; //  the description containing detailed information on a proposal
      address author; // the address of the ekolance admin that creates the proposal
      uint id; // the Proposal ID of the propsosal
      uint creationTime; // the time at which a proposal is made
      uint votingDelay; // time before voting starts on a proposal that was created
      uint votingPeriod; // the time eligible voters would be able to vote on a proposal
      uint32 votesFor; // the votes in favour of a proposal
      uint32 votesAgainst; // the votes against a particular proposal
      uint16 minVotingTokenReq; // min amount of voting tokens required to vote 
      State state;
    }

    // An integer used to keep track of propsals
    struct Tracker {
      uint Proposal_Tracker;
      uint Minimum_Token_Requirement;
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

    
      bytes32 constant PROPOSAL_POSITION = keccak256("Proposal");
      bytes32 constant VOTER_POSITION = keccak256("Voter");
      bytes32 constant PROPOSAL_TRACKER = keccak256("proposal.tracker");
      bytes32 constant MAPPINGS = keccak256("mappings");
      bytes32 constant STATE_TRACKER = keccak256("mappings");
    

    function getProposalStruct() internal pure returns (Proposal storage ps) {
      bytes32 position = PROPOSAL_POSITION;

      assembly {
        ps.slot := position
      }
    }


    function getVoterStruct() internal pure returns (Voter storage vs) {
      bytes32 position = VOTER_POSITION;

      assembly {
        vs.slot := position
      }
    }

    function getProposalTracker() internal pure returns (Tracker storage pt) {
      bytes32 position = PROPOSAL_TRACKER;

      assembly {
        pt.slot := position
      }
    }

    function getMappingStruct() internal pure returns (Mappings storage mp) {
      bytes32 position = MAPPINGS;

      assembly {
        mp.slot := position
      }
    }


    // Events to be emiited on function calls
    event Minimum_Token_Requirement(
      uint indexed minTokenRequirement,
      address indexed setter
    );

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

    event Vote_For(
      address indexed Voter,
      uint Proposal_ID
    );

    event Vote_For_As_Delegate(
      address indexed delegator,
      address indexed voting_delegate,
      uint Proposal_ID
    );

    event Vote_Against(
      address indexed Voter,
      uint Proposal_ID
    );

    event Vote_Against_As_Delegate(
      address indexed delegator,
      address indexed voting_delegate,
      uint Proposal_ID
    );

    event Delete_Proposal(
      address indexed deleter,
      uint indexed Proposal_ID
    );
  }
