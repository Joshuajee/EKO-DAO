import { ethers } from "ethers"

export const dollarFormat = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT

export const USDC = process.env.NEXT_PUBLIC_USDC

export const EKONFT = process.env.NEXT_PUBLIC_EKONFT

export const EKONFTCERT = process.env.NEXT_PUBLIC_EKONFTCERT

export const EKOTOKEN = process.env.NEXT_PUBLIC_EKOTOKEN

export const API_SERVER = process.env.NEXT_PUBLIC_API

export const networkNameByChainId = (chainId) => {

    switch (chainId) {
        case 1:
            return "Ethereum Mainnet"
        case 5:
            return "Goerli"
        case 56:
            return "BNB Smart Chain Mainnet"
        case 97:
            return "BNB Smart Chain Testnet"
        case 137:
            return "Polygon Mainnet"
        case 80001:
            return "Mumbai"
        default:
            return "Unknown Network"
    }

}

export const getDate = () => {

    const date = new Date()

    const year = date.getFullYear()
    const month = (date.getMonth() + 1 > 10) ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

    return (`${year}-${month}-${date.getDate()}`)

}

export const isEthAddress = (address) => {
    return ethers.utils.isAddress(address)
}

export const convertToEther = (price) => {
    if (!price) return 0
    return (ethers.utils.formatUnits(price.toString(), 'ether')).toString()
}

export const convertToWEI = (amount) => {
    if (!amount) return 0
    return Number(amount) <= 0 ? 0 : ethers.utils.parseUnits(String(amount), 'ether')
}

export const decodeByte32 = (byte32) => {
    return ethers.utils.parseBytes32String(byte32)
}

export const dateToTimeStamp = (date) => {
    return new Date(date).getTime() / 1000
}

export const winnerDetails = (hackathon, address) => {

    const { winner, secondRunnerUp } = hackathon

    if (winner === address) {
        return { status: 0, }
    } else if (winner === address) {

    } else if (winner === address) {

    }


    return null
}