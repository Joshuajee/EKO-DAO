// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import { LibCohort, Cohort } from "../libraries/LibCohort.sol";


contract CohortFacet {

  function initCohort(
    address _cohort,
    address _stableCoin,
    address _ekoNft
  ) external {
    return LibCohort.initCohort(_cohort, _stableCoin, _ekoNft);
  }

  function cohort(
    uint _id
  ) external view returns (Cohort.CohortDetails memory) {
    bytes32 id = keccak256(abi.encodePacked(_id));
    return LibCohort.getCohort(id);
  }

  function cohorts() external view returns (Cohort.CohortDetails[] memory) {
    return LibCohort.getCohorts();
  }
}
