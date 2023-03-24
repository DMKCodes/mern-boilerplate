import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/userSlice';
import { useLoginMutation } from '../features/authApiSlice';
import usePersist from '../hooks/usePersist';
import { Col, Button, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const LoginForm = ({ setModalOpen, setError, setErrorMsg }) => {
    const dispatch = useDispatch();

    const [persist, setPersist] = usePersist();

    const [login] = useLoginMutation();

    const loginSchema = yup.object().shape({
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
            .required('Required.')
    });

    const handleLoginSubmit = async (values) => {
        try {
            if (values.remember) {
                setPersist(true);
            }

            const response = await login({ 
                username: values.username, 
                password: values.password 
            }).unwrap();
            const user = response.user;
            const token = response.token;
            dispatch(setCurrentUser({ user, token }));

            setTimeout(() => {
                setModalOpen(false);
                setError(false);
            }, '2000');
        } catch (error) {
            console.log(error);
            setError(true);
            if (!error?.data) {
                setErrorMsg('No server response.');
            } else if (error.status === 401) {
                setErrorMsg(`${error.data.error}, please try again.  Redirecting...`);
            } else {
                setErrorMsg('Login failed, please try again. Redirecting...');
            }
            setTimeout(() => {
                setModalOpen(false);
                setError(false);
            }, '3000');
        };
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                remember: false
            }}
            validationSchema={loginSchema}
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
                                    autoComplete='off'
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
                                    type='password'
                                    autoComplete='off'
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
                            <Label check htmlFor='remember' md='3'>
                                Remember me?
                            </Label>
                            <Col md='9'>
                                <Field
                                    name='remember'
                                    type='checkbox'
                                    className='form-check-input mt-2'
                                    checked={persist}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col className='d-flex justify-content-center'>
                                <Button type='submit' color='success' className='me-3'>
                                    Login
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

export default LoginForm;