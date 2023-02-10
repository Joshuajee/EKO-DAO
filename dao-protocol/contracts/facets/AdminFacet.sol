// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../libraries/LibDiamond.sol";
import { OwnershipFacet } from "./OwnershipFacet.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Define a constant for the diamond storage position
bytes32 constant DIAMOND_STORAGE_POSITION = keccak256(
  "diamond.standard.admin.storage"
);

// Define the AdminState struct to store arrays of administrators and super administrators, and a mapping of accepted ekostable tokens
struct AdminState {
  address[] admins;
  address[] superAdmins;
  mapping(address => bool) acceptedEkoStables;
}

// Define the AdminFacet contract that is a child of the OwnershipFacet contract
contract AdminFacet is OwnershipFacet {
  // Define the EkoStable struct to store the name, symbol, and decimal of a stable coin
  struct EkoStable {
    uint8 decimals;
    string name;
    string symbol;
  }

  // Mapping to store list of administrators
  mapping(address => bool) public administrators;
  // Mapping to store list of super administrators
  mapping(address => bool) public superAdmins;

  mapping(address => EkoStable) public ekoStables;
  mapping(string => EkoStable) public ekoStablesBySymbol;
  mapping(string => bool) public acceptedEkoStables;

  // Define events for token added and token already exists
  event TokenAdded(address _ekoStable, string _symbol);
  event TokenAlreadyExists(string _symbol);

  /**
   * @dev Modifier to check if the caller is an administrator
   */
  modifier onlyAdmin() {
    require(
      administrators[msg.sender],
      "Unauthorized access. Caller is not an administrator"
    );
    _;
  }

  /**
   * @dev Modifier to check if the caller is a superadmin
   */
  modifier onlySuperAdmin() {
    require(
      superAdmins[msg.sender],
      "Unauthorized access. Caller is not a superadmin"
    );
    _;
  }

  // Function to retrieve the diamond storage
  function diamondStorage(
    bytes32 _position
  ) internal pure returns (AdminState storage ds) {
    assembly {
      ds.slot := _position
    }
  }

  // Call the transferOwnership function from OwnershipFacet to set the first superadmin
  // In the constructor, pass in the first superadmin address and store it as a superadmin
  constructor(address _firstSuperAdminAddress) {
    // OwnershipFacet ownershipFacet = OwnershipFacet(address(this));
    superAdmins[_firstSuperAdminAddress] = true;
    // ownershipFacet.transferOwnership(_firstSuperAdminAddress);
    // Push the first superadmin address to the list of administrators in diamond storage
    diamondStorage(DIAMOND_STORAGE_POSITION).admins.push(
      _firstSuperAdminAddress
    );
  }

  /**
   * @dev Function to add an administrator
   * @param _adminAddress Address of the administrator to be added
   */
  function addAdmin(address _adminAddress) public onlySuperAdmin {
    administrators[_adminAddress] = true;
    diamondStorage(DIAMOND_STORAGE_POSITION).admins.push(_adminAddress);
  }

  /**
   * @dev Function to remove an administrator
   * @param _adminAddress Address of the administrator to be removed
   */
  function removeAdmin(address _adminAddress) public onlySuperAdmin {
    administrators[_adminAddress] = false;
  }

  /**
   * @dev Function to add a super administrator
   * @param _superAdminAddress Address of the super administrator to be added
   */
  function addSuperAdmin(address _superAdminAddress) public onlySuperAdmin {
    superAdmins[_superAdminAddress] = true;
    diamondStorage(DIAMOND_STORAGE_POSITION).superAdmins.push(
      _superAdminAddress
    );
  }

  /**
   * @dev Function to remove a super admin
   * @param _superAdminAddress Address of the super admin to be removed
   */
  function removeSuperAdmin(address _superAdminAddress) public onlySuperAdmin {
    // Ensures that the address passed as an argument is a superadmin.
    // If the address is not a superadmin, it reverts the transaction and throws an error message.
    require(
      superAdmins[_superAdminAddress],
      "The given address is not a superadmin."
    );
    // Prevents the superadmin from removing their own rights.
    // If the sender is the same as the address passed as an argument, it reverts the transaction and throws an error message.
    require(
      msg.sender != _superAdminAddress,
      "A superadmin cannot remove themselves."
    );
    // Sets the superadmin status of the given address to false.
    superAdmins[_superAdminAddress] = false;
  }

  // setEkoStableProperties is a public function that can only be executed by an admin.
  // It sets the properties of the EkoStable token.
  function setEkoStableProperties(
    address _ekoStable,
    uint8 _decimals,
    string memory _name,
    string memory _symbol
  ) public onlyAdmin {
    ekoStables[_ekoStable] = EkoStable({
      decimals: _decimals,
      name: _name,
      symbol: _symbol
    });
    // Maps the symbol of the EkoStable contract to its corresponding contract instance.
    ekoStablesBySymbol[_symbol] = ekoStables[_ekoStable];
  }

  /**
   * @dev Function to add an accepted ekoStable token
   * @param _ekoStable Symbol of the ekoStable token to be added
   */
  function addAcceptedEkoStable(string memory _ekoStable) public onlyAdmin {
    acceptedEkoStables[_ekoStable] = true;
  }

  /**
   * @dev Function to remove an accepted ekoStable token
   * @param _ekoStable Symbol of the ekoStable token to be removed
   */
  function removeAcceptedEkoStable(string memory _ekoStable) public onlyAdmin {
    acceptedEkoStables[_ekoStable] = false;
  }
}
