// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import { Cohort } from "../Cohort.sol";
import { LibAdmin } from "./LibAdmin.sol";

library LibCohort {
  bytes32 constant DIAMOND_STORAGE_POSITION =
    keccak256("diamond.standard.cohort.storage");

  struct CohortDetails {
    string name;
    uint startDate;
    uint endDate;
    string description;
    address contractAddress;
  }

  struct Cohorts {
    bytes32[] keys;
    mapping(bytes32 => CohortDetails) values;
  }

  event NewCohort(CohortDetails cohort);

  function diamondStorage() internal pure returns (Cohorts storage cohorts) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
      cohorts.slot := position
    }
  }

  function newCohort(
    uint _id,
    string memory _name,
    uint _startDate,
    uint _endDate,
    uint8 _size,
    uint _commitment,
    string memory _description
  ) internal {
    if (!LibAdmin.isAdmin(msg.sender))
      revert("Unauthorized access. Caller is not an admin");

    Cohorts storage cohorts = diamondStorage();
    bytes32 id = keccak256(abi.encodePacked(_id));
    Cohort cohort_ = new Cohort(
      id,
      _name,
      _startDate,
      _endDate,
      _size,
      _commitment,
      _description
    );
    CohortDetails memory cohort = CohortDetails(
      _name,
      _startDate,
      _endDate,
      _description,
      address(cohort_)
    );
    cohorts.values[id] = cohort;
    cohorts.keys.push(id);
    emit NewCohort(cohort);
  }

  function initCohort(
    address _cohort,
    address _stableCoin,
    address _ekoNft
  ) internal {
    if (!LibAdmin.isAdmin(msg.sender))
      revert("Unauthorized access. Caller is not an admin");
    Cohort cohort = Cohort(_cohort);
    cohort.init(_stableCoin, _ekoNft);
  }

  function getCohort(bytes32 _id) internal view returns (CohortDetails memory) {
    Cohorts storage cohorts = diamondStorage();
    return cohorts.values[_id];
  }

  function getCohorts()
    internal
    view
    returns (CohortDetails[] memory cohortsList)
  {
    Cohorts storage cohorts = diamondStorage();
    bytes32[] memory keys = cohorts.keys;
    cohortsList = new CohortDetails[](keys.length);
    for (uint i = 0; i < keys.length; i++) {
      cohortsList[i] = cohorts.values[cohorts.keys[i]];
    }
  }
}
