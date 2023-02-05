// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./LibDiamond.sol";

bytes32 constant DIAMOND_STORAGE_POSITION =
        keccak256("diamond.standard.admin.storage");

struct AppStorage {
    address tokenAddress;

}

struct AdminState {
        address[] admins;
        address[] superAdmins;
        address[] acceptedStableCoins;
    }

   
contract AdminFacet {
      AppStorage internal s;

    // Mapping to store list of administrators
    mapping(address => bool) private administrators;
    // Mapping to store list of super administrators
    mapping(address => bool) private superAdmins;
    // Mapping to store list of accepted ekoStable tokens
    mapping(string => bool) private acceptedEkoStables;

function diamondStorage(
        bytes32 _position
    ) internal pure returns (AdminState storage ds) {
        assembly {
            ds.slot := _position
        }
    }


     /**
     * @dev Constructor function to set the first super admin
     * @param _firstSuperAdminAddress Address of the first super admin
     */
    constructor(address _firstSuperAdminAddress) {
    superAdmins[_firstSuperAdminAddress] = true;

}
    /**
     * @dev Function to add an administrator
     * @param _adminAddress Address of the administrator to be added
     */
    function addAdmin(address _adminAddress) public onlySuperAdmin {
        administrators[_adminAddress] = true;
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
    }

    /**
 * @dev Function to remove a super admin
 * @param _superAdminAddress Address of the super admin to be removed
 */
function removeSuperAdmin(address _superAdminAddress) public onlySuperAdmin {
    require(superAdmins[_superAdminAddress], "The given address is not a superadmin.");
    require(msg.sender != _superAdminAddress, "A superadmin cannot remove themselves.");
    superAdmins[_superAdminAddress] = false;
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
    function removeAcceptedEkoStable(
        string memory _ekoStable
    ) public onlyAdmin {
        acceptedEkoStables[_ekoStable] = false;
    }

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
}
