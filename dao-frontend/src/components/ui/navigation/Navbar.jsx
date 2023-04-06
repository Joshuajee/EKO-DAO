import { useState, useContext } from "react"
import Link from "next/link"
import { MdAdminPanelSettings } from "react-icons/md"
import { useScroll } from "@/hooks/windows"
import { navigation } from "@/libs/routes"
import HambuggerMenu from "./HambuggerMenu"
import Connection from "../../connection"
import { AuthContext } from "@/context/AuthContext"


const Navbar = () => {

    const [open, setOpen] = useState(false);

    const { isAdmin, isAdminLoggedIn } = useContext(AuthContext);

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <header className={`${(trigger || open) ? "text-gray-600 bg-white shadow-lg" : "text-black" } fixed w-full body-font z-10 flex justify-center`}>
            <div className="container w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2">
                <Link href={"/"} className="pt-2 md:pt-0 block title-font text-2xl md:text-3xl font-bold text-blue-800">
                    EkoDAO
                </Link>
                <nav className="hidden lg:ml-auto lg:mr-auto md:flex flex-wrap items-center text-base justify-center">
                    {
                        navigation.map((nav, index) => <Link className="mr-2 lg:mr-5 hover:text-gray-900" key={index} href={nav.href}>{nav.name}</Link>)
                    }
                    {
                        isAdmin && <Link className="mr-2 lg:mr-5 hover:text-gray-900" href={"/admin"}>{"Admin"}</Link>
                    }
                </nav>


                <div className="flex md:hidden items-center">
                    { isAdminLoggedIn && <MdAdminPanelSettings size={28} /> }
                    <HambuggerMenu open={open} setOpen={setOpen} /> 
                </div>
            

                <div className="hidden md:flex">
                    { isAdminLoggedIn && <MdAdminPanelSettings size={28} /> }
                    <div className="hidden md:block ml-2"><Connection /></div>
                </div>

            </div>

        </header>
    )
}

export default Navbar