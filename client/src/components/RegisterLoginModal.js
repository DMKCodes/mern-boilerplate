import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/userSlice';
import {
    Button,
    Modal,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';
import UserDropdown from './UserDropdown';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const RegisterLoginModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const currentUser = useSelector(selectCurrentUser);

    return (
        <>
            <span className='navbar-text me-md-5'>
                {currentUser ? (
                    <UserDropdown />
                ) : (
                    <Button outline color='light' onClick={() => setModalOpen(true)}>
                        Log In
                    </Button>
                )}
            </span>
            <Modal isOpen={modalOpen}>
                <Nav tabs justified>
                    <NavItem>
                        <NavLink 
                            className={activeTab === 'login' ? 'active' : ''} 
                            onClick={() => setActiveTab('login')}
                            style={{ cursor: 'pointer' }}
                        >
                            Log In
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink 
                            className={activeTab === 'register' ? 'active' : ''} 
                            onClick={() => setActiveTab('register')}
                            style={{ cursor: 'pointer' }}
                        >
                            Register
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='register'>
                        { error ? (
                            <h4 className='p-3'>{errorMsg}</h4>
                        ) : currentUser ? (
                            <h4 className='p-3'>Registration successful! Logging in...</h4>
                        ) : (
                            <RegisterForm 
                                setModalOpen={setModalOpen}
                                setError={setError}
                                setErrorMsg={setErrorMsg}
                                setActiveTab={setActiveTab}
                            />  
                        )}
                    </TabPane>
                    <TabPane tabId='login'>
                        { error ? (
                            <h4 className='p-3'>{errorMsg}</h4>
                        ) : currentUser ? (
                            <h4 className='m-3'>Login successful. Redirecting...</h4>
                        ) : (
                            <LoginForm
                                setModalOpen={setModalOpen}
                                setError={setError}
                                setErrorMsg={setErrorMsg}
                            />
                        )}
                    </TabPane>
                </TabContent>
            </Modal>
        </>
    );
};

export default RegisterLoginModal;