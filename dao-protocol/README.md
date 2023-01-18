# Ekolance DAO protocol

This folder contains all our smart contracts code, built with hardhat and the diamond standard for making upgradable smart contracts.

## Installation

1. Navigate to `dao-protocol`:
```console
cd dao-protocol
```

2. Install NPM packages:
```console
yarn install
```

## Configuration

Create `.env` file, get your private keys and paste

```sh
    PRIVATE_KEY = Wallet private key
```

## Deployment

```console
npx hardhat run scripts/deploy_dao.js
```

## Run tests: 

```console
npx hardhat test
```

## Facet Information

**Note:** In this implementation the loupe functions are NOT gas optimized. The `facets`, `facetFunctionSelectors`, `facetAddresses` loupe functions are not meant to be called on-chain and may use too much gas or run out of gas when called in on-chain transactions. In this implementation these functions should be called by off-chain software like websites and Javascript libraries etc., where gas costs do not matter as much.

However the `facetAddress` loupe function is gas efficient and can be called in on-chain transactions.


The `contracts/facets/DiamondCutFacet.sol` file shows how to implement the `diamondCut` external function.

The `contracts/facets/DiamondLoupeFacet.sol` file shows how to implement the four standard loupe functions.

The `contracts/libraries/LibDiamond.sol` file shows how to implement Diamond Storage and a `diamondCut` internal function.

The `scripts/deploy.js` file shows how to deploy a diamond.

The `test/diamondTest.js` file gives tests for the `diamondCut` function and the Diamond Loupe functions.

## Calling Diamond Functions

In order to call a function that exists in a diamond you need to use the ABI information of the facet that has the function.

Here is an example that uses web3.js:

```javascript
const myUsefulFacet = new web3.eth.Contract(MyUsefulFacet.abi, diamondAddress);
```

In the code above we create a contract variable so we can call contract functions with it.

In this example we know we will use a diamond because we pass a diamond's address as the second argument. But we are using an ABI from the MyUsefulFacet facet so we can call functions that are defined in that facet. MyUsefulFacet's functions must have been added to the diamond (using diamondCut) in order for the diamond to use the function information provided by the ABI of course.

Here is another example that uses hardhat:

```javascript
const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
```

Similarly you need to use the ABI of a facet in Solidity code in order to call functions from a diamond. Here's an example of Solidity code that calls a function from a diamond:

```solidity
string result = MyUsefulFacet(address(diamondContract)).getResult()
```


