// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '../libraries/LibCrowdFund.sol';
import "../CrowdFundProject.sol";

contract CrowdFundFacet{
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

    function createCampaign(
        string  memory _projectTopic,
        string  memory _description,
        uint256 _targetFund,
        uint256 _minimumDonation, 
        IERC20 _acceptedCurrency,     
        uint256 _projectPeriod
    ) public { 
        address _admin = msg.sender;
        uint projectIndex = Database.getCrowdFundRecords().projectCounts++;       
        Database.getCrowdFundMappingRecords().Projects[projectIndex] = new Project(_admin,_projectTopic,_description,_targetFund, _minimumDonation,_acceptedCurrency,_projectPeriod);

    }


  // Donate acceptable stable coin by anyone
  function donate(uint256 _projectIndex, uint256 _tokenAmount) public {
    address _user = msg.sender;

    Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];
    if(address(projectAddress) == address(0)){
      revert ProjectDoesNotExist(_projectIndex);
    }

    Project(projectAddress).donate(_user, _tokenAmount); // Call function
    //emit ContributionReceived(address(projectAddress),_tokenAmount,_user);// Trigger event
  }

  // Admin withdraw if project is successful

  function adminWithdraw(uint256 _projectIndex, uint256 _tokenAmount) public {
    address _user = msg.sender;

    Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];
    if(address(projectAddress) == address(0)){
      revert ProjectDoesNotExist(_projectIndex);
    }

    Project(projectAddress).adminWithdraw(_user, _tokenAmount); // Call function
    emit FundWithdrawn(address(projectAddress),_tokenAmount,_user);// Trigger event 
  }


  // Donor withdraw all donated amount if project is failed

  function donorWithdraw(uint256 _projectIndex) public {
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
function getLastXProjectDetails(uint X) public view returns(
    Database.ProjectState [] memory ){ 
    uint256 start; 
    uint256 array;
   
    uint256 projectCounts = Database.getCrowdFundRecords().projectCounts; 
    if (X > projectCounts){
        start = 1;        
        array = projectCounts;        
    } 
    else {
        start = projectCounts-X+1;         
        array = X;        
    }  

    Database.ProjectState [] memory lastCampaigns = new Database.ProjectState[](array);
    
    uint256 i=0;
    for (start; start <= projectCounts;){        
        lastCampaigns[i]= getProjectDetails(start-1);
        start++;
        i++;
    }

    return lastCampaigns;
    
}


  //Get project token balance
function getProjectBalance(uint256 _projectIndex) public view returns(uint256) {
    Project projectAddress = Database.getCrowdFundMappingRecords().Projects[_projectIndex];   
    return Project(projectAddress).getProjectBalance();  // Call function
  }


  //Get project details
function getProjectDetails(uint256 _projectIndex) public view returns(Database.ProjectState memory) {
    address projectAddress = address(Database.getCrowdFundMappingRecords().Projects[_projectIndex]);   
    return Project(projectAddress).getProjectDetails();  // Call function
  }




}

