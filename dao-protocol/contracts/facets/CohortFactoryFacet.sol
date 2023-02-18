// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import { Cohort } from "../Cohort.sol";
import { LibCohort } from "../libraries/LibCohort.sol";

contract CohortFactoryFacet {
  function newCohort(
    uint _id,
    string memory _name,
    uint _startDate,
    uint _endDate,
    uint8 _size,
    uint _commitment
  ) public {
    bytes32 id = keccak256(abi.encodePacked(_id));
    Cohort cohort_ = new Cohort(
      id,
      _name,
      _startDate,
      _endDate,
      _size,
      _commitment
    );
    LibCohort.setCohort(id, _name, _startDate, _endDate, address(cohort_));
  }

  function cohort(uint _id) public view returns (LibCohort.Cohort memory) {
    bytes32 id = keccak256(abi.encodePacked(_id));
    return LibCohort.getCohort(id);
  }

  function cohorts() public view returns (LibCohort.Cohort[] memory) {
    return LibCohort.getCohorts();
  }
}
