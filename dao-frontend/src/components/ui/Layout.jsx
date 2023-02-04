import PropTypes from 'prop-types';
import Footer from './Footer';
import Navbar from './Navbar';


const Layout = ({children}) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow'>{children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout