import PropTypes from 'prop-types';
import Footer from './navigation/Footer';
import Navbar from './navigation/Navbar';


const Layout = ({children}) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow bg-slate-50'>{children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout