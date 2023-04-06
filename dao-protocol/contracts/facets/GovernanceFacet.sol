// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../libraries/LibGovernance.sol";

contract GovernanceFacet {
  ERC20 Ekotoken;
  bool init = false;

  // Custom errors
  error EmptyInput();
  error InvalidProposal();
  error InvalidAddress();
  error ZeroInput();
  error InsufficientBalance();
  error InvalidCountInput();
  error AlreadyInitialized();
  error VotingPeriodOver();
  error VotingNotStarted();
  error AlreadyVoted();
  error CallerNotDelegate();
  error StartLessThanCount();

  // Modifier to ensure that user inputs an existing Proposal_ID

  function _existingId(uint Proposal_ID) private view {
    if (Proposal_ID > LibGovernance.getProposalTracker().Proposal_Tracker || Proposal_ID < 0) 
    revert InvalidProposal();
  }

  modifier existingId(uint Proposal_ID) {
    _existingId(Proposal_ID);
    _;
  }

  // A modifier that is used to ensure that a user can not input an empty string

  function _noEmptiness(string memory name) private pure {
    if (bytes(name).length == 0) revert EmptyInput();
  } 

  modifier noEmptiness(string memory name) {
    _noEmptiness(name);
    _;
  }

  // modifier to protect against address zero

  function _addressValidation(address a) private pure {
    if (a == address(0)) revert InvalidAddress();

  }

  modifier addressValidation(address a) {
    _addressValidation(a);
    _;
  }

  // modifier to ensure minimum token requirement is not zero

  function _notZero (uint a) private pure{
    if (a == 0) revert ZeroInput();
  }

  modifier notZero (uint a) {
    _notZero(a);
    _;
  }

  // modifier to ensure the voter has enough Eko Stables to vote .
  function _enoughEkoStables(address a, uint Proposal_ID) private view {
    if (Ekotoken.balanceOf(a) < LibGovernance.getMappingStruct().proposal[Proposal_ID].minVotingTokenReq * (10 ** Ekotoken.decimals()))
     revert InsufficientBalance();
  }

  modifier enoughEkoStables(address a, uint Proposal_ID) {
    _enoughEkoStables(a, Proposal_ID);
    _;
  }

  // modifier to check the user max count input

  function _minmaxcount(uint a) private pure {
    if (a > 50 || a == 0) revert InvalidCountInput();
  }

  modifier minmaxcount(uint a){
    _minmaxcount(a);
     _ ;
  }

  //Ekotoken contract address is passed on Governance contract initialization
  function intializeGovernance(
    address _token
  ) public addressValidation(_token) {
    if (init) revert AlreadyInitialized();
    Ekotoken = ERC20(_token);
    init = true;
  }

  // fucntion to create a new voting Proposal by Ekolance Admins.
  function newProposal(
    string calldata _name,
    string calldata _description,
    uint _delay,
    uint _votingDuration,
    uint _minVotingTokenReq
    ) external noEmptiness(_name) noEmptiness(_description) notZero(_votingDuration){
    LibGovernance.getProposalTracker().Proposal_Tracker += 1;
    uint Proposal_ID = LibGovernance.getProposalTracker().Proposal_Tracker;
    LibGovernance.Proposal memory _newProposal = LibGovernance.Proposal({
      name: _name,
      description: _description,
      author: msg.sender,
      id: Proposal_ID,
      creationTime: block.timestamp,
      votingDelay: block.timestamp + _delay,
      votingPeriod: block.timestamp + _delay + _votingDuration,
      votesFor: 0,
      votesAgainst: 0,
      minVotingTokenReq: _minVotingTokenReq,
      state : LibGovernance.State.notStarted
    });
    if (_newProposal.votingDelay <= block.timestamp){
      _newProposal.state = LibGovernance.State.ongoing;
    }else{
    }
    LibGovernance.getMappingStruct().proposal[Proposal_ID] = _newProposal;     
    emit LibGovernance.New_Proposal(msg.sender, _newProposal, Proposal_ID);
  }

  // function to view an existing proposal
  function viewProposal(
    uint Proposal_ID
  )external view existingId(Proposal_ID) returns (LibGovernance.Proposal memory){
    return LibGovernance.getMappingStruct().proposal[Proposal_ID];
  }

  // function to get the number of existing proposals
  function getNumberOfProposals() external view returns (uint) {
    return LibGovernance.getProposalTracker().Proposal_Tracker;
  }

  // function to delegate voting power for a particular proposal
  function addVotingDelegate(
    uint Proposal_ID,
    address _delegate
  ) external existingId(Proposal_ID) addressValidation(_delegate) {
    LibGovernance.getMappingStruct().votingDelegate[Proposal_ID][msg.sender] = _delegate;
    emit LibGovernance.Add_Delegate(msg.sender, _delegate, Proposal_ID);
  }

  // function to view the delegate of an address on a particular proposal
  function viewDelegate(
    uint Proposal_ID,
    address _delegate
  ) external view existingId(Proposal_ID) addressValidation(_delegate) returns (address) {
    return LibGovernance.getMappingStruct().votingDelegate[Proposal_ID][_delegate];
  }

  // function to remove voting delegate
  function removeDelegate(uint Proposal_ID) external existingId(Proposal_ID) {
    address _delegate = LibGovernance.getMappingStruct().votingDelegate[Proposal_ID][msg.sender];
    delete LibGovernance.getMappingStruct().votingDelegate[Proposal_ID][msg.sender];
    emit LibGovernance.Remove_Delegate(msg.sender, _delegate, Proposal_ID);
  }

  // function to vote on a proposal
  function voteFor(
    uint Proposal_ID
  ) external existingId(Proposal_ID) enoughEkoStables(msg.sender, Proposal_ID) {
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.won ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.lost ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.stalemate ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.deleted){
      revert VotingPeriodOver();
    }
    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].votingDelay >= block.timestamp){
      revert VotingNotStarted();
    } else if (LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][msg.sender].voted){
      revert AlreadyVoted();
    }
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].votingPeriod <= block.timestamp){
      endVoting(Proposal_ID);
    }else{
    LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][msg.sender].voted = true;
    LibGovernance.getMappingStruct().proposal[Proposal_ID].votesFor += 1;

    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].state != LibGovernance.State.ongoing){
      startVoting(Proposal_ID);
    }
    emit LibGovernance.Vote_For(msg.sender, Proposal_ID);
    }
  }
  
  // function to vote for a proposal as delegate.
  function voteForAsDelegate(
    uint Proposal_ID,
    address delegator
  )
    external
    existingId(Proposal_ID)
    enoughEkoStables(delegator, Proposal_ID)
    addressValidation(delegator)
  {
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.won ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.lost ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.stalemate ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.deleted){
      revert VotingPeriodOver();
    }
    if (
      (LibGovernance.getMappingStruct().proposal[Proposal_ID].votingDelay >= block.timestamp) ||
      (LibGovernance.getMappingStruct().votingDelegate[Proposal_ID][delegator] != msg.sender)
      ){
      revert CallerNotDelegate();
    } else if (LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][delegator].voted){
      revert AlreadyVoted();
    }
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].votingPeriod <= block.timestamp){
      endVoting(Proposal_ID);
    }else{
    LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][delegator].voted = true;
    LibGovernance.getMappingStruct().proposal[Proposal_ID].votesFor += 1;

    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].state != LibGovernance.State.ongoing){
      startVoting(Proposal_ID);
    }
    emit LibGovernance.Vote_For_As_Delegate(delegator, msg.sender, Proposal_ID);
    }
  }

  // function to vote against a proposal
  function voteAgainst(
    uint Proposal_ID
  ) external existingId(Proposal_ID) enoughEkoStables(msg.sender, Proposal_ID) {
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.won ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.lost ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.stalemate ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.deleted){
      revert VotingPeriodOver();
    }
    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].votingDelay >= block.timestamp){
      revert VotingNotStarted();
    } else if (LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][msg.sender].voted){
      revert AlreadyVoted();
    }
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].votingPeriod <= block.timestamp){
      endVoting(Proposal_ID);
    }else{
    LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][msg.sender].voted = true;
    LibGovernance.getMappingStruct().proposal[Proposal_ID].votesAgainst += 1;

    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].state != LibGovernance.State.ongoing){
      startVoting(Proposal_ID);
    }
    emit LibGovernance.Vote_Against(msg.sender, Proposal_ID);
    }
  }

  // function to vote against on a proposal as delegate.
  function voteAgainstAsDelegate(
    uint Proposal_ID,
    address delegator
  ) external existingId(Proposal_ID) enoughEkoStables(delegator, Proposal_ID) addressValidation(delegator)
  {
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.won ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.lost ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.stalemate ||
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state == LibGovernance.State.deleted){
      revert VotingPeriodOver();
    }
    if (
      (LibGovernance.getMappingStruct().proposal[Proposal_ID].votingDelay >= block.timestamp) ||
      (LibGovernance.getMappingStruct().votingDelegate[Proposal_ID][delegator] != msg.sender)
      ){
      revert CallerNotDelegate();
    } else if (LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][delegator].voted){
      revert VotingPeriodOver();
    }
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].votingPeriod <= block.timestamp){
      endVoting(Proposal_ID);
    }else{
    LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][delegator].voted = true;
    LibGovernance.getMappingStruct().proposal[Proposal_ID].votesAgainst += 1;

    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].state != LibGovernance.State.ongoing){
      startVoting(Proposal_ID);
    } 
    emit LibGovernance.Vote_For_As_Delegate(delegator, msg.sender, Proposal_ID);
    }
  }

  // function to check if the caller has voted on a particular proposal
  function checkIfVoted(
    uint Proposal_ID,
    address voter
  ) external existingId(Proposal_ID) addressValidation(voter) view returns(bool) {
    return LibGovernance.getMappingStruct().proposalVoter[Proposal_ID][voter].voted;
  }

  // function to delete the last proposal that has been created.
  function deleteProposal(
    uint Proposal_ID
  ) external existingId(Proposal_ID) {
    if (LibGovernance.getMappingStruct().proposal[Proposal_ID].votingDelay < block.timestamp) revert("Can't delete");
    delete LibGovernance.getMappingStruct().proposal[Proposal_ID];
    LibGovernance.getMappingStruct().proposal[Proposal_ID].state = LibGovernance.State.deleted;
    emit LibGovernance.Delete_Proposal(msg.sender, Proposal_ID);
  }

  function getNumberOfNotStarted(
    uint start,
    uint count
  ) minmaxcount(count) existingId(start) private view returns(uint) {

    uint counter = start - count;
    uint count1;
    for (uint i= start; i > counter ;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.notStarted){
        count1++;
      }else{
        continue;
      }
    }
    return count1;
  }
  function getNumberOfOngoing(
    uint start,
    uint count
  ) minmaxcount(count) existingId(start) private view returns(uint) {

    uint counter = start - count;
    uint count1;
    for (uint i= start; i > counter ;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.ongoing){
        count1++;
      }else{
        continue;
      }
    }
    return count1;
  }
  function getNumberOfWon(
    uint start,
    uint count
  ) minmaxcount(count) existingId(start) private view returns(uint) {

    uint counter = start - count;
    uint count1;
    for (uint i= start; i > counter ;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.won){
        count1++;
      }else{
        continue;
      }
    }
    return count1;
  }
  function getNumberOfLost(
    uint start,
    uint count
  ) minmaxcount(count) existingId(start) private view returns(uint) {

    uint counter = start - count;
    uint count1;
    for (uint i= start; i > counter ;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.lost){
        count1++;
      }else{
        continue;
      }
    }
    return count1;
  }
  function getNumberOfStalemate(
    uint start,
    uint count
  ) minmaxcount(count) existingId(start) private view returns(uint) {

    uint counter = start - count;
    uint count1;
    for (uint i= start; i > counter ;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.stalemate){
        count1++;
      }else{
        continue;
      }
    }
    return count1;
  }
  
  // returns proposals within a specified range.
  function getProposals(
    uint start, 
    uint count
    ) external minmaxcount(count) existingId(start) view returns(LibGovernance.Proposal[] memory ){
      if(start < count ){
        revert StartLessThanCount();
      }

    uint counter = start - count;

    LibGovernance.Proposal[] memory Proposals = new LibGovernance.Proposal[](count);

    uint count2;
    for (uint i= start; i > counter;i--){
      Proposals[count2] = LibGovernance.getMappingStruct().proposal[i];
      count2++;
      continue;
    }
    return Proposals;
  }

  // returns proposals that have not started within a sepcified range
  function getNotStarted(
    uint start, 
    uint count
    ) external minmaxcount(count) existingId(start) view returns(LibGovernance.Proposal[] memory ){
      if(start < count ){
        revert StartLessThanCount();
      }
    
    LibGovernance.Proposal[] memory Not_Started = new LibGovernance.Proposal[](getNumberOfNotStarted(start,count));

    uint counter = start - count;
    uint count2;
    for (uint i= start; i > counter;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.notStarted){
        Not_Started[count2] = LibGovernance.getMappingStruct().proposal[i];
        count2++;
        continue;
      }
    }
    return Not_Started;
  }
  
  // returns proposals that are ongoing within a soecified range
  function getOngoing(
    uint start, 
    uint count
    ) external minmaxcount(count) existingId(start) view returns(LibGovernance.Proposal[] memory ){
      if(start < count ){
        revert StartLessThanCount();
      }
    
    LibGovernance.Proposal[] memory Ongoing = new LibGovernance.Proposal[](getNumberOfOngoing(start,count));

    uint counter = start - count;
    uint count2;
    for (uint i= start; i > counter;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.ongoing){
        Ongoing[count2] = LibGovernance.getMappingStruct().proposal[i];
        count2++;
        continue;
      }
    }
    return Ongoing;
  }

  // returns proposals that have finshed and are won within a specified range
  function getWon(
    uint start, 
    uint count
    ) external minmaxcount(count) existingId(start) view returns(LibGovernance.Proposal[] memory ){
      if(start < count ){
        revert StartLessThanCount();
      }

    
    LibGovernance.Proposal[] memory Won = new LibGovernance.Proposal[](getNumberOfWon(start,count));

    uint counter = start - count;
    uint count2;
    for (uint i= start; i > counter;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.won){
        Won[count2] = LibGovernance.getMappingStruct().proposal[i];
        count2++;
        continue;
      }
    }
    return Won;
  }

  // returns proposals that have finshed and are lost within a specified range
  function getLost(
    uint start, 
    uint count
    ) external minmaxcount(count) existingId(start) view returns(LibGovernance.Proposal[] memory ){
      if(start < count ){
        revert StartLessThanCount();
      }
    
    LibGovernance.Proposal[] memory Lost = new LibGovernance.Proposal[](getNumberOfLost(start,count)); 

    uint counter = start - count;
    uint count2;
    for (uint i= start; i > counter;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.lost){
        Lost[count2] = LibGovernance.getMappingStruct().proposal[i];
        count2++;
        continue;
      }
    }
    return Lost;
  }

  // returns proposals that have finshed and ended as a stalemate within a specified range
  function getStalemate(
    uint start, 
    uint count
    ) external minmaxcount(count) existingId(start) view returns(LibGovernance.Proposal[] memory ){
      if(start < count ){
        revert StartLessThanCount();
      }
    
    LibGovernance.Proposal[] memory Stalemate = new LibGovernance.Proposal[](getNumberOfStalemate(start,count));

    uint counter = start - count;
    uint count2;
    for (uint i= start; i > counter;i--){
      if (LibGovernance.getMappingStruct().proposal[i].state == LibGovernance.State.stalemate){
        Stalemate[count2] = LibGovernance.getMappingStruct().proposal[i];
        count2++;
        continue;
      }
    }
    return Stalemate;
  }

  // function to start voting on a proposal
  function startVoting(
    uint Proposal_ID
  ) public existingId(Proposal_ID) {
      if (LibGovernance.getMappingStruct().proposal[Proposal_ID].votingDelay <= block.timestamp){ 
        LibGovernance.getMappingStruct().proposal[Proposal_ID].state = LibGovernance.State.ongoing;
      }
    }

  // function to endvoting
  function endVoting(
    uint Proposal_ID
  ) public existingId(Proposal_ID) {
    if(LibGovernance.getMappingStruct().proposal[Proposal_ID].votingPeriod <= block.timestamp){
      if(LibGovernance.getMappingStruct().proposal[Proposal_ID].votesFor > LibGovernance.getMappingStruct().proposal[Proposal_ID].votesAgainst){
        LibGovernance.getMappingStruct().proposal[Proposal_ID].state = LibGovernance.State.won;
        }else if (LibGovernance.getMappingStruct().proposal[Proposal_ID].votesFor < LibGovernance.getMappingStruct().proposal[Proposal_ID].votesAgainst){
          LibGovernance.getMappingStruct().proposal[Proposal_ID].state = LibGovernance.State.lost;
        }else if (LibGovernance.getMappingStruct().proposal[Proposal_ID].votesFor == LibGovernance.getMappingStruct().proposal[Proposal_ID].votesAgainst){
          LibGovernance.getMappingStruct().proposal[Proposal_ID].state = LibGovernance.State.stalemate;
        }
    }
  }

  
}