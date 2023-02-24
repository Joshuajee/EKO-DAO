// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// This library defines the admins and their roles in the contract.
library LibAdmin {
  // This library defines the admins and their roles in the contract.
  bytes32 constant DIAMOND_STORAGE_POSITION =
    keccak256("diamond.standard.admin.storage");

  // This struct defines the roles for the admins in the contract.
  struct Admins {
    mapping(address => Roles) roles;
  }

  // This enum defines the different roles an admin can have.
  enum Roles {
    SUPER_ADMIN,
    ADMIN
  }

  // This modifier restricts access to certain functions to only super admins.
  modifier onlySuperAdmin() {
    require(
      isSuperAdmin(msg.sender),
      "Unauthorized access. Caller is not a superadmin"
    );
    _;
  }
  
  // This modifier restricts access to certain functions to only admins.
  modifier onlyAdmin() {
    require(isAdmin(msg.sender), "Unauthorized access. Caller is not an admin");
    _;
  }

  // This function returns the storage for the admins in the contract.
  function diamondStorage() internal pure returns (Admins storage admins) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
      admins.slot := position
    }
  }

  // This function initializes the contract by setting the sender as the super admin.
  function init() internal {
    Admins storage admins = diamondStorage();
    admins.roles[msg.sender] = Roles.SUPER_ADMIN;
  }

  // This function allows a super admin to set the role of a specified admin
  // by updating the admin's role in the admins mapping.
  function setAdmin(address _admin, Roles _role) internal onlySuperAdmin {
    Admins storage admins = diamondStorage();
    admins.roles[_admin] = _role;
  }

  // This function removes the role of a specified admin, 
  // and can only be called by a super admin to maintain access control.
  function removeAdmin(address _admin) internal onlySuperAdmin {
    Admins storage admins = diamondStorage();
    delete admins.roles[_admin];
  }

  // This function retrieves the role of a specified admin by accessing the admins mapping.
  function getAdmin(address _admin) internal view returns (Roles) {
    Admins storage admins = diamondStorage();
    return admins.roles[_admin];
  }

  // This function checks whether a specified address is a super admin by accessing the admins mapping.
  function isSuperAdmin(address _admin) internal view returns (bool) {
    Admins storage admins = diamondStorage();
    return admins.roles[_admin] == Roles.SUPER_ADMIN;
  }
  
  // This function checks whether a specified address is an admin 
  // by accessing the admins mapping and checking for the SUPER_ADMIN or ADMIN role.
  function isAdmin(address _admin) internal view returns (bool) {
    Admins storage admins = diamondStorage();
    return
      admins.roles[_admin] == Roles.SUPER_ADMIN ||
      admins.roles[_admin] == Roles.ADMIN;
  }
}
