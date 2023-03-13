//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.17;



import "../Hackathon.sol";

// track state of hackathon
enum State{
    Uninitialized,
    Admitting,
    Ongoing,
    Ended
}



library LibHackFund {

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
        uint winnerPercentage;
        uint firstRunnerUpPercentage;
        uint secondRunnerUpPercentage;
        uint funding;
        uint minScoreTokenRequired;
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

}  