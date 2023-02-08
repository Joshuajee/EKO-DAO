// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { EkoUSDC } from "./EkoUSDC.sol";

contract Cohort {
  struct CohortRecord {
    bytes32 id;
    uint startDate;
    uint endDate;
    uint8 size;
    uint commitment;
    mapping(address => bool) students;
  }

  CohortRecord public cohort;

  IERC20 USDC;
  IERC721 EKO_NFT;
  EkoUSDC EKO_USDC;
  address public ekoUSDCAddress;

  modifier enrollmentRequirementsFulfilled(uint256 amount) {
    if (amount < cohort.commitment) revert("Must submit all fees to enroll");
    if (block.timestamp >= cohort.startDate) revert("Cohort already started");
    if (cohort.students[msg.sender]) revert("Student already enrolled");
    _;
  }

  modifier refundRequirementsFulfilled(uint256 amount, uint256 _certificateId) {
    if (!cohort.students[msg.sender])
      revert("Must be a student to claim fees back");
    if (EKO_NFT.ownerOf(_certificateId) != msg.sender)
      revert("Completion certificate does not belong to the sender");
    _;
  }

  constructor(
    bytes32 _id,
    uint _startDate,
    uint _endDate,
    uint8 _size,
    uint _commitment
  ) {
    cohort.id = _id;
    cohort.startDate = _startDate;
    cohort.endDate = _endDate;
    cohort.size = _size;
    cohort.commitment = _commitment;
  }

  function init(address _USDC, address _EkoNFT) public {
    USDC = IERC20(_USDC);
    EKO_NFT = IERC721(_EkoNFT);
    EKO_USDC = new EkoUSDC();
    ekoUSDCAddress = address(EKO_USDC);
  }

  function enroll(
    uint256 amount
  ) public payable enrollmentRequirementsFulfilled(amount) {
    USDC.transferFrom(msg.sender, address(this), amount);
    cohort.students[msg.sender] = true;
    EKO_USDC.mint(msg.sender, amount);
  }

  function refund(
    uint256 amount,
    uint256 _certificateId
  ) public payable refundRequirementsFulfilled(amount, _certificateId) {
    EKO_USDC.transferFrom(msg.sender, address(this), amount);
    EKO_USDC.burn(amount);
    USDC.transfer(msg.sender, amount);
  }
}
