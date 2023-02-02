import { AiFillHome } from "react-icons/ai"
import { dashboardRoutes, routes } from "../../libs/routes"
import NavLink from "./NavLink"

const SideNav = () => {


    return (
            <div className="w-full mt-10">

                {
                    dashboardRoutes.map((routes, index) => {
                        return <NavLink key={index} icon={routes.icon} name={routes.name} link={routes.link} />
                    })
                }


                <hr className="mx-4 border-gray-500 mt-10" />

                <NavLink name={"Home"} link={"/"} icon={<AiFillHome size={24} />} />

            </div>

    )
}

export default SideNav