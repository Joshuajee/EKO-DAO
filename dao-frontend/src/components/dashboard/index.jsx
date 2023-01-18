import PropTypes from 'prop-types';
import SideNav from "./SideNav"
import TopNav from "./TopNav"

const Dashboard = ({children}) => {
    return (
        <div className='block'>
           
            <TopNav />

            <div className="flex">

                <div style={{height: "calc(100vh - 70px)"}} className='basis-56 h-screen'> <SideNav /></div>

                <div className='grow bg-slate-100 overflow-y-auto'> 
                    { children } 
                </div>

            </div>
            
        </div>
    )
}

Dashboard.propTypes = {
    children: PropTypes.node.isRequired
};

export default Dashboard