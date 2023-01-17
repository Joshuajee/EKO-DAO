// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Example library to show a simple example of diamond storage

library HackFundLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.registration.storage");
    
    struct HackFundState {
        address myAddress;
        uint256 myNum;
    }

    function diamondStorage() internal pure returns (HackFundState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        HackFundState storage hackFundState = diamondStorage();
        hackFundState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        HackFundState storage hackFundState = diamondStorage();
        return hackFundState.myAddress;
    }

}

contract HackFundFacet {
    event HackFundEvent(address something);

    function HackFund() external {
      HackFundLib.setMyAddress(address(this));
    }


}
