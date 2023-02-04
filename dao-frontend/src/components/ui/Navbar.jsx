import { links } from "@/libs/routes"
import Link from "next/link"
//import ConnectionBtn from "../connection/button"

const navigation = [
    { name: 'Join Cohort', href: links.cohorts },
    { name: 'Proposals', href: links.proposals },
    { name: 'Hackathons', href: links.hackathons },
    { name: 'CrowdFunding', href: links.crowdfunding }
]

const Navbar = () => {
    return (
        <header class="absolute w-full text-gray-600 body-font z-10 ">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href={"/"} class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span class="ml-3 text-3xl font-bold text-blue-800">EkoDAO</span>
                </Link>
                <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    {
                        navigation.map((nav, index) => <Link className="mr-5 hover:text-gray-900" key={index} href={nav.href}>{nav.name}</Link>)
                    }
                </nav>
                <button className="bg-blue-700 rounded-lg hover:bg-blue-500 text-white py-2 px-8"> Connect Wallet </button>
            </div>
         </header>
    )
}

export default Navbar