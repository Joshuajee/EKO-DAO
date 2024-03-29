// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { EkoStable } from "./EkoStable.sol";

contract Cohort is Ownable {
  struct CohortDetails {
    uint id;
    string name;
    uint startDate;
    uint endDate;
    uint8 size;
    uint commitment;
    string description;
    Status status;
    uint studentsCount;
    address contractAddress;
  }

  mapping(address => bool) students;

  enum Status {
  NOT_INITILIZED,
  INITIALIZED
  }

  CohortDetails public cohort;

  IERC20 stableCoin;
  IERC721 ekoNft;
  EkoStable ekoStable;
  address public ekoStableAddress;

  modifier enrollmentRequirementsFulfilled(uint256 amount) {
    if (amount < cohort.commitment) revert("Must submit all fees to enroll");
    if (block.timestamp >= cohort.startDate) revert("Cohort already started");
    if (students[msg.sender]) revert("Student already enrolled");
    if (cohort.studentsCount == cohort.size)
      revert("No more room for a new student, please wait for the next cohort");
    _;
  }

  modifier refundRequirementsFulfilled(uint256 amount, uint256 _certificateId) {
    if (block.timestamp <= cohort.endDate) revert ("Cohort not ended yet");
    if (!students[msg.sender])
      revert("Must be a student to claim fees back");
    if (ekoNft.ownerOf(_certificateId) != msg.sender)
      revert("Completion certificate does not belong to the sender");
    _;
  }

  modifier onlyInitilized(){
    if(cohort.status < Status.INITIALIZED) revert ('Must initilize cohort first');
    _;
}

  constructor(
    uint _id,
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
    cohort.status= Status.NOT_INITILIZED;
    cohort.contractAddress= address(this);
  }

  function init(address _stableCoin, address _ekoNft) public onlyOwner {
    if (ekoStableAddress != address(0)) revert("Cohort already initialized");
    stableCoin = IERC20(_stableCoin);
    ekoNft = IERC721(_ekoNft);
    ekoStable = new EkoStable();
    ekoStableAddress = address(ekoStable);
    cohort.status= Status.INITIALIZED;
  }

  function enroll(
    uint256 amount
  ) public enrollmentRequirementsFulfilled(amount) {
    stableCoin.transferFrom(msg.sender, address(this), amount);
    students[msg.sender] = true;
    cohort.studentsCount++;
    ekoStable.mint(msg.sender, amount);
  }

  function refund(
    uint256 amount,
    uint256 _certificateId
  ) public refundRequirementsFulfilled(amount, _certificateId) {
    ekoStable.transferFrom(msg.sender, address(this), amount);
    ekoStable.burn(amount);
    stableCoin.transfer(msg.sender, amount);
  }

  function isStudent(address _student)public view returns( bool){
    return students[_student];
  }

  function getCohort() external view returns (CohortDetails memory){
    return cohort;
  }
}
