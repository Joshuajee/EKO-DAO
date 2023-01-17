// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Example library to show a simple example of diamond storage

library BallotLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.ballot.storage");
    
    struct BallotState {
        address myAddress;
        uint256 myNum;
    }

    function diamondStorage() internal pure returns (BallotState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        BallotState storage ballotState = diamondStorage();
        ballotState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        BallotState storage ballotState = diamondStorage();
        return ballotState.myAddress;
    }

}

contract BallotFacet {
    event BallotEvent(address something);

   function Ballot1Func1() external {
      BallotLib.setMyAddress(address(this));
    }

    function Ballot1Func2() external view returns (address){
      return BallotLib.getMyAddress();
    }

}
