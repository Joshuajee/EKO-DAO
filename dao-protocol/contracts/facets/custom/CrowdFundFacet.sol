// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '../../libraries/LibStateVariables.sol';
import "./CrowdFundProject.sol";

// Example library to show a simple example of diamond storage

library CrowdFundLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.crowdfund.storage");
    
    struct CrowdFundState {
        address myAddress;
        uint256 myNum;                
    }

    function diamondStorage() internal pure returns (CrowdFundState storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setMyAddress(address _myAddress) internal {
        CrowdFundState storage crowdFundState = diamondStorage();
        crowdFundState.myAddress = _myAddress;
    }

    function getMyAddress() internal view returns (address) {
        CrowdFundState storage crowdFundState = diamondStorage();
        return crowdFundState.myAddress;
    }

}

contract CrowdFundFacet {
    event CrowdFundEvent(address something);

    function crowdFund() external {
      CrowdFundLib.setMyAddress(address(this));
    }

    event ProjectStarted(
        address projectContractAddress,
        string title,
        string desc,
        uint256 targetFund,               
        uint256 minContribution,
        uint256 startDate,
        uint256 endDate
    );

    event ContributionReceived(
        address projectAddress,
        uint256 contributedAmount,
        address indexed contributor
    );

    event FundWithdrawn(
        address projectAddress,
        uint256 amountWithdrawn,
        address indexed withdrawer
    );


    error ProjectDoesNotExist(uint256 projectIndex);  

    // @dev Anyone can start a fund rising
    // @return null

    function createProject(
        string  memory _projectTopic,
        string  memory _description,
        uint256 _targetFund,
        uint256 _minimumContribution, 
        IERC20 _acceptedCurrency,     
        uint256 _projectPeriod
        ) external { 
        uint projectIndex = Database.getCrowdFundRecords().projectCounts++;       
        Database.getCrowdFundMappingRecords().Projects[projectIndex] = new Project(_projectTopic,_description,_targetFund, _minimumContribution,_acceptedCurrency,_projectPeriod);      
    }


    // Donate acceptable stable coin by anyone
    function donate(uint256 _projectIndex, uint256 _tokenAmount) external {
        address _user = msg.sender;

        Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];
        if(address(projectAddress) == address(0)){
            revert ProjectDoesNotExist(_projectIndex);
    }
    
        Project(projectAddress).donate(_user, _tokenAmount); // Call function   
        emit ContributionReceived(address(projectAddress),_tokenAmount,_user);// Trigger event 
    }


    // Admin withdraw if project is successful 
    function adminWithdraw(uint256 _projectIndex, uint256 _tokenAmount) external {
        address _user = msg.sender;
        Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];
        if(address(projectAddress) == address(0)){
            revert ProjectDoesNotExist(_projectIndex);
        }
   
        Project(projectAddress).adminWithdraw(_user, _tokenAmount); // Call function   
        emit FundWithdrawn(address(projectAddress),_tokenAmount,_user);// Trigger event 
    }


    // Donor withdraw all donated amount if project is failed

    function donorWithdraw(uint256 _projectIndex) external {
        address _user = msg.sender;

        Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];
        if(address(projectAddress) == address(0)){
            revert ProjectDoesNotExist(_projectIndex);
        }

        uint256 amountDonated = Project(projectAddress).getAmountDonated(_user);
   
        Project(projectAddress).donorWithdraw(_user); // Call function   
        emit FundWithdrawn(address(projectAddress),amountDonated,_user);// Trigger event
    }

    // Get number of projects created
    function returnProjectsCount() external view returns(uint256){
        return  Database.getCrowdFundRecords().projectCounts;
    }

    //Get the details of the last 5 Projects ------- work in progress ------
    function getLast5ProjectDetails() external view  {    
        Database.getCrowdFundRecords().projectCounts;   
    }


    //Get project token balance
    function getProjectBalance(uint256 _projectIndex) external view returns(uint256) {
        Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];   
        return Project(projectAddress).getProjectBalance();  // Call function
    }


    //Get project details
    function getProjectDetails(uint256 _projectIndex) external returns(Database.ProjectState memory) {
        Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];   
        return Project(projectAddress).getProjectDetails();  // Call function
    }

}
