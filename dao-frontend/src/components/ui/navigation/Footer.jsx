import Link from "next/link"
import { navigation } from "@/libs/routes"
import { AiFillGithub } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import { BsTwitter } from "react-icons/bs"

const Footer = () => {
    return (
        <footer className="p-4 bg-blue-600 text-slate-200 shadow md:px-6 md:py-8 font-medium text-sm">

            {/* <nav class="lg:ml-auto lg:mr-auto flex flex-wrap flex-col md:flex-row text-base">
                {
                   navigation.map((nav, index) => <Link className="mr-2 lg:mr-5 my-2 md:my-0 font-medium hover:text-white" key={index} href={nav.href}>{nav.name}</Link>)
                }
            </nav> */}

            <div class="flex justify-between mt-4 text-white">

                <p>All right reserved,  &copy;  2023 EkoDAO</p>

                <div className="flex">

                    <a className="mr-2 hover:text-white" target={"_blank"} rel="noreferrer" href="https://t.co/DJBIhBckzr">  <FaDiscord size={24} />  </a>   

                    <a className="mr-2 hover:text-white" target={"_blank"} rel="noreferrer" href="https://github.com/Joshuajee/EKO-DAO"> <AiFillGithub size={24} /> </a>

                    <a className="hover:text-white" target={"_blank"} rel="noreferrer" href="https://twitter.com/ekolance"> <BsTwitter size={24} /> </a>

                </div>
                
            </div>

        </footer>
    )
}

export default Footer