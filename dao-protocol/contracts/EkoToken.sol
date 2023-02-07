// SPDX-License-Identifier: MIT
pragma solidity = 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EkoToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Eko Token", "EKT") {
        _mint(msg.sender, initialSupply);
    }
}

// 1000000000000000000000000000

// 100000000000000000000