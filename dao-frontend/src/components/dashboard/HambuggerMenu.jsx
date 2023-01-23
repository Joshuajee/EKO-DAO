import { useState } from 'react';
import { motion } from "framer-motion"
import Hamburger from 'hamburger-react';
import PropTypes from 'prop-types';
import NavLink from './NavLink';
import { dashboardRoutes } from '../../libs/routes';
import { menuAnimate, container } from './animation';
import SideNav from './SideNav';

const HambuggerMenu = ({open, setOpen}) => {

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setOpen(!open)
    }


    return (
        <div className='md:hidden'>

            <Hamburger size={28} toggled={open} toggle={handleClick} />

            <motion.div style={{left: "-280px", top: "80"}}  variants={container} animate={open ? 'show' : 'hidden'}>

                <div 
                    onClick={handleClick} 
                    className={`top-[70px] left-0 w-screen fixed h-screen bg-gray-800 opacity-50`}>

                </div>

                <motion.div 
                    className='left-[-280px] absolute h-full w-[280px] bg-white' 
                    variants={menuAnimate}
                    animate={open ? 'enter' : 'exit'}>

                    <SideNav />

                </motion.div>

            </motion.div>

        </div>
    )
}

HambuggerMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default HambuggerMenu