import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '../features/user/userSlice';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import ChangePasswordForm from './ChangePasswordForm';

const UserPanel = ({ currentUser }) => {
    const [fetchedUser, setFetchedUser] = useState({
        _id: '',
        username: '',
        email: ''
    });
    const [changePassword, setChangePassword] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [accountDeleted, setAccountDeleted] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id, token } = currentUser;

    const getUser = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/users/${_id}`, 
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            const user = response.data.user;
            setFetchedUser(user);
        } catch (error) {
            console.log(error);
        };
    };

    const putUserPassword = async (values) => {
        try {
            await axios.put(
                `http://localhost:5000/users/${_id}`,
                { password: values.newPassword },
                { headers: { 'Authorization': `Bearer ${token}` }}
            )
            setChangePassword(false);
            setPasswordChanged(true);
        } catch (error) {
            console.log(error);
        }
    };

    const delUser = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/users/${_id}`,
                { headers: { 'Authorization': `Bearer ${token}` }}
            );

            setDeleteAccount(false);
            setAccountDeleted(true);
            
            setTimeout(() => {
                navigate('/');
                dispatch(clearCurrentUser());
            }, '2000');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Row className='border'>
                <h4 className='pt-2'>User Panel</h4>
                <p>Use this panel to view and modify your own account.</p>
            </Row>
            <Row className='pt-3 border border-top-0'>
                <Col xs='3'>
                    <Button 
                        outline 
                        color='primary' 
                        type='submit' 
                        onClick={() => getUser()}
                    >
                        Populate Details
                    </Button>
                    <p>GET /users/:userId</p>
                </Col>
                <Col xs='9'>
                    <b>User ID</b>: {fetchedUser._id}<br/>
                    <b>Username</b>: {fetchedUser.username}<br/>
                    <b>Email</b>: {fetchedUser.email}<br/>
                </Col>
            </Row>
            <Row className='pt-3 border border-top-0'>
                <Col xs='3'>
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
                <Col xs='9'>
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
                <Col xs='3'>
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
                <Col xs='9'>
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