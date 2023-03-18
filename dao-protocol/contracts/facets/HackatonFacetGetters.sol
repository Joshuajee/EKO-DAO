// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibHackFund, HackathonBase} from "../libraries/LibHackFund.sol";
import {Hackathon} from "../Hackathon.sol";

contract HackathonFacetGetters is HackathonBase {

    function isParticipant(
        uint hackID,
        address participant
        ) existingHackathon(hackID) view external returns (bool){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).isParticipant(participant);
    }

    function getHackathon(
        uint hackID
        ) existingHackathon(hackID) view external returns (LibHackFund.Hack memory){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).getHackathon();
    }

    //function to return hackathons within a specific range
    function getHackathons(
        uint start,
        uint8 count
        ) existingHackathon(start)  external view returns (LibHackFund.Hack[] memory Hackathons) {
            if (count > 50 || count < 0) revert LibHackFund.InvalidCountInput();
            if (start < count) revert LibHackFund.WrongStartAndCountInput();

             LibHackFund.HackathonsTracker storage hackTracker = LibHackFund.getHackathonTracker() ;
            
             
            Hackathons = new LibHackFund.Hack[](count);

            uint count1;
            for (uint i = start; i > (start - count); i--){

                Hackathons[count1] = hackTracker.Hackathons[i].getHackathon();
                count1++;
                continue;
            }
    }

    function numberofHackathons() external view returns(uint) {
        return LibHackFund.getHackathonTracker().hackathonCount;
    }

}