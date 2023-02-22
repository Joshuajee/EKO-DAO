// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../libraries/LibAdmin.sol";

// This contract defines the AdminFacet which can be used to manage admins in the contract.
contract AdminFacet {

  // The constructor initializes the contract 
  //by calling the init() function in the LibAdmin library, 
  //which sets the sender as the super admin.
  constructor() {
    LibAdmin.init();
  }

  // This function allows a super admin to set the role of a specified admin.
  function setAdmin(address _admin, LibAdmin.Roles _role) public {
    LibAdmin.setAdmin(_admin, _role);
  }

  // This function allows a super admin to remove the role of a specified admin.
  function removeAdmin(address _admin) public {
    LibAdmin.removeAdmin(_admin);
  }

  // This function gets the role of a specified admin.
  function getAdmin(address _admin) public view returns (LibAdmin.Roles) {
    return LibAdmin.getAdmin(_admin);
  }
}
