import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser, setAdmin } from '../features/user/userSlice';
import axios from 'axios';
import {
    Button,
    Col,
    FormGroup,
    Label,
    Modal,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';

const RegisterLoginModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('register');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const handleRegisterSubmit = async (values) => {
        try {
            await axios.post('http://localhost:5000/users/register', values);
            handleLoginSubmit(values);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError(true);
                setErrorMsg(error.response.data.error);
                setTimeout(() => {
                    setModalOpen(false);
                    setError(false);
                }, '3000');
            } else {
                setError(true);
                setErrorMsg('Internal error, please try again.  Redirecting...');
                setTimeout(() => {
                    setModalOpen(false);
                    setError(false);
                }, '3000');
            }
        }};

    const handleLoginSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/users/login', values);
            if (response.admin) {
                dispatch(setAdmin(true));
            }
            const user = {
                username: values.username,
                email: values.email,
                token: response.data.token
            };
            dispatch(setCurrentUser(user));
            setTimeout(() => {
                setModalOpen(false);
                setError(false);
            }, '2000');
        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(true);
                setErrorMsg(`${error.response.data.error}, please try again.  Redirecting...`);
                setTimeout(() => {
                    setModalOpen(false);
                    setError(false);
                }, '3000');
            } else {
                setError(true);
                setErrorMsg('Internal error, please try again.  Redirecting...');
                setTimeout(() => {
                    setModalOpen(false);
                    setError(false);
                }, '3000');
            }
        }
    };

    return (
        <>
            <span className='navbar-text ml-auto'>
                {currentUser ? (
                    <div>
                        {currentUser.username}
                    </div>
                ) : (
                    <Button outline color='light' onClick={() => setModalOpen(true)}>
                        Register/Login
                    </Button>
                )}
            </span>
            <Modal isOpen={modalOpen}>
                <Nav tabs justified>
                    <NavItem>
                        <NavLink 
                            className={activeTab === 'register' ? 'active' : ''} 
                            onClick={() => setActiveTab('register')}
                        >
                            Register
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink 
                            className={activeTab === 'login' ? 'active' : ''} 
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='register'>
                        { error ? (
                            <h4 className='p-3'>{errorMsg}</h4>
                        ) : !currentUser ? (
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                    email: ''
                                }}
                                onSubmit={handleRegisterSubmit}
                            >
                                <Form className='p-3'>
                                    <FormGroup row>
                                        <Label htmlFor='username' md='3'>
                                            Username: 
                                        </Label>
                                        <Col md='9'>
                                            <Field 
                                                name='username'
                                                placeholder='username'
                                                className='form-control'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor='password' md='3'>
                                            Password: 
                                        </Label>
                                        <Col md='9'>
                                            <Field 
                                                name='password'
                                                placeholder='password'
                                                className='form-control'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor='email' md='3'>
                                            Email: 
                                        </Label>
                                        <Col md='9'>
                                            <Field 
                                                name='email'
                                                placeholder='email'
                                                className='form-control'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label check htmlFor='admin' md='3'>
                                            Admin?
                                        </Label>
                                        <Col md='9'>
                                            <Field
                                                name='admin'
                                                type='checkbox'
                                                className='form-check-input'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className='d-flex justify-content-center'>
                                            <Button type='submit' color='primary' className='me-3'>
                                                Register
                                            </Button>
                                            <Button type='submit' color='secondary' onClick={() => setModalOpen(false)}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Formik>
                        ) : (
                            <h4 className='p-3'>Registration successful.  Logging in...</h4>
                        )}
                    </TabPane>
                    <TabPane tabId='login'>
                        { error ? (
                            <h4 className='p-3'>{errorMsg}</h4>
                        ) : !currentUser ? (
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: ''
                                }}
                                onSubmit={handleLoginSubmit}
                            >
                                <Form className='p-3'>
                                    <FormGroup row>
                                        <Label htmlFor='username' md='3'>
                                            Username: 
                                        </Label>
                                        <Col md='9'>
                                            <Field 
                                                name='username'
                                                placeholder='username'
                                                className='form-control'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor='password' md='3'>
                                            Password: 
                                        </Label>
                                        <Col md='9'>
                                            <Field 
                                                name='password'
                                                placeholder='password'
                                                className='form-control'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className='d-flex justify-content-center'>
                                            <Button type='submit' color='primary' className='me-3'>
                                                Login
                                            </Button>
                                            <Button color='secondary' onClick={() => setModalOpen(false)}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Formik>
                        ) : (
                            <h4 className='m-3'>Login successful.  Redirecting...</h4>
                        )}
                    </TabPane>
                </TabContent>
            </Modal>
        </>
    );
};

export default RegisterLoginModal;