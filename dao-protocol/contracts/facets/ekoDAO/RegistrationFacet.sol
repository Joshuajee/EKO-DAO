// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Example library to show a simple example of diamond storage

library RegistractionLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.registration.storage");
    
    struct RegistractionState {
        address myAddress;
        uint256 myNum;
    }

    function diamondStorage() internal pure returns (RegistractionState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        RegistractionState storage registractionState = diamondStorage();
        registractionState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        RegistractionState storage registractionState = diamondStorage();
        return registractionState.myAddress;
    }

}

contract RegistrationFacet {
    event RegistractionEvent(address something);

    function Register() external {
      RegistractionLib.setMyAddress(address(this));
    }


}
