import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, clearCurrentUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { 
    useGetUserByIdQuery, 
    usePutUserByIdMutation, 
    useDeleteUserByIdMutation 
} from '../features/authApiSlice';
import { Container, Row, Col, Button } from 'reactstrap';
import ChangePasswordForm from './ChangePasswordForm';

const UserPanel = () => {
    const [fetchedUser, setFetchedUser] = useState({
        _id: false,
        username: false,
        email: false
    });

    const [getUserStarted, setGetUserStarted] = useState(false);

    const [changePassword, setChangePassword] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [deleteAccount, setDeleteAccount] = useState(false);
    const [accountDeleted, setAccountDeleted] = useState(false);

    const [statusMsg, setStatusMsg] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(selectCurrentUser);
    const { _id } = currentUser;

    const getUserById = useGetUserByIdQuery(_id, { skip: !getUserStarted });
    const [putUserById] = usePutUserByIdMutation();
    const [deleteUserById] = useDeleteUserByIdMutation();

    useEffect(() => {
        if (getUserStarted) {
            if (fetchedUser._id) {
                getUserById.refetch();
            }
            const { data, error } = getUserById;

            if (error) {
                setStatusMsg('Error retrieving user details.');
            } else if (data) {
                const { _id, username, email } = data.user;
                setStatusMsg('Successfully retrieved user details.');
                setFetchedUser({ _id, username, email });
                setGetUserStarted(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserStarted, getUserById]);

    const putUserPassword = async (values) => {
        try {
            await putUserById({ _id, newVals: { password: values.newPassword } }).unwrap();
            setChangePassword(false);
            setPasswordChanged(true);
            setStatusMsg(false);
        } catch (error) {
            if (!error?.data) {
                setStatusMsg('No server response.');
            } else if (error.status === 404) {
                setStatusMsg('This user does not exist.');
            } else if (error.status === 403) {
                setStatusMsg('Not authorized to perform this operation.');
            } else {
                setStatusMsg('Operation failed. Please try again.');
            }
        }
    };

    const delUser = async (_id) => {
        try {
            await deleteUserById({ _id }).unwrap();

            setDeleteAccount(false);
            setAccountDeleted(true);
            setStatusMsg(false);
            
            setTimeout(() => {
                navigate('/');
                dispatch(clearCurrentUser());
            }, '2000');
        } catch (error) {
            if (!error?.data) {
                setStatusMsg('No server response.');
            } else if (error.status === 404) {
                setStatusMsg('This user does not exist.');
            } else if (error.status === 403) {
                setStatusMsg('Not authorized to perform this operation.');
            } else {
                setStatusMsg('Operation failed. Please try again.');
            }
        }
    };

    return (
        <Container>
            <Row className='border'>
                <h4 className='pt-2'>User Panel</h4>
                <p>Use this panel to view and modify your own account.</p>
                {statusMsg &&
                    <p><b>{statusMsg}</b></p>
                }
            </Row>
            <Row className='pt-3 border border-top-0'>
                <Col md='4' className='border-end'>
                    <Button 
                        outline 
                        color='primary' 
                        type='submit' 
                        onClick={() => setGetUserStarted(true)}
                    >
                        Populate Details
                    </Button>
                    <p>GET /users/:userId</p>
                </Col>
                <Col md='8' className='pb-3'>
                    <b>User ID</b>: {fetchedUser._id}<br/>
                    <b>Username</b>: {fetchedUser.username}<br/>
                    <b>Email</b>: {fetchedUser.email}<br/>
                </Col>
            </Row>
            <Row className='pt-3 border border-top-0'>
                <Col md='4' className='border-end'>
                    <Button 
                        outline 
                        color='warning' 
                        type='submit' 
                        onClick={() => setChangePassword(true)}
                    >
                        Change Password
                    </Button>
                    <p>PUT /users/:userId</p>
                </Col>
                <Col md='8'>
                    {changePassword ? (
                        <ChangePasswordForm 
                            putUser={putUserPassword} 
                            setChangePassword={setChangePassword} 
                        />
                    ) : passwordChanged ? (
                        <div>Your password has been successfully changed.</div>
                    ) : null}
                </Col>  
            </Row>
            <Row className='pt-3 border border-top-0'>
                <Col md='4' className='border-end'>
                    <Button 
                        outline 
                        color='danger' 
                        type='submit' 
                        onClick={() => setDeleteAccount(true)}
                    >
                        Delete Account
                    </Button>
                    <p>DEL /users/:userId</p>
                </Col>
                <Col md='8' className='pb-3'>
                    {deleteAccount ? (
                        <>
                            <div className='mb-2'>
                                Are you sure you want to delete your account?{' '}
                                This operation is <b style={{ color: 'red' }}>permanent</b>.
                            </div>
                            <Button 
                                outline 
                                color='danger' 
                                className='me-3' 
                                type='submit' 
                                onClick={() => delUser(_id)}
                            >
                                Delete
                            </Button>
                            <Button 
                                outline 
                                type='button' 
                                onClick={() => setDeleteAccount(false)}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : accountDeleted ? (
                        <div>Your account has been deleted.  Redirecting...</div>
                    ) : null
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default UserPanel;