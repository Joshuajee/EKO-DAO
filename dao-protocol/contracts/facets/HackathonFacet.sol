// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./LibHackFund.sol";
import "./Hackathon.sol";

contract HackathonFacet {

    // custom errors
     error HackathonNotFound();
     error WrongStartAndCountInput();
     error InvalidCountInput();

    function _existingHackathon(uint hackID) private view{
        if (hackID == 0) revert HackathonNotFound();
        if (hackID > LibHackFund.getHackathonTracker().hackathonCount) revert HackathonNotFound();
    }

    modifier existingHackathon(uint hackID) {
        _existingHackathon(hackID);
        _;
    }

    function _minmaxcount(uint a) private pure{
        if (a > 50 || a < 0) revert InvalidCountInput();
    }

    modifier minmaxcount(uint a){
        _minmaxcount(a);
        _;
    } 


    function newHackathon (
        string memory _name,
        string memory _description, 
        uint _startDate,
        uint _endDate, 
        uint16 _maxNumAdmittable, 
        uint _winnerPercentage, 
        uint _firstRunnerUpPercentage, 
        uint _secondRunnerUpPercentage,
        uint _minScoreTokenRequiurement
    ) external {
        address _author = msg.sender;
        LibHackFund.getHackathonTracker().hackathonCount++;
        LibHackFund.getHackathonTracker().Hackathons[LibHackFund.getHackathonTracker().hackathonCount] = new Hackathon(
            LibHackFund.getHackathonTracker().hackathonCount,
            _author,
            _name,
            _description,
            _startDate,
            _endDate,
            _maxNumAdmittable,
            _winnerPercentage,
            _firstRunnerUpPercentage,
            _secondRunnerUpPercentage,
            _minScoreTokenRequiurement
            );
    }


    function initializeHackathon(
        uint hackID,
        IERC20 _acceptedCurrency,
        IERC20 _scoretoken
      ) external existingHackathon(hackID) {
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).initializeHackathon(_acceptedCurrency, _scoretoken);
      }

    function register(uint hackID) existingHackathon(hackID) external {
        // address _participant = msg.sender;
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).register();
    }

    function getHackathon(
        uint hackID
        ) existingHackathon(hackID) view external returns (LibHackFund.Hack memory){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).getHackathon();
    }

    function getAcceptedCurrencyAndScoreToken(
        uint hackID
        ) existingHackathon(hackID) view external returns (IERC20, IERC20){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).getAcceptedCurrencyAndScoreToken();
    }

    function isParticipant(
        uint hackID,
        address participant
        ) existingHackathon(hackID) view external returns (bool){
        return Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).isParticipant(participant);
    }

    function fundHackathon(uint hackID, uint256 _amount) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).fundHackathon(_amount);
    }

    function startHackathon(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).startHackathon();
    }

    function endHackathon(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).endHackathon();
    }

    function setWinner(uint hackID, address _winner) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).setWinner(_winner);
    }

    function setFirstRunnerUp(uint hackID, address _firstRunnerUp) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).setFirstRunnerUp(_firstRunnerUp);
    }

    function setSecondRunnerUp(uint hackID, address _secondRunnerUp) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).setSecondRunnerUp(_secondRunnerUp);
    }

    function refundScoreTokens(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).refundScoreTokens();
    }

    function winnerWithdrawal(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).winnerWithdrawal();
    }

    function firstRunnerUpWithdrawal(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).firstRunnerUpWithdrawal();
    }

    function secondRunnerUpWithdrawal(uint hackID) existingHackathon(hackID) external{
        Hackathon(LibHackFund.getHackathonTracker().Hackathons[hackID]).secondRunnerUpWithdrawal();
    }

    function numberofHackathons() external view returns(uint) {
        return LibHackFund.getHackathonTracker().hackathonCount;
    }

    // function to retur hackathons within a specific range
    function getHackathons(
        uint start,
        uint8 count
        ) existingHackathon(start) minmaxcount(count) external view returns (LibHackFund.Hack[] memory) {
            if (start < count) revert WrongStartAndCountInput();

            uint counter = start - count;

             LibHackFund.HackathonsTracker storage hackTracker = LibHackFund.getHackathonTracker() ;
            
             
            LibHackFund.Hack[] memory Hackathons = new LibHackFund.Hack[](count);

            uint count1;
            for (uint i = start; i > counter; i--){

                Hackathons[count1] = hackTracker.Hackathons[i].getHackathon();
                count1++;
                continue;
            }

            return Hackathons;
    }

}
