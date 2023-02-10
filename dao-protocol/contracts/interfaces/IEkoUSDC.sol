// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEkoStable {
  function mint(address to, uint256 amount) external;

  function transfer(address to, uint256 amount) external returns (bool);

  function burn(uint256 amount) external;
}
