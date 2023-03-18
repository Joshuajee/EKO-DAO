// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {Hackathon} from "../Hackathon.sol";


library LibHackFund {
    
    // custom errors
    error HackathonNotFound();
    error WrongStartAndCountInput();
    error InvalidCountInput();

    // track state of hackathon
    enum State{
        Uninitialized,
        Admitting,
        Ongoing,
        Ended
    }

    bytes32 constant HACKFUND_STORAGE_POSITION = keccak256("diamond.standard.hackfund.storage");

    bytes32 constant USER_REGISTRATION = keccak256("diamond.standard.registration.storage");

    bytes32 constant HACK_STORAGE_POSITION = keccak256("diamond.standard.hackathon.storage");

    bytes32 constant HACKATHON_MAPPING = keccak256("diamond.standard.hackathonMapping.storage");

    struct Hack {
        uint id;
        address hackathonAddress;
        address author;
        string name;
        string description;
        uint startDate;
        uint endDate;
        uint16 maxNumAdmittable;
        uint16 numOfStudent;
        address winner;
        address firstRunnerUp;
        address secondRunnerUp;
        uint8 winnerPercentage;
        uint8 firstRunnerUpPercentage;
        uint8 secondRunnerUpPercentage;
        uint funding;
        uint16 minScoreTokenRequired;
        State state;
    }


    struct HackathonMapping {
        mapping(uint => mapping (address => uint)) donorAmount;
        mapping(uint => mapping (address => bool)) registered;
        mapping(uint => mapping (address => bool)) isWinner;
        mapping(uint => mapping (address => bool)) isFirstRunnerUp;
        mapping(uint => mapping (address => bool)) isSecondRunnerUp;
        mapping(uint => mapping (address => bool)) scoreTokenRefund;    
        mapping(uint => bool) winnerWithdrawn;
        mapping(uint => bool) firstRunnerUpWithdrawn;
        mapping(uint => bool) secondRunnerUpWithdrawn;    
    }

    function getHack() internal pure returns(Hack storage hack) {
        bytes32 position = HACK_STORAGE_POSITION;

        assembly {
            hack.slot := position
        }
    }




    function getMapping() internal pure returns(HackathonMapping storage hackmapping) {
         bytes32 position = HACKATHON_MAPPING;

         assembly {
             hackmapping.slot := position
         }
    }

    // Hackathon Facet

    struct HackathonsTracker {
        uint hackathonCount;
        mapping (uint => Hackathon) Hackathons;
    }

    bytes32 constant HACKATHON_TRACKER = keccak256("diamond.standard.hackathonTracker.storage");
    
    function getHackathonTracker() internal pure returns (HackathonsTracker storage hackTracker) {
        bytes32 position = HACKATHON_TRACKER;

        assembly {
            hackTracker.slot := position
        }
    }

    //  function to return hackathons within a specific range
    // function _getHackathons(
    //     uint start,
    //     uint8 count
    //     ) /*existingHackathon(start)*/  internal view returns (Hack[] memory) {
    //         // if (count > 50 || count < 0) revert InvalidCountInput();
    //         // if (start < count) revert WrongStartAndCountInput();

    //          HackathonsTracker storage hackTracker = getHackathonTracker() ;
            
             
    //         Hack[] memory Hackathons = new Hack[](count);

    //         uint count1;
    //         for (uint i = start; i > (start - count); i--){

    //             Hackathons[count1] = hackTracker.Hackathons[i].getHackathon();
    //             count1++;
    //             continue;
    //         }

    //         return Hackathons;
    // }


}  



contract HackathonBase {

    modifier existingHackathon(uint hackID) {
        if (hackID == 0) revert LibHackFund.HackathonNotFound();
        if (hackID > LibHackFund.getHackathonTracker().hackathonCount) revert LibHackFund.HackathonNotFound();
        _;
    } 

}