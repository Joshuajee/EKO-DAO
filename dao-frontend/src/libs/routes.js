import { MdDashboard, MdSchool } from "react-icons/md";
import { FaVoteYea, FaHandsHelping, FaAward } from "react-icons/fa";
import { GrMoney } from "react-icons/gr"


export const links = {
    cohorts: "/cohorts",
    proposals: "/proposals",
    hackathons: "/hackathons",
    crowdfunding: "/crowdfunding",
    faucet: "/faucet",
}

export const navigation = [
    { name: 'Join Cohort', href: links.cohorts, icon: <MdSchool size={24} /> },
    { name: 'Proposals', href: links.proposals, icon: <FaVoteYea size={24} /> },
    { name: 'Hackathons', href: links.hackathons, icon: <FaAward size={24} /> },
    { name: 'CrowdFunding', href: links.crowdfunding, icon: <FaHandsHelping size={24} /> },
    { name: 'Get Free Coin', href: links.faucet, icon: <GrMoney size={24} /> }
]


export const tabs = [
    {name: "All", link: ""},
    {name: "Active", link: "?tab=active"},
    {name: "Won", link: "?tab=won"},
    {name: "Lost", link: "?tab=lost"}
]

export const tabsTwo = [
    {name: "All", link: ""},
    {name: "Active", link: "?tab=active"},
    {name: "Completed", link: "?tab=completed"},
]