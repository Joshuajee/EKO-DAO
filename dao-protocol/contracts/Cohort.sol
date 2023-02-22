// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { EkoStable } from "./EkoStable.sol";

contract Cohort {
  struct CohortRecord {
    bytes32 id;
    string name;
    uint startDate;
    uint endDate;
    uint8 size;
    uint commitment;
    string description;
    mapping(address => bool) students;
  }

  CohortRecord public cohort;

  IERC20 stableCoin;
  IERC721 ekoNft;
  EkoStable ekoStable;
  address public ekoStableAddress;

  modifier enrollmentRequirementsFulfilled(uint256 amount) {
    if (amount < cohort.commitment) revert("Must submit all fees to enroll");
    if (block.timestamp >= cohort.startDate) revert("Cohort already started");
    if (cohort.students[msg.sender]) revert("Student already enrolled");
    _;
  }

  modifier refundRequirementsFulfilled(uint256 amount, uint256 _certificateId) {
    if (!cohort.students[msg.sender])
      revert("Must be a student to claim fees back");
    if (ekoNft.ownerOf(_certificateId) != msg.sender)
      revert("Completion certificate does not belong to the sender");
    _;
  }

  constructor(
    bytes32 _id,
    string memory _name,
    uint _startDate,
    uint _endDate,
    uint8 _size,
    uint _commitment,
    string memory _description
  ) {
    cohort.id = _id;
    cohort.name = _name;
    cohort.startDate = _startDate;
    cohort.endDate = _endDate;
    cohort.size = _size;
    cohort.commitment = _commitment;
    cohort.description = _description;
  }

  function init(address _stableCoin, address _ekoNft) public {
    stableCoin = IERC20(_stableCoin);
    ekoNft = IERC721(_ekoNft);
    ekoStable = new EkoStable();
    ekoStableAddress = address(ekoStable);
  }

  function enroll(
    uint256 amount
  ) public payable enrollmentRequirementsFulfilled(amount) {
    stableCoin.transferFrom(msg.sender, address(this), amount);
    cohort.students[msg.sender] = true;
    ekoStable.mint(msg.sender, amount);
  }

  function refund(
    uint256 amount,
    uint256 _certificateId
  ) public payable refundRequirementsFulfilled(amount, _certificateId) {
    ekoStable.transferFrom(msg.sender, address(this), amount);
    ekoStable.burn(amount);
    stableCoin.transfer(msg.sender, amount);
  }
}
