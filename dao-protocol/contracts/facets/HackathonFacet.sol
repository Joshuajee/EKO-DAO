// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibHackFund, HackathonBase} from "../libraries/LibHackFund.sol";
import {Hackathon} from "../Hackathon.sol";

// custom errors
error HackathonNotFound();
error WrongStartAndCountInput();
error InvalidCountInput();

contract HackathonFacet is HackathonBase {

    function newHackathon (
        string memory _name,
        string memory _description, 
        uint _delay,
        uint _duration, 
        uint16 _maxNumAdmittable, 
        uint8 _winnerPercentage, 
        uint8 _firstRunnerUpPercentage, 
        uint8 _secondRunnerUpPercentage,
        uint _minScoreTokenRequiurement
    )   isPercent(_winnerPercentage, _firstRunnerUpPercentage, _secondRunnerUpPercentage) external {
        address _author = msg.sender;
        LibHackFund.getHackathonTracker().hackathonCount++;
        uint count = LibHackFund.getHackathonTracker().hackathonCount;
        LibHackFund.getHackathonTracker().Hackathons[count] = new Hackathon(
            count,
            _author,
            _name,
            _description,
            _delay,
            _duration,
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

}