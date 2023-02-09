const { impersonateAccount, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const ERC20ABI = require("@openzeppelin/contracts/build/contracts/ERC20.json").abi;

describe("CrowdFunding Facet test", () => {

    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";    
    const USDCHolder1 = "0xda9ce944a37d218c3302f6b82a094844c6eceb17";
    const USDCHolder2 = "0x1b7baa734c00298b9429b518d621753bb0f6eff2";

    //inputs to CrowdFunding campaign project creation
    const projectTitle = "Ekolance";
    const projectDec = "Ekolance Solidity Training Workshop";
    const targetFund = ethers.utils.parseUnits("4000", 6);
    const minimumContribution = ethers.utils.parseUnits("50", 6);
    const projectPeriod = 60*60*24*7; // in seconds (1 week)

    //input to test cases
    const AmountToDonate = 1000;
    const CampaignIndex = 0;
    

    CrowdFundingFixture = async () => {
        await impersonateAccount(USDCHolder1);
        await impersonateAccount(USDCHolder2);

        const USDCHolder1_signer = await ethers.getSigner(USDCHolder1);
        const USDCHolder2_signer = await ethers.getSigner(USDCHolder2);

        [owner] = await ethers.getSigners();

        //get the instance of stableCoin and CrowdFunding contracts
        const CrowdFundingFacet = await ethers.getContractFactory("CrowdFundFacet");
        const CrowdFundingFacetInstance = await CrowdFundingFacet.deploy();
        const USDCContractInstance = await new ethers.Contract(USDC,ERC20ABI,USDCHolder1_signer); 
        const TokenDecimal = await USDCContractInstance.decimals();
        
        //get the balance of the USDC holders 
        const USDCBalanceOfHolder1 = await USDCContractInstance.balanceOf(USDCHolder1);
        const USDCBalanceOfHolder2 = await USDCContractInstance.connect(USDCHolder2_signer).balanceOf(USDCHolder2);
        
        console.log("The USDC balance of USDCHolder1 is ", ethers.utils.formatUnits(USDCBalanceOfHolder1.toString(),5));
        console.log("The USDC balance of USDCHolder2 is ", ethers.utils.formatUnits(USDCBalanceOfHolder2.toString(),5));

        //send ether to one of the USDCHolder for EVM transactions  
        await owner.sendTransaction({to:USDCHolder1, value:ethers.utils.parseUnits("50",18)});

        //create an instance of CrowdFunding Campaign contract
        await CrowdFundingFacetInstance.createCampaign(projectTitle,projectDec,targetFund,minimumContribution,USDC,projectPeriod);  
        const CampaignContract = {...(await CrowdFundingFacetInstance.getProjectDetails(CampaignIndex))}.projectAddress
        const Project = await ethers.getContractFactory("Project");
        const CampaignContractInstance  = await Project.attach(CampaignContract);
        //const CampaignContractInstance =  await new ethers.Contract(CampaignContract,ProjectABI,USDCHolder1_signer)


        return {USDCHolder1_signer,USDCHolder2_signer,owner, CrowdFundingFacetInstance, USDCContractInstance, CampaignContract,TokenDecimal, CampaignContractInstance }
    }

    it("should create project campaign contract and increment project count", async() => {
        const { CrowdFundingFacetInstance} = await loadFixture(CrowdFundingFixture);

        await CrowdFundingFacetInstance.createCampaign(projectTitle,projectDec,targetFund,minimumContribution,USDC,projectPeriod);  
        await CrowdFundingFacetInstance.createCampaign(projectTitle,projectDec,targetFund,minimumContribution,USDC,projectPeriod);       
        const ProjectContract1 = {...(await CrowdFundingFacetInstance.getProjectDetails(1))}.projectAddress
        const ProjectContract2 = {...(await CrowdFundingFacetInstance.getProjectDetails(2))}.projectAddress       
        
        expect(ProjectContract1).to.be.properAddress;
        expect(ProjectContract2).to.be.properAddress; 
        expect(await CrowdFundingFacetInstance.returnProjectsCount()).to.equal(3);      
        
    }) 

                            
    it("should allow anyone to donate", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,
            USDCHolder1_signer, CampaignContract, TokenDecimal} = await loadFixture(CrowdFundingFixture);

        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal);

        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);               

        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex,DonatedAmount)).to.changeTokenBalances(
            USDCContractInstance, [USDCHolder1,CampaignContract],[-DonatedAmount,DonatedAmount]
            );
    })

    it("should reject donation if below the minimum expected donation ", async() =>{        

        const { USDCContractInstance, CrowdFundingFacetInstance,
            USDCHolder1_signer, CampaignContract, CampaignContractInstance} = await loadFixture(CrowdFundingFixture);       
        

        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, AmountToDonate);
        
        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex,AmountToDonate)).to.be.revertedWithCustomError(CampaignContractInstance,"AmountBelowTheMinimun")
    })

    it("should reject donation if the campaign period has expired", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,CampaignContractInstance,
            USDCHolder1_signer, CampaignContract, TokenDecimal} = await loadFixture(CrowdFundingFixture);
        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal);
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);
        
        await ethers.provider.send("evm_increaseTime", [projectPeriod]) // add 10 seconds
        await ethers.provider.send("evm_mine", []) // force mine the next block) 

        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex,DonatedAmount)).to.be.revertedWithCustomError(CampaignContractInstance,'ProjectExpired')
            
            
    })

    it("should allow admin to withdraw if the project is successful", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,owner,
            USDCHolder1_signer, CampaignContract, TokenDecimal} = await loadFixture(CrowdFundingFixture);
        
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, targetFund);     
           
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, targetFund) 

        await expect(CrowdFundingFacetInstance.adminWithdraw(CampaignIndex, targetFund)).to.changeTokenBalances(
            USDCContractInstance, [CampaignContract,owner],[-targetFund,targetFund]);
            
    })

    it("should reject admin withdrawal if the project is ongoing and yet to be successful", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,CampaignContractInstance,
            CampaignContract,USDCHolder1_signer,TokenDecimal} = await loadFixture(CrowdFundingFixture);
       
        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal);  
                                              
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);       
                   
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, DonatedAmount);
        
        await expect(CrowdFundingFacetInstance.adminWithdraw(
            CampaignIndex, DonatedAmount)).to.be.revertedWithCustomError(CampaignContractInstance,'ProjectNotSucessful')
                
    })

    it("should reject adminWithdrawal if not the Admin when the project is successful", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,CampaignContractInstance,
            CampaignContract,USDCHolder1_signer,TokenDecimal} = await loadFixture(CrowdFundingFixture);
       
        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal);  
                                              
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);       
                   
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, DonatedAmount);                
        
        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).adminWithdraw(
            CampaignIndex, DonatedAmount)).to.be.revertedWithCustomError(CampaignContractInstance,'Unauthorized')
    })

    it("should allow donor to withdraw if project failed", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,
            CampaignContract,USDCHolder1_signer,TokenDecimal} = await loadFixture(CrowdFundingFixture);
       
        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal);  
                                              
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);       
                   
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, DonatedAmount); 
        
        await ethers.provider.send("evm_increaseTime", [projectPeriod]) // add 10 seconds
        await ethers.provider.send("evm_mine", []) // force mine the next block) 
        
        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donorWithdraw(
            CampaignIndex)).to.changeTokenBalances(USDCContractInstance, 
                [CampaignContract,USDCHolder1],[-DonatedAmount,DonatedAmount]);
    })

    it("should reject donorWithdrawal if campaign project is still ongoing", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,CampaignContractInstance,
            CampaignContract,USDCHolder1_signer,TokenDecimal} = await loadFixture(CrowdFundingFixture);     
        
        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal); 
            
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);       
                   
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, DonatedAmount);                
        
        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donorWithdraw(
            CampaignIndex)).to.be.revertedWithCustomError(CampaignContractInstance,'ProjectIsYetToExpired')
              
                                                                      
    }) 
    
    it("should reject donorWithdrawal if campaign project is successful", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,CampaignContractInstance,
            CampaignContract,USDCHolder1_signer,TokenDecimal} = await loadFixture(CrowdFundingFixture);
       
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, targetFund);       
                   
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, targetFund);  
        
        await ethers.provider.send("evm_increaseTime", [projectPeriod]) // add 10 seconds
        await ethers.provider.send("evm_mine", []) // force mine the next block) 

        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donorWithdraw(
            CampaignIndex)).to.be.revertedWithCustomError(CampaignContractInstance,"ProjectIsSucessful")             
                                                                      
    })  
    
    it("should reject donorWithdrawal if user has no amount donated", async() => {
        const { USDCContractInstance, CrowdFundingFacetInstance,CampaignContractInstance,
            CampaignContract,USDCHolder1_signer,TokenDecimal} = await loadFixture(CrowdFundingFixture);
       
        const DonatedAmount = ethers.utils.parseUnits(AmountToDonate.toString(),TokenDecimal);  
                                              
        await USDCContractInstance.connect(USDCHolder1_signer).approve(
            CampaignContract, DonatedAmount);       
                   
        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donate(
            CampaignIndex, DonatedAmount);  
        
        await ethers.provider.send("evm_increaseTime", [projectPeriod]) // add 10 seconds
        await ethers.provider.send("evm_mine", []) // force mine the next block) 

        await CrowdFundingFacetInstance.connect(USDCHolder1_signer).donorWithdraw(CampaignIndex);

        await expect(CrowdFundingFacetInstance.connect(USDCHolder1_signer).donorWithdraw(
            CampaignIndex)).to.be.revertedWithCustomError(CampaignContractInstance,"zeroDonation")  
                                                                      
    })                                                               
        
    
})







