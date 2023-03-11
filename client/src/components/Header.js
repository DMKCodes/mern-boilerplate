import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Collapse,
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
                <h3 className='mt-1'>Mern Boilerplate</h3>
            </NavbarBrand>
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
            <Collapse isOpen={menuOpen} navbar>
                <RegisterLoginModal />
            </Collapse>
        </Navbar>
    )
};

export default Header;