// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import { LibCohort } from "../libraries/LibCohort.sol";

contract CohortFactoryFacet {
  function newCohort(
    uint _id,
    string memory _name,
    uint _startDate,
    uint _endDate,
    uint8 _size,
    uint _commitment,
    string memory _description
  ) external {
    LibCohort.newCohort(
      _id,
      _name,
      _startDate,
      _endDate,
      _size,
      _commitment,
      _description
    );
  }

  function initCohort(
    address _cohort,
    address _stableCoin,
    address _ekoNft
  ) external {
    return LibCohort.initCohort(_cohort, _stableCoin, _ekoNft);
  }

  function cohort(
    uint _id
  ) external view returns (LibCohort.CohortDetails memory) {
    bytes32 id = keccak256(abi.encodePacked(_id));
    return LibCohort.getCohort(id);
  }

  function cohorts() external view returns (LibCohort.CohortDetails[] memory) {
    return LibCohort.getCohorts();
  }
}
