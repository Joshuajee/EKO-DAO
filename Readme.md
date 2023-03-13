# Ekolance DAO Application.

The Ekolance DAO is a web3 platform that can be used by authorized Ekolance administrators to manage crowdfunding campaigns, student commitments, hackathon funds, community improvement proposals etc. strictly using Stable coins.

Crowdfunding Campaigns allows the Ekolance community to get contributions in stable coins from the general public for various activities, events etc. that they would like to host across the world. Raised amount and funds withdrawal are publicly visible.

Student commitments allows students to commit a certain amount of money ahead of any Ekolance programme they want to participate in, and on completion of the programme/reception of the certificate, they can claim this amount back. When this money is committed the students are to receive some ekoStable tokens which represents the amount that was deposited, e.g if USDC was deposited, students will receive ekoUSDC which will be burnt to claim back the USDC in the commitment pool. The amount of commitment for each programme can be provided as an input by Ekolance administrators and a separate commitment pool can be created for each cohort and each programme. Students from one commitment pool are not be able to claim funds from other commitment pools. Admins are able to claim all left over funds from the pool at the end of the programme.
NB: only commitment pools can issue ekoStables

Hackathon funds are very similar to crowdfunds. Ekolance administrators can create a hackathon , and concurrently a pool is set up for sponsors and contributors to fund the hackathon. There would also be functionalities to admit participants to the hackathon based on certain score criteria and award winning participants based on predefined proportions (amount to be paid to 1st, 2nd place, 3rd place etc.). Students applying for a hackathon must hold a certain amount of score tokens based on the hackathon specification. During the period of the hackathon, the score tokens would be non-transferable. A certain amount of the Score tokens would also be staked by the student and returned to the student on submission of the hackathon

The Community Improvement Proposal allows the Ekolance administrators to raise proposals and get votes from community members on which proposal to go for. Community members will hold a certain amount of Ekotokens to vote proposals, and results are publicly available.

## Project Structure

This project contains two folders.

- `dao-frontend`: This folder contains our frontend code, built with Nextjs.
- `dao-protocol`: This folder contains all our smart contracts code, built with hardhat and the diamond standard for making upgradable smart contracts.

## Installation
1. Clone this repo:
2. Navigate to any of the folders and follow the readme.md file instructions.

### Mock Token Address on Polygon Testnet Mumbai

USDC:  0x5679C57F0becc7Fd063E47D5F2DDfA5d97687854
EkoStable:  0x1076579bf47c78Fb4d9af38BAFAf067d77bf64a0
EkoNFT:  0x3bB009bC5289D75394Bb06ecA7cAf537281E363D
EkoNFTCert: 0xCfe50B893F8f32e17f16DB847716b7e2A480D6B5
  