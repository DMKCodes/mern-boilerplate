import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCurrentUser } from '../features/user/userSlice';
import { 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap';

const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div>
            <Dropdown isOpen={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle caret color='light'>{currentUser.username}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavLink className='nav-link' to='/dashboard' style={{ color: 'black' }}>
                            Dashboard
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default UserDropdown;