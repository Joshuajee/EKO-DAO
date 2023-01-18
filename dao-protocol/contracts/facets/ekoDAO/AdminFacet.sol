// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Example library to show a simple example of diamond storage

library AdminLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.admin.storage");
    
    struct AdminState {
        address myAddress;
        uint256 myNum;
    }

    function diamondStorage() internal pure returns (AdminState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        AdminState storage adminState = diamondStorage();
        adminState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        AdminState storage adminState = diamondStorage();
        return adminState.myAddress;
    }

}

contract AdminFacet {
    event AdminEvent(address something);

   function Admin1Func1() external {
      AdminLib.setMyAddress(address(this));
    }

    function Admin1Func2() external view returns (address){
      return AdminLib.getMyAddress();
    }

}
