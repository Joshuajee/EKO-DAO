// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

library LibAdmin {
  bytes32 constant DIAMOND_STORAGE_POSITION =
    keccak256("diamond.standard.admin.storage");

  struct Admins {
    mapping(address => Roles) roles;
  }

  enum Roles {
    NONE,
    SUPER_ADMIN,
    ADMIN
  }

  modifier onlySuperAdmin() {
    require(
      isSuperAdmin(msg.sender),
      "Unauthorized access. Caller is not a superadmin"
    );
    _;
  }

  modifier onlyAdmin() {
    require(isAdmin(msg.sender), "Unauthorized access. Caller is not an admin");
    _;
  }

  function diamondStorage() internal pure returns (Admins storage admins) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
      admins.slot := position
    }
  }

  function init(address _admin) internal {
    Admins storage admins = diamondStorage();
    admins.roles[_admin] = Roles.SUPER_ADMIN;
  }

  function setAdmin(address _admin, Roles _role) internal onlySuperAdmin {
    Admins storage admins = diamondStorage();
    admins.roles[_admin] = _role;
  }

  function removeAdmin(address _admin) internal onlySuperAdmin {
    Admins storage admins = diamondStorage();
    delete admins.roles[_admin];
  }

  function getAdmin(address _admin) internal view returns (Roles) {
    Admins storage admins = diamondStorage();
    return admins.roles[_admin];
  }

  function isSuperAdmin(address _admin) internal view returns (bool) {
    Admins storage admins = diamondStorage();
    return admins.roles[_admin] == Roles.SUPER_ADMIN;
  }

  function isAdmin(address _admin) internal view returns (bool) {
    Admins storage admins = diamondStorage();
    return
      admins.roles[_admin] == Roles.SUPER_ADMIN ||
      admins.roles[_admin] == Roles.ADMIN;
  }
}
