export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const proposals = Array(10).fill({ 
    id: 100,
    date: "FEB 03 2023", 
    topic: "Maker Teleport Temporary Shutdown, DAI Transfers, Starknet Contract Deauthorizations",
    content: "Temporarily shut down the L2 side of the teleport bridge on Optimism, Arbitrum, and Starknet; DAI transfers for SPF funding, Tech-Ops Core Unit, and GovComms severance; deauthorize the old Starknet contracts."
})

export const proposalsDummy = proposals.map((proposal, index) => {
    return { ...proposal, id: 1000 + index, yes: getRandomInt(0, 1000000), no: getRandomInt(0, 1000000)  }
})


export const voters = Array(20).fill({ 
    address: "0x5103BC779fdd4799Cfd5efC6ee827F7B1D57789B",
    choice:  "Yes"
})


export const votersDummy = voters.map((voter, index) => {
    return { ...voter, choice: index % 2 === 0 ? "Yes" : "No"  }
})