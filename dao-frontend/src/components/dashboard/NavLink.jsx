import Link from "next/link"
import { useRouter } from "next/router";
import PropTypes from 'prop-types';

const NavLink = ({name, link, icon}) => {

    const { asPath } = useRouter()


    return (
        <Link className={`${ asPath === link && "bg-gray-300"} flex flex-col h-12 justify-center w-full text-gray-600 hover:text-gray-900`} href={link}>
                
            <div className="flex pl-6"> 

                <div> {icon} </div>

                <p className="ml-4">{name}</p> 

            </div>

        </Link>
    )

}

NavLink.prototype = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default NavLink