import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import RegisterLoginModal from './RegisterLoginModal';

const Header = () => {
    return (
        <Navbar dark color='success' sticky='top' expand='md'>
            <NavLink className='nav-link ms-md-5' to='/' style={{ color: 'white' }}>
                <h3 className='mt-1'>MERN Boilerplate</h3>
            </NavLink>
            <RegisterLoginModal />
        </Navbar>
    );
};

export default Header;