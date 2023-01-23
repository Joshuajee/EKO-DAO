import { MdDashboard } from "react-icons/md";
import { FaVoteYea, FaHandsHelping, FaAward } from "react-icons/fa";


export const routes = {
    dashboard: "/dashboard"
}

export const dashboardRoutes = [
    {name: "Dashboard", link: "/dashboard", icon: <MdDashboard size={24} />},
    {name: "Proposals", link: "/proposals", icon: <FaVoteYea size={24} />},
    {name: "Hackathons", link: "/hackathons", icon: <FaAward size={24} />},
    {name: "CrowdFunding", link: "/crowd-funding", icon: <FaHandsHelping size={24} />},
]