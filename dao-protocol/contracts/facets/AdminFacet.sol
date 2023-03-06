// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../libraries/LibAdmin.sol";

// This contract defines the AdminFacet which can be used to manage admins in the contract.
contract AdminFacet {
  function setAdmin(address _admin, LibAdmin.Roles _role) external {
    LibAdmin.setAdmin(_admin, _role);
  }

  function removeAdmin(address _admin) external {
    LibAdmin.removeAdmin(_admin);
  }

  function getAdmin(address _admin) external view returns (LibAdmin.Roles) {
    return LibAdmin.getAdmin(_admin);
  }

  function isSuperAdmin(address _admin) external view returns (bool) {
    return LibAdmin.isSuperAdmin(_admin);
  }

  function isAdmin(address _admin) external view returns (bool) {
    return LibAdmin.isAdmin(_admin);
  }
}
