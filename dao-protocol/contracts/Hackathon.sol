// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {LibHackFund} from "./libraries/LibHackFund.sol";

interface IERC20{
   function transfer(address to, uint amount) external  returns (bool);   
   function balanceOf(address account) external view returns (uint);
   function symbol() external view returns (string memory);
   function decimals() external view returns (uint8);
   function transferFrom(address from, address to, uint amount) external returns (bool);
}

contract Hackathon{
   

   IERC20 Ekostable;
   IERC20 Scoretoken;
   bool init;

   // Events
   event newHackathon(
      LibHackFund.Hack hack
   );

   event hackathonInitialized(
      address _acceptedCurrency,
      address _scoretoken,
      LibHackFund.State hackathonState
   );

   event hackathonRegistration(
      address indexed participant
   );

   event hackathonFunded(
      address indexed funder,
      uint indexed amount
   );

   event hackathonStarted(
      LibHackFund.State hackathonState
   );

   event hackathonEnded(
      LibHackFund.State hackathonState
   );

   event hackathonPrizeWinners(
      address winner,
      address firstRunnerUp,
      address secondRunnerUp
   );
   
   event prizeWithdrawn(
      address prizeWinner,
      uint amountWithdrawn
   );

   event scoreTokenRefund(
      address indexed participant
   ); 

   //  Modifier to check requirements for registration


   modifier registrationRequirements(){
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      LibHackFund.HackathonMapping storage hackathonmapping = LibHackFund.getMapping();
      if (hack.state != LibHackFund.State.Admitting) revert NotAddmitting();
      if (hackathonmapping.registered[hack.id][msg.sender]) revert AlreadyRegistered();
      if (hack.numOfStudent == hack.maxNumAdmittable) revert MaxStudentNumber();
      _;
   }

   // A modifier that is used to ensure that a user can not input an empty strin
   function _noEmptiness(string memory str) private pure {
      if (bytes(str).length == 0) revert EmptyInput();
   }

   modifier noEmptiness(string memory str) {
      _noEmptiness(str);
      _;
   }

   // modifier to protect against address zero
   function _addressValidation(address adr) private pure {
      if (adr == address(0)) revert AddressZero();
   }

   modifier addressValidation(address adr) {
      _addressValidation(adr);
      _;
   }

   // Custom Errors
   error NotAddmitting();
   error InsufficientBalance();
   error AlreadyRegistered();
   error MaxStudentNumber();
   error EmptyInput();
   error AddressZero();
   error PercentageError();
   error ZeroInput();
   error InvalidDate();
   error UnsuccessfulTransfer();
   error HackathonEnded();
   error HackathonOngoing();
   error AlreadyWithdrawn();
   error NotPrizeWinner();
   error NotParticipant();
   error AlreadyInitialized();
   error StartDateNotReached();



   constructor(
      uint _id,
      address _author,
      string memory _name,
      string memory _description, 
      uint _startDate,
      uint _endDate, 
      uint16 _maxNumAdmittable, 
      uint8 _winnerPercentage, 
      uint8 _firstRunnerUpPercentage, 
      uint8 _secondRunnerUpPercentage,
      uint _minScoreTokenRequiurement
      ) noEmptiness(_name) noEmptiness(_description) {

      LibHackFund.Hack storage hack = LibHackFund.getHack();
      
      if (_id == 0) revert ZeroInput();
     
      if ((_winnerPercentage + _firstRunnerUpPercentage + _secondRunnerUpPercentage != 100) || 

      (_winnerPercentage < _firstRunnerUpPercentage) || (_firstRunnerUpPercentage < _secondRunnerUpPercentage)) revert PercentageError();

      if (_startDate == 0 || _endDate == 0 || _maxNumAdmittable ==0 ) revert ZeroInput();

      if (_author == address(0)) revert AddressZero();

      if (_startDate <= block.timestamp || _startDate >= _endDate) revert InvalidDate();
     
   
      hack.id = _id;
      hack.hackathonAddress = address(this);
      hack.author = _author;
      hack.name = _name;
      hack.description = _description;
      hack.startDate = _startDate;
      hack.endDate = _endDate;
      hack.maxNumAdmittable = _maxNumAdmittable;
      hack.numOfStudent = 0;
      hack.winner = address(0);
      hack.firstRunnerUp = address(0);
      hack.secondRunnerUp = address(0);
      hack.winnerPercentage = _winnerPercentage;
      hack.firstRunnerUpPercentage = _firstRunnerUpPercentage;
      hack.secondRunnerUpPercentage = _secondRunnerUpPercentage;
      hack.funding = 0;
      hack.minScoreTokenRequired = _minScoreTokenRequiurement;
      hack.state = LibHackFund.State.Uninitialized;
      emit newHackathon(hack);
   }


   function initializeHackathon(
      address _acceptedCurrency,
      address _scoretoken
      ) addressValidation(_acceptedCurrency) addressValidation(_scoretoken) external {
         LibHackFund.Hack storage hack = LibHackFund.getHack();
         if (init) revert AlreadyInitialized();
         init = true;
         Ekostable = IERC20(_acceptedCurrency) ;
         Scoretoken = IERC20(_scoretoken);
         hack.state = LibHackFund.State.Admitting;
         emit hackathonInitialized(_acceptedCurrency, _scoretoken, hack.state);
   }

   
   function register(address _participant) registrationRequirements() addressValidation(_participant)  external {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      LibHackFund.HackathonMapping storage hackathonmapping = LibHackFund.getMapping();
      uint amount = hack.minScoreTokenRequired;
      bool success = Scoretoken.transferFrom(_participant ,address(this), amount);
      if(!success) revert UnsuccessfulTransfer();
      hackathonmapping.registered[hack.id][_participant] = true;
      hack.numOfStudent += 1;
      emit hackathonRegistration(_participant);
   }


   function getHackathon() external pure returns(LibHackFund.Hack memory) { 
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      return hack;
   }

   function isParticipant(address participant) addressValidation(participant) external view returns (bool) {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      LibHackFund.HackathonMapping storage hackathonmapping = LibHackFund.getMapping();
      return hackathonmapping.registered[hack.id][participant]; 
   }


   function fundHackathon(uint _amount, address _funder) addressValidation(_funder) external {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      if (hack.state == LibHackFund.State.Ended) revert HackathonEnded();
      uint amount = _amount; 
      bool success = Ekostable.transferFrom(_funder, address(this), amount);
      if(!success) revert UnsuccessfulTransfer();
      hack.funding += _amount;
      emit hackathonFunded(_funder, _amount);
   }


   function startHackathon() external {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      if (hack.state == LibHackFund.State.Ended) revert HackathonEnded();
      if (hack.startDate > block.timestamp) revert StartDateNotReached();
      hack.state = LibHackFund.State.Ongoing;
      emit hackathonStarted(hack.state);
   }


   function endHackathon() external {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      if (hack.endDate > block.timestamp) revert HackathonOngoing();
      hack.state = LibHackFund.State.Ended;
      emit hackathonEnded(hack.state);
   }

   function setPrizeWinners(
      address _winner,
      address _firstRunnerUp,
      address _secondRunnerUp
      ) external {
         LibHackFund.Hack storage hack = LibHackFund.getHack();
         LibHackFund.HackathonMapping storage hackathonmapping = LibHackFund.getMapping();
         if (hack.state != LibHackFund.State.Ended) revert HackathonOngoing();
         if(hackathonmapping.winnerWithdrawn[hack.id]) revert AlreadyWithdrawn();
         if(hackathonmapping.firstRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();
         if(hackathonmapping.secondRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn(); 
         hack.winner = _winner;
         hackathonmapping.isWinner[hack.id][_winner] = true;
         hack.firstRunnerUp = _firstRunnerUp;
         hackathonmapping.isWinner[hack.id][_firstRunnerUp] = true;
         hack.secondRunnerUp = _secondRunnerUp;
         hackathonmapping.isWinner[hack.id][_secondRunnerUp] = true;
         emit hackathonPrizeWinners(_winner, _firstRunnerUp, _secondRunnerUp);
      }

   function refundScoreTokens(address _participant) addressValidation(_participant) external {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      LibHackFund.HackathonMapping storage hackathonmapping = LibHackFund.getMapping();
      if (hack.state != LibHackFund.State.Ended) revert HackathonOngoing();
      if(hackathonmapping.scoreTokenRefund[hack.id][_participant]) revert AlreadyWithdrawn();
      if (hackathonmapping.registered[hack.id][_participant]) revert NotParticipant();
      hackathonmapping.scoreTokenRefund[hack.id][_participant] = true;
      uint amount = hack.minScoreTokenRequired;
      bool success = Scoretoken.transferFrom(address(this), _participant, amount);
      if(!success) revert UnsuccessfulTransfer();
      emit scoreTokenRefund(_participant);
   }


   function prizeWithdrawal(address _prizeWinner) addressValidation(_prizeWinner) external {
      LibHackFund.Hack storage hack = LibHackFund.getHack();
      LibHackFund.HackathonMapping storage hackathonmapping = LibHackFund.getMapping();
      if (hackathonmapping.isWinner[hack.id][_prizeWinner]) {
         if(hackathonmapping.winnerWithdrawn[hack.id]) revert AlreadyWithdrawn();
         uint _amount = hack.funding;
         uint amount = (hack.winnerPercentage * _amount) / 100;
         hackathonmapping.winnerWithdrawn[hack.id] = true;
         bool success = Ekostable.transferFrom(address(this), _prizeWinner, amount);
         if(!success) revert UnsuccessfulTransfer();
         emit prizeWithdrawn(_prizeWinner, amount);
      }else if (hackathonmapping.isFirstRunnerUp[hack.id][_prizeWinner]){
         if(hackathonmapping.firstRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();
         uint _amount = hack.funding;
         uint amount = (hack.firstRunnerUpPercentage * _amount) / 100;
         hackathonmapping.firstRunnerUpWithdrawn[hack.id] = true;
         bool success = Ekostable.transferFrom(address(this), _prizeWinner, amount);
         if(!success) revert UnsuccessfulTransfer();
         emit prizeWithdrawn(_prizeWinner, amount);
      }else if (hackathonmapping.isSecondRunnerUp[hack.id][_prizeWinner]){
         if(hackathonmapping.secondRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();
         uint _amount = hack.funding;
         uint amount = (hack.secondRunnerUpPercentage * _amount) / 100;
         hackathonmapping.secondRunnerUpWithdrawn[hack.id] = true;
         bool success = Ekostable.transferFrom(address(this), _prizeWinner, amount);
         if(!success) revert UnsuccessfulTransfer();
         emit prizeWithdrawn(_prizeWinner, amount);
      }else{
         revert NotPrizeWinner();
      }
   }
    
}
