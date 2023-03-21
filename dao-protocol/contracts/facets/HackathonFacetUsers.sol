// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibHackFund, HackathonBase} from "../libraries/LibHackFund.sol";
import {Hackathon} from "../Hackathon.sol";

// custom errors
error HackathonNotFound();
error WrongStartAndCountInput();
error InvalidCountInput();

contract HackathonFacetUsers is HackathonBase {

    function register(uint hackID) existingHackathon(hackID) external {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).register(msg.sender);
    }

    function fundHackathon(uint hackID, uint256 _amount) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).fundHackathon(_amount, msg.sender);
    }

    function refundScoreTokens(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).refundScoreTokens(msg.sender);
    }

    function prizeWithdrawal(uint hackID) existingHackathon(hackID) external {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).prizeWithdrawal(msg.sender);
    }

}