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
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const RegisterLoginModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('register');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const valSchema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email format.')
            .required('Required.'),
        username: yup
            .string()
            .min(4, 'Must be at least 4 characters.')
            .max(16, 'Cannot be more than 16 characters.')
            .required('Required.'),
        password: yup
            .string()
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[0-9]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special character."
            )
            .required('Required.'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords do not match.')
            .required('Required.')
    });

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
                                    email: '',
                                    admin: false
                                }}
                                // onBlur={handleBlur}
                                validationSchema={valSchema}
                                onSubmit={handleRegisterSubmit}
                            >
                                {(formik) => {
                                    const { errors, touched } = formik;
                                    return (
                                        <Form className='p-3'>
                                            <FormGroup row>
                                                <Label htmlFor='username' md='3'>
                                                    Username: 
                                                </Label>
                                                <Col md='9'>
                                                    <Field 
                                                        name='username'
                                                        placeholder='username'
                                                        className={`form-control${errors.username && touched.username ? ' is-invalid' : ''}`}
                                                    />
                                                    {errors.username && touched.username ? (
                                                        <ErrorMessage
                                                            component='span'
                                                            name='username'
                                                            className='invalid-feedback'
                                                        />
                                                    ) : null}
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
                                                        className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                                    />
                                                    {errors.password && touched.password ? (
                                                        <ErrorMessage
                                                            component='span'
                                                            name='password'
                                                            className='invalid-feedback'
                                                        />
                                                    ) : null}
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label htmlFor='confirmPassword' md='3'>
                                                    Password: 
                                                </Label>
                                                <Col md='9'>
                                                    <Field 
                                                        name='confirmPassword'
                                                        placeholder='confirm password'
                                                        className={`form-control${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''}`}
                                                    />
                                                    {errors.confirmPassword && touched.confirmPassword ? (
                                                        <ErrorMessage
                                                            component='span'
                                                            name='confirmPassword'
                                                            className='invalid-feedback'
                                                        />
                                                    ) : null}
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
                                                        className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                                                    />
                                                    {errors.email && touched.email ? (
                                                        <ErrorMessage
                                                            component='span'
                                                            name='email'
                                                            className='invalid-feedback'
                                                        />
                                                    ) : null}
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
                                                    <Button type='button' color='secondary' onClick={() => setModalOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    );
                                }}
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
                                validationSchema={valSchema}
                                onSubmit={handleLoginSubmit}
                            >
                                {(formik) => {
                                    const { errors, touched } = formik;
                                    return (
                                        <Form className='p-3'>
                                            <FormGroup row>
                                                <Label htmlFor='username' md='3'>
                                                    Username: 
                                                </Label>
                                                <Col md='9'>
                                                <Field 
                                                    name='username'
                                                    placeholder='username'
                                                    className={`form-control${errors.username && touched.username ? ' is-invalid' : ''}`}
                                                />
                                                {errors.username && touched.username ? (
                                                    <ErrorMessage
                                                        component='span'
                                                        name='username'
                                                        className='invalid-feedback'
                                                    />
                                                ) : null}
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
                                                    className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                                />
                                                {errors.password && touched.password ? (
                                                    <ErrorMessage
                                                        component='span'
                                                        name='password'
                                                        className='invalid-feedback'
                                                    />
                                                ) : null}
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col className='d-flex justify-content-center'>
                                                    <Button type='submit' color='primary' className='me-3'>
                                                        Login
                                                    </Button>
                                                    <Button  type='button' color='secondary' onClick={() => setModalOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    );
                                }}
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