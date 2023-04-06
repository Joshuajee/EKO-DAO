//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.19;

import '../CrowdFundProject.sol';


// track Project status
    enum Status {
        Fundraising,
        Expired,
        Successful,
        Completed
    }  
 

library Database{  
  //--------------------------------Campaign Project ------------------------------------
  
    struct ProjectState {
        address admin; //wallet address of the user that create the project
        address projectAddress; // address of the camppaign project                          
        uint256 targetFund; // total amount that determines if the project is a success
        uint256 totalDonationRecieved; // total amount received from donors  
        uint256 minimumDonation; // minimum donation acceptable 
        uint256 amountWithdrawn; // total amount withdrwan either by admin or donors
        uint256 fundBalance; // total amount in the project 
        uint256 endDate; //Date and time the project expires              
        string projectTopic; //campaign title 
        string description; // campaign descriptions
        uint256 noOfDonors; // total number of donors
        Status status;  // campaign project status
        address [] donors; //track the list of donors                      
    } 

    //Project Mapping state_varibles
    struct ProjectMappings{
        mapping (address => uint256) donor;  
    }

    bytes32 constant ProjectStateLocation = keccak256("admin.targetFund.TotalReacivedFund.MinimumContribution.amountWithraw.fundBalance.endDate");
    bytes32 constant ProjectMappingLocation = keccak256("contributorAmountMapping");
            
    
    function getProjectRecords() internal pure returns(ProjectState storage ps){
        bytes32 position = ProjectStateLocation;

        assembly{
            ps.slot := position
        }
    }

    function getProjectMappingRecords() internal pure returns(ProjectMappings storage pm){
        bytes32 position = ProjectMappingLocation;

        assembly{
            pm.slot := position
        }
    }


  //-------------------------------- CrowdFundFacet------------------------------------  
  
   struct ProjectDetails{
     string ProjectTopic; 
     string ProjectDescription;
     uint256 endDate;
     uint256 targetFund;
     uint256 totalDonationRecieved;  
     uint256 minimumDonation;
     uint256 amountWithdrawn;
     string acceptedCurrency;
     uint256 noOfDonors;
 }    

  //CrowdFund State Variables 
  struct CrowdFundingState {
    uint256 projectCounts;
    ProjectDetails [5] details;         
  }  
  //CrowdFund Mapping State_Variables 
  struct CrowdFundingMapping{
    mapping (uint256 => Project) Projects;
  }


    bytes32 constant CrowdFundingStateLocation = keccak256("projectCounts");
    bytes32 constant CrowdFundingMappingLocation = keccak256("projectsMapping");   

    function getCrowdFundRecords() internal pure returns (CrowdFundingState storage cs){
        bytes32 position = CrowdFundingStateLocation;

        assembly{
            cs.slot := position
        }
    }

    function getCrowdFundMappingRecords() internal pure returns (CrowdFundingMapping storage cm){
        bytes32 position = CrowdFundingMappingLocation;

        assembly{
            cm.slot := position
        }
    }

}