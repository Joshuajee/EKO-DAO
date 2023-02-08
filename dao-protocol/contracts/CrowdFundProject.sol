//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

import "./libraries/LibCrowdFund.sol";

interface IERC20 {
  function transfer(address to, uint256 amount) external returns (bool);

  function balanceOf(address account) external view returns (uint256);

  function symbol() external view returns (string memory);

  function decimals() external view returns (uint8);

  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);
}

contract Project {
  //Instance of a stable Coin
  IERC20 stableCoin;

  //events
  event adminWithdrawal(
    uint256 amountWithdraw,
    uint256 fundBalance,
    uint256 transactionDate
  );

  event donorWithdrawal(
    address donor,
    uint256 amountWithdraw,
    uint256 transactionDate
  );

  event FundingReceived(
    address contributor,
    uint256 amount,
    uint256 currentTotal
  );

  event ProjectDetails(
    address projectAddress,
    string projectTopic,
    string description,
    uint256 targetFund,
    uint256 minimumContribution
  );

  //Custom Error
  error Unauthorized();
  error ProjectExpired();
  error ProjectIsYetToExpired();
  error ProjectNotSucessful();
  error ProjectIsSucessful();
  error StableCoinTranferFailed();
  error zeroDonation();
  error AmountBelowTheMinimun();

  //modifiers
  modifier isAdmin() {
    if (msg.sender != LibCrowdFund.getProjectRecords().admin)
      revert Unauthorized();
    _;
  }

  modifier isExpired() {
    if (block.timestamp > LibCrowdFund.getProjectRecords().endDate)
      revert ProjectExpired();
    LibCrowdFund.getProjectRecords().status = Status.Expired;
    _;
  }

  modifier isSucessful() {
    if (LibCrowdFund.getProjectRecords().status != Status.Successful)
      revert ProjectNotSucessful();
    _;
  }

  modifier isFailed() {
    if (LibCrowdFund.getProjectRecords().status == Status.Successful)
      revert ProjectIsSucessful();
    _;
  }

  // @dev Create project

  constructor(
    address _admin,
    string memory _projectTopic,
    string memory _description,
    uint256 _targetFund,
    uint256 _minimumContribution,
    IERC20 _acceptedCurrency,
    uint256 _projectPeriod
  ) {
    LibCrowdFund.ProjectState storage state = LibCrowdFund.getProjectRecords();
    state.admin = _admin;
    state.projectAddress = address(this);
    state.projectTopic = _projectTopic;
    state.description = _description;
    state.targetFund = _targetFund;
    state.minimumContribution = _minimumContribution;
    stableCoin = _acceptedCurrency;
    state.totalRecievedFund = 0;
    state.amountWithdraw = 0;
    state.fundBalance = 0;
    state.noOfContributors;
    state.endDate = block.timestamp + _projectPeriod;
    state.status = Status.Fundraising;

    emit ProjectDetails(
      address(this),
      _projectTopic,
      _description,
      _targetFund,
      _minimumContribution
    );
  }

  // view contract current balance
  function getProjectBalance() public view returns (uint256 balance) {
    balance =
      stableCoin.balanceOf(address(this)) /
      (10 ** stableCoin.decimals());
  }

  //View project descriptions
  function getProjectDetails()
    public
    pure
    returns (LibCrowdFund.ProjectState memory details)
  {
    details = LibCrowdFund.getProjectRecords();
  }

  //View amount donated by a donor
  function getAmountDonated(
    address _user
  ) public view returns (uint256 amountDonated) {
    amountDonated = LibCrowdFund.getProjectMappingRecords().contributor[_user];
    if (amountDonated == 0) {
      revert zeroDonation();
    }
  }

  //@dev:Allow anyone to donate the accepted stable Coin if the project is still active

  function donate(address _user, uint256 _amount) public isExpired {
    LibCrowdFund.ProjectState storage state = LibCrowdFund.getProjectRecords(); //instance state variables

    if (_amount < state.minimumContribution) {
      revert AmountBelowTheMinimun();
    }

    bool success = stableCoin.transferFrom(_user, address(this), _amount);
    if (!success) revert StableCoinTranferFailed();

    if (LibCrowdFund.getProjectMappingRecords().contributor[_user] == 0) {
      //validate user is a new donor before inreament the number of contributors
      state.noOfContributors++;
    }

    LibCrowdFund.getProjectMappingRecords().contributor[_user] += _amount; //map donation to contributor
    state.totalRecievedFund += _amount; // update the total recived fund
    state.fundBalance += _amount; //update balance

    if (state.totalRecievedFund > state.targetFund) {
      state.status = Status.Successful;
    }

    emit FundingReceived(_user, _amount, state.totalRecievedFund);
  }

  //@dev:Allow admin to withdraw if the project is successful
  function adminWithdraw(address _user, uint _amount) public isSucessful {
    if (_user != LibCrowdFund.getProjectRecords().admin) revert Unauthorized(); //validate admin

    LibCrowdFund.ProjectState storage state = LibCrowdFund.getProjectRecords(); //get state variables location

    state.fundBalance -= _amount; //update balance
    state.amountWithdraw += _amount; //update amount withdrawn

    bool success = stableCoin.transfer(_user, _amount); //withdraw to admin account
    if (!success) revert StableCoinTranferFailed();

    emit adminWithdrawal(_amount, state.fundBalance, block.timestamp);
  }

  //@dev:Allow donors to withdraw if the Project is failed
  function donorWithdraw(address _user) public isFailed {
    if (block.timestamp < LibCrowdFund.getProjectRecords().endDate)
      revert ProjectIsYetToExpired();

    LibCrowdFund.ProjectState storage state = LibCrowdFund.getProjectRecords();

    uint256 amount = LibCrowdFund.getProjectMappingRecords().contributor[_user];
    if (amount == 0) revert zeroDonation();

    delete LibCrowdFund.getProjectMappingRecords().contributor[_user]; // delete the donor records
    state.amountWithdraw += amount; //update withdraw amount
    state.fundBalance -= amount; //update the fundbalance

    bool success = stableCoin.transfer(msg.sender, amount);
    if (!success) revert StableCoinTranferFailed();

    emit donorWithdrawal(_user, amount, block.timestamp);
  }
}
