// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// Example library to show a simple example of diamond storage

library CrowdFundLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.crowdfund.storage");
    
    struct CrowdFundState {
        address myAddress;
        uint256 myNum;
    }

    function diamondStorage() internal pure returns (CrowdFundState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        CrowdFundState storage crowdFundState = diamondStorage();
        crowdFundState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        CrowdFundState storage crowdFundState = diamondStorage();
        return crowdFundState.myAddress;
    }

}

contract CrowdFundFacet {
    event CrowdFundEvent(address something);

    function crowdFund() external {
      CrowdFundLib.setMyAddress(address(this));
    }


}
