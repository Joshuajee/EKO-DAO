//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.17;


import "./libraries/LibHackFund.sol";

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
   LibHackFund.Hack hack;
   LibHackFund.HackathonMapping hackathonmapping;
   LibHackFund.HackathonsTracker hackTracker;
   bool init = false;

   

      //  Modifier to check requirements for registration
   modifier registrationRequirements(){
      if (hack.state != State.Admitting) revert NotAddmitting();
      if (hackathonmapping.registered[hack.id][msg.sender]) revert AlreadyRegistered();
      if (hack.numOfStudent == hack.maxNumAdmittable) revert MaxStudentNumber();
      _;
   }


   function _noEmptiness(string memory str) private pure {
      if (bytes(str).length == 0) revert EmptyInput();
   }

   // A modifier that is used to ensure that a user can not input an empty string
   modifier noEmptiness(string memory str) {
      _noEmptiness(str);
      _;
   }

   function _addressValidation(address adr) private pure {
      if (adr == address(0)) revert AddressZero();
   }
   // modifier to protect against address zero
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
   error NotWinner();
   error NotFirstRunnerUp();
   error NotSecondRunnerUp();
   error HackathonNotFound();
   error NotParticipant();
   error AlreadyInitialized();



   constructor(
      uint _id,
      address _author,
      string memory _name,
      string memory _description, 
      uint _startDate,
      uint _endDate, 
      uint16 _maxNumAdmittable, 
      uint _winnerPercentage, 
      uint _firstRunnerUpPercentage, 
      uint _secondRunnerUpPercentage,
      uint _minScoreTokenRequiurement
      ) noEmptiness(_name) noEmptiness(_description) {
      
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
      hack.state = State.Uninitialized;
   }


   function initializeHackathon(
      IERC20 _acceptedCurrency,
      IERC20 _scoretoken
      ) /*addressValidation(_acceptedCurrency) addressValidation(_scoretoken)*/ external {
         if (init) revert AlreadyInitialized();
         init = true;
         Ekostable = _acceptedCurrency;
         Scoretoken = _scoretoken;
         hack.state = State.Admitting;
   }

   
   function register() registrationRequirements()  external {
      uint amount = hack.minScoreTokenRequired /* * (10 ** Scoretoken.decimals())*/;
      bool successful = Scoretoken.transfer(address(this), amount);
      if(!successful) revert UnsuccessfulTransfer();
      hackathonmapping.registered[hack.id][msg.sender] = true;
      hack.numOfStudent += 1;
   }


   function getHackathon() external view returns(LibHackFund.Hack memory) { 
      return hack;
   }

   function getAcceptedCurrencyAndScoreToken() external view returns (IERC20, IERC20) {
      return (Ekostable, Scoretoken);
   }



   function isParticipant(address participant) external view returns (bool) {
      return hackathonmapping.registered[hack.id][participant]; 
   }


   function fundHackathon(uint _amount) external {
      if (hack.state == State.Ended) revert HackathonEnded();
      uint amount = _amount * (10 ** Ekostable.decimals()); 
      bool successful = Ekostable.transfer(address(this), amount);
      if(!successful) revert UnsuccessfulTransfer();
      hack.funding += _amount;
   }


   function startHackathon() external {
      if (hack.state == State.Ended) revert HackathonEnded();
      hack.state = State.Ongoing;
   }


   function endHackathon() external {
      if (hack.endDate > block.timestamp) revert HackathonOngoing();
      hack.state = State.Ended;
   }

   function setWinner(address _winner) addressValidation(_winner) external {
      if (hack.state != State.Ended) revert HackathonOngoing();
      if(hackathonmapping.winnerWithdrawn[hack.id]) revert AlreadyWithdrawn();
      hack.winner = _winner;
      hackathonmapping.isWinner[hack.id][_winner] = true;
   }


   function setFirstRunnerUp(address _firstRunnerUp) addressValidation(_firstRunnerUp) external {
      if (hack.state != State.Ended) revert HackathonOngoing();
      if(hackathonmapping.firstRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();       
      hack.firstRunnerUp = _firstRunnerUp;
      hackathonmapping.isWinner[hack.id][_firstRunnerUp] = true;
   }


   function setSecondRunnerUp(address _secondRunnerUp) addressValidation(_secondRunnerUp) external {
      if (hack.state != State.Ended) revert HackathonOngoing();
      if(hackathonmapping.secondRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();       
      hack.secondRunnerUp = _secondRunnerUp;
      hackathonmapping.isWinner[hack.id][_secondRunnerUp] = true;
   } 


   function refundScoreTokens() external {
      if (hack.state != State.Ended) revert HackathonOngoing();
      if(hackathonmapping.scoreTokenRefund[hack.id][msg.sender]) revert AlreadyWithdrawn();
      if (hackathonmapping.registered[hack.id][msg.sender]) revert NotParticipant();

      hackathonmapping.scoreTokenRefund[hack.id][msg.sender] = true;
      uint amount = hack.minScoreTokenRequired * (10 ** Ekostable.decimals());
      bool successful = Scoretoken.transferFrom(address(this), msg.sender, amount);
      if(!successful) revert UnsuccessfulTransfer();
   }

   function winnerWithdrawal() external {
      if(!hackathonmapping.isWinner[hack.id][msg.sender]) revert NotWinner();
      if(hackathonmapping.winnerWithdrawn[hack.id]) revert AlreadyWithdrawn();
      uint _amount = hack.funding * (10**Ekostable.decimals());
      uint amount = (hack.winnerPercentage/100) * _amount;
      hackathonmapping.winnerWithdrawn[hack.id] = true;
      bool success = Ekostable.transferFrom(address(this), msg.sender, amount);
      if(!success) revert UnsuccessfulTransfer();
   }


   function firstRunnerUpWithdrawal() external {
      if(!hackathonmapping.isFirstRunnerUp[hack.id][msg.sender]) revert NotFirstRunnerUp();
      if(hackathonmapping.firstRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();
      uint _amount = hack.funding * (10**Ekostable.decimals());
      uint amount = (hack.firstRunnerUpPercentage/100) * _amount;
      hackathonmapping.firstRunnerUpWithdrawn[hack.id] = true;
      bool success = Ekostable.transferFrom(address(this), msg.sender, amount);
      if(!success) revert UnsuccessfulTransfer();
   }


   function secondRunnerUpWithdrawal() external {
      if(!hackathonmapping.isSecondRunnerUp[hack.id][msg.sender]) revert NotSecondRunnerUp();
      if(hackathonmapping.secondRunnerUpWithdrawn[hack.id]) revert AlreadyWithdrawn();
      uint _amount = hack.funding * (10**Ekostable.decimals());
      uint amount = (hack.secondRunnerUpPercentage/100) * _amount;
      hackathonmapping.secondRunnerUpWithdrawn[hack.id] = true;
      bool success = Ekostable.transferFrom(address(this), msg.sender, amount);
      if(!success) revert UnsuccessfulTransfer();
   }
    

}