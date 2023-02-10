// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Cohort } from "../Cohort.sol";
import { LibCohort } from "../libraries/LibCohort.sol";

contract CohortFactoryFacet {
  function newCohort(
    uint _id,
    uint _startDate,
    uint _endDate,
    uint8 _size,
    uint _commitment
  ) public {
    bytes32 id = keccak256(abi.encodePacked(_id));
    Cohort cohort = new Cohort(id, _startDate, _endDate, _size, _commitment);
    LibCohort.setCohort(id, address(cohort));
  }

  function cohorts(uint _id) public view returns (address) {
    bytes32 id = keccak256(abi.encodePacked(_id));
    return LibCohort.getCohort(id);
  }
}
