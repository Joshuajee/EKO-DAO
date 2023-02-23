// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../libraries/LibAdmin.sol";

contract AdminFacet {
  constructor() {
    LibAdmin.init();
  }

  function setAdmin(address _admin, LibAdmin.Roles _role) public {
    LibAdmin.setAdmin(_admin, _role);
  }

  function removeAdmin(address _admin) public {
    LibAdmin.removeAdmin(_admin);
  }

  function getAdmin(address _admin) public view returns (LibAdmin.Roles) {
    return LibAdmin.getAdmin(_admin);
  }
}
