// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import { Cohort } from "../Cohort.sol";
import { LibAdmin } from "./LibAdmin.sol";

library LibCohort {
  bytes32 constant DIAMOND_STORAGE_POSITION =
    keccak256("diamond.standard.cohort.storage");


  struct Cohorts {
    uint[] keys;
    mapping(uint => address) values;
  }

event NewCohort(Cohort.CohortDetails cohort);
  function diamondStorage() internal pure returns (Cohorts storage cohorts) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
      cohorts.slot := position
    }
  }

error Unauthorized();

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
      revert Unauthorized();

    Cohorts storage cohorts = diamondStorage();
    Cohort cohort = new Cohort(
      _id,
      _name,
      _startDate,
      _endDate,
      _size,
      _commitment,
      _description
    );
   cohorts.values[_id] = address(cohort);
    cohorts.keys.push(_id);
    emit NewCohort(cohort.getCohort());
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

  function getCohort(uint _id) internal view returns (Cohort.CohortDetails memory) {
    Cohorts storage cohorts = diamondStorage();
    address address_ = cohorts.values[_id];
    Cohort contract_ = Cohort(address_);
    return contract_.getCohort();
  }

  function getCohorts()
    internal
    view
    returns (Cohort.CohortDetails[] memory cohortsList)
  {
    Cohorts storage cohorts = diamondStorage();
    uint[] memory keys = cohorts.keys;
    cohortsList = new Cohort.CohortDetails[](keys.length);
    for (uint i = 0; i < keys.length; i++) {
      address address_ = cohorts.values[cohorts.keys[i]];
      Cohort contract_ = Cohort(address_);
      cohortsList[i] = contract_.getCohort();
    }
  }
}
