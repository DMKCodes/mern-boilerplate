import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler
} from 'reactstrap';
import RegisterLoginModal from './RegisterLoginModal';
import { selectCurrentUser } from '../features/user/userSlice';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Navbar dark color='success' sticky='top' expand='md'>
            <NavbarBrand className='ms-5' href='/'>
                <h3 className='mt-1'>MERN Boilerplate</h3>
            </NavbarBrand>
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
            <Collapse isOpen={menuOpen} navbar className='me-5'>
                <Nav className='ms-auto' navbar>
                    {currentUser &&
                        <NavItem>
                            <NavLink className='nav-link me-3' to='/dashboard'>
                                Dashboard
                            </NavLink>
                        </NavItem>
                    }
                </Nav>
                <RegisterLoginModal />
            </Collapse>
        </Navbar>
    );
};

export default Header;