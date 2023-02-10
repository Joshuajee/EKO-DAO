// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

library LibCohort {

  bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.cohort.storage");

  function diamondStorage() internal pure returns (mapping(bytes32 => address) storage cohorts) {
      bytes32 position = DIAMOND_STORAGE_POSITION;
      assembly {
          cohorts.slot := position
      }
  }

  function setCohort(bytes32 _id, address cohort) internal {
    mapping(bytes32 => address) storage cohorts = diamondStorage();
    cohorts[_id]= cohort;
  }

  function getCohort(bytes32 _id) internal view returns (address) {
   mapping(bytes32 => address) storage cohorts = diamondStorage();
    return cohorts[_id];
  }
}