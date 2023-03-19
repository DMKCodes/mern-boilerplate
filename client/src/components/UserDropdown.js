import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectCurrentUser, clearCurrentUser } from '../features/userSlice';
import { 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
    NavItem
} from 'reactstrap';

const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        dispatch(clearCurrentUser());
    };

    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle caret color='light'>
                    {currentUser.username}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavLink className='nav-link' to='/dashboard' style={{ color: 'black' }}>
                            Dashboard
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavItem onClick={() => logout()}>
                            Logout
                        </NavItem>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default UserDropdown;