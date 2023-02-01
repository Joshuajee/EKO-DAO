//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.17;

import './project.sol';

// track Project status
    enum Status {
        Fundraising,
        Expired,
        Successful
    }  
 

library Database{  

     //project details
    struct ProjectDetails{
            string ProjectTopic; 
            string ProjectDescription;
            uint256 endDate;
            uint256 targetFund;
            uint256 totalRecievedFund;  
            uint256 minimumContribution;
            uint256 amountWithdraw;
            string acceptedCurrency;
            uint256 noOfContributors;
        }    

    
    //project state variables
    struct ProjectState {
        address payable admin;
        address projectAddress;                           
        uint256 targetFund;
        uint256 totalRecievedFund;    
        uint256 minimumContribution;
        uint256 amountWithdraw;
        uint256 fundBalance; 
        uint256 endDate;                
        string projectTopic;
        string description;
        uint256 noOfContributors;
        Status status;                        
    } 

    //Project Mapping state_varibles
    struct ProjectMappings{
        mapping (address => uint256) contributor;  
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


    bytes32 constant ProjectStateLocation = keccak256("admin.targetFund.TotalReacivedFund.MinimumContribution.amountWithraw.fundBalance.endDate");
    bytes32 constant ProjectMappingLocation = keccak256("contributorAmountMapping");
    bytes32 constant CrowdFundingStateLocation = keccak256("projectCounts");
    bytes32 constant CrowdFundingMappingLocation = keccak256("projectsMapping");   
    
    
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