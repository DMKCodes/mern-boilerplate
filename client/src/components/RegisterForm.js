import { useDispatch } from 'react-redux';
import { setCurrentUser, setAdmin } from '../features/user/userSlice';
import { Col, Button, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const RegisterForm = ({ setModalOpen, setError, setErrorMsg }) => {
    const dispatch = useDispatch();

    const registerSchema = yup.object().shape({
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
        }
    };

    const handleLoginSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/users/login', values);

            if (response.data.admin) {
                dispatch(setAdmin(true));
            }
            const user = response.data.user;
            user.token = response.data.token;
            dispatch(setCurrentUser(user));
            setTimeout(() => {
                setModalOpen(false);
                setError(false);
            }, '2000');
        } catch (error) {
            if (error.response && error.response.status === 401) {
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
        <Formik
            initialValues={{
                username: '',
                password: '',
                email: '',
                admin: false
            }}
            validationSchema={registerSchema}
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
                                    className='form-check-input mt-2'
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
    );
};

export default RegisterForm;