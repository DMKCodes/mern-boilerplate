import { Col, FormGroup, Label, Button } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const ChangePasswordForm = ({ putUser, setChangePassword }) => {
    const changePasswordSchema = yup.object().shape({
        currentPassword: yup
            .string()
            .required('Required.'),
        newPassword: yup
            .string()
            .required('Required.'),
        confirmNewPassword: yup
            .string()
            .required('Required.')
            .oneOf([yup.ref('newPassword'), null], 'Passwords do not match.')
    });

    return (
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            }}
            validationSchema={changePasswordSchema}
            onSubmit={(values) => putUser(values)}
        >
            {(formik) => {
                const { errors, touched } = formik;
                return (
                    <Form className='p-2'>
                        <FormGroup row>
                            <Label htmlFor='currentPassword' md='3'>
                                Current Password: 
                            </Label>
                            <Col md='9'>
                                <Field 
                                    name='currentPassword'
                                    type='password'
                                    autoComplete='off'
                                    className={`form-control${errors.currentPassword && touched.currentPassword ? ' is-invalid' : ''}`}
                                />
                                {errors.currentPassword && touched.currentPassword ? (
                                    <ErrorMessage
                                        component='span'
                                        name='currentPassword'
                                        className='invalid-feedback'
                                    />
                                ) : null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor='newPassword' md='3'>
                                New Password: 
                            </Label>
                            <Col md='9'>
                                <Field 
                                    name='newPassword'
                                    type='password'
                                    autoComplete='off'
                                    className={`form-control${errors.newPassword && touched.newPassword ? ' is-invalid' : ''}`}
                                />
                                {errors.newPassword && touched.newPassword ? (
                                    <ErrorMessage
                                        component='span'
                                        name='newPassword'
                                        className='invalid-feedback'
                                    />
                                ) : null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor='confirmNewPassword' md='3'>
                                Confirm New Password: 
                            </Label>
                            <Col md='9'>
                                <Field 
                                    name='confirmNewPassword'
                                    type='password'
                                    autoComplete='off'
                                    className={`form-control${errors.confirmNewPassword && touched.confirmNewPassword ? ' is-invalid' : ''}`}
                                />
                                {errors.confirmNewPassword && touched.confirmNewPassword ? (
                                    <ErrorMessage
                                        component='span'
                                        name='confirmNewPassword'
                                        className='invalid-feedback'
                                    />
                                ) : null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col className='d-flex justify-content-center'>
                                <Button outline type='submit' color='success' className='me-3'>
                                    Submit
                                </Button>
                                <Button outline type='button' onClick={() => setChangePassword(false)}>
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

export default ChangePasswordForm;