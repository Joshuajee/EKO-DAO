// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {LibHackFund} from "../libraries/LibHackFund.sol";
import {Hackathon} from "../Hackathon.sol";

contract HackathonFacet {

    // custom errors
    error HackathonNotFound();
    error WrongStartAndCountInput();
    error InvalidCountInput();

    function _existingHackathon(uint hackID) private view{
        if (hackID == 0) revert HackathonNotFound();
        if (hackID > LibHackFund.getHackathonTracker().hackathonCount) revert HackathonNotFound();
    }

    modifier existingHackathon(uint hackID) {
        _existingHackathon(hackID);
        _;
    } 


    function newHackathon (
        string memory _name,
        string memory _description, 
        uint _startDate,
        uint _endDate, 
        uint16 _maxNumAdmittable, 
        uint8 _winnerPercentage, 
        uint8 _firstRunnerUpPercentage, 
        uint8 _secondRunnerUpPercentage,
        uint16 _minScoreTokenRequiurement
    ) external {
        address _author = msg.sender;
        LibHackFund.getHackathonTracker().hackathonCount++;
        LibHackFund.getHackathonTracker().Hackathons[LibHackFund.getHackathonTracker().hackathonCount] = new Hackathon(
            LibHackFund.getHackathonTracker().hackathonCount,
            _author,
            _name,
            _description,
            _startDate,
            _endDate,
            _maxNumAdmittable,
            _winnerPercentage,
            _firstRunnerUpPercentage,
            _secondRunnerUpPercentage,
            _minScoreTokenRequiurement
            );
    }


    function initializeHackathon(
        uint hackID,
        address _acceptedCurrency,
        address _scoretoken
      ) external existingHackathon(hackID) {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).initializeHackathon(_acceptedCurrency, _scoretoken);
      }

    function register(uint hackID) existingHackathon(hackID) external {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).register(msg.sender);
    }

    function getHackathon(
        uint hackID
        ) existingHackathon(hackID) view external returns (LibHackFund.Hack memory){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).getHackathon();
    }

    function isParticipant(
        uint hackID,
        address participant
        ) existingHackathon(hackID) view external returns (bool){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).isParticipant(participant);
    }

    function fundHackathon(uint hackID, uint256 _amount) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).fundHackathon(_amount, msg.sender);
    }

    function startHackathon(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).startHackathon();
    }

    function endHackathon(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).endHackathon();
    }

    function setPrizeWinners(
        uint hackID,
        address _winner,
        address _firstRunnerUp,
        address _secondRunnerUp
      )existingHackathon(hackID) external {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).setPrizeWinners(_winner, _firstRunnerUp, _secondRunnerUp);
      }

    function refundScoreTokens(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).refundScoreTokens(msg.sender);
    }

    function prizeWithdrawal(uint hackID) existingHackathon(hackID) external {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).prizeWithdrawal(msg.sender);
    }

    function numberofHackathons() external view returns(uint) {
        return LibHackFund.getHackathonTracker().hackathonCount;
    }

    // function to return hackathons within a specific range
    // function getHackathons(
    //     uint start,
    //     uint8 count
    //     ) existingHackathon(start)  external view returns (LibHackFund.Hack[] memory Hackathons) {
    //         if (count > 50 || count < 0) revert InvalidCountInput();
    //         if (start < count) revert WrongStartAndCountInput();

    //          LibHackFund.HackathonsTracker storage hackTracker = LibHackFund.getHackathonTracker() ;
            
             
    //         Hackathons = new LibHackFund.Hack[](count);

    //         uint count1;
    //         for (uint i = start; i > (start - count); i--){

    //             Hackathons[count1] = hackTracker.Hackathons[i].getHackathon();
    //             count1++;
    //             continue;
    //         }
    // }


}