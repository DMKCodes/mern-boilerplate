import { Col, FormGroup, Button, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const ChangeUsernameForm = ({ setChangeUsername, putUserUsername }) => {
    const changeUsernameSchema = yup.object().shape({
        newUsername: yup
            .string()
            .min(4, 'Must be at least 4 characters.')
            .max(16, 'Cannot be more than 16 characters.')
            .required('Required.')
    });

    return (
        <Formik
            initialValues={{
                newUsername: ''
            }}
            validationSchema={changeUsernameSchema}
            onSubmit={(values) => putUserUsername(values)}
        >
            {(formik) => {
                const { errors, touched } = formik;
                return (
                    <Form className='p-2'>
                        <FormGroup row className='justify-content-center'>
                            <Label htmlFor='newUsername'>
                                New Username:
                            </Label>
                            <Col xs='8'>
                                <Field 
                                    name='newUsername'
                                    autoComplete='off'
                                    className={`form-control${errors.newUsername && touched.newUsername ? ' is-invalid' : ''}`}
                                />
                                {errors.newUsername && touched.newUsername ? (
                                    <ErrorMessage
                                        component='span'
                                        name='newUsername'
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
                                <Button outline type='button' onClick={() => setChangeUsername(false)}>
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

export default ChangeUsernameForm;