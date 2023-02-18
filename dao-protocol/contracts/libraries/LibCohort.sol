// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

library LibCohort {
  bytes32 constant DIAMOND_STORAGE_POSITION =
    keccak256("diamond.standard.cohort.storage");

  struct Cohort {
    string name;
    uint startDate;
    uint endDate;
    address contractAddress;
  }

  struct Cohorts {
    bytes32[] keys;
    mapping(bytes32 => Cohort) values;
  }

  function diamondStorage() internal pure returns (Cohorts storage cohorts) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
      cohorts.slot := position
    }
  }

  function setCohort(
    bytes32 _id,
    string memory _name,
    uint _startDate,
    uint _endDate,
    address _address
  ) internal {
    Cohorts storage cohorts = diamondStorage();
    Cohort memory cohort = Cohort(_name, _startDate, _endDate, _address);
    cohorts.values[_id] = cohort;
    cohorts.keys.push(_id);
  }

  function getCohort(bytes32 _id) internal view returns (Cohort memory) {
    Cohorts storage cohorts = diamondStorage();
    return cohorts.values[_id];
  }

  function getCohorts() internal view returns (Cohort[] memory cohortsList) {
    Cohorts storage cohorts = diamondStorage();
    bytes32[] memory keys = cohorts.keys;
    cohortsList = new Cohort[](keys.length);
    for (uint i = 0; i < keys.length; i++) {
      cohortsList[i] = cohorts.values[cohorts.keys[i]];
    }
  }
}
