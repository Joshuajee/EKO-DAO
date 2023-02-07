// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// Example library to show a simple example of diamond storage

library CommitmentLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.registration.storage");
    
    struct CommitmentState {
        address myAddress;
        uint256 myNum;
    }

    function diamondStorage() internal pure returns (CommitmentState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        CommitmentState storage commitmentState = diamondStorage();
        commitmentState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        CommitmentState storage commitmentState = diamondStorage();
        return commitmentState.myAddress;
    }

}

contract CommitmentFacet {
    event CommitmentEvent(address something);

    function Register() external {
      CommitmentLib.setMyAddress(address(this));
    }


}
