import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, clearCurrentUser } from '../features/userSlice';
import { Row, Col, Button } from 'reactstrap';
import ChangeUsernameForm from './ChangeUsernameForm';
import axios from 'axios';

const UserCard = ({ user, token, setStatusMsg }) => {
    const [changeUsername, setChangeUsername] = useState(false);
    const [usernameChanged, setUsernameChanged] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false);

    const { _id, username, email, admin } = user;
    const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const putUserUsername = async (values) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/users/${_id}`,
                { username: values.newUsername },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            console.log(response);

            setChangeUsername(false);
            setUsernameChanged(true);
        } catch (error) {
            setStatusMsg('Internal error.  Please try again later.');
        }
    };

    const delUser = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/users/${_id}`,
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            
            if (currentUser._id === _id) {
                alert('Account successfully deleted.  Continue to homepage?');
                setTimeout(() => {
                    navigate('/');
                    dispatch(clearCurrentUser());
                }, '2000');
            } else {
                setUserDeleted(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Col xl='5' md='8' key={_id} className='m-1 p-2 border'>
            <p><b>Username</b>: {username}</p>
            <p className='mb-0'>ID: {_id}</p>
            <p className='mb-0'>Email: {email}</p>
            <p>Admin: {admin ? 'Yes' : 'No'}</p>
            <Row className='justify-content-center'>
                {changeUsername ? (
                    <ChangeUsernameForm 
                        setChangeUsername={setChangeUsername} 
                        putUserUsername={putUserUsername} 
                    />
                ) : usernameChanged ? (
                    <p className='text-success'><b>Username successfully changed.</b></p>
                ) : (
                <Button 
                    outline 
                    type='submit' 
                    color='warning'
                    style={{ width: '175px' }}
                    onClick={() => setChangeUsername(true)}
                >
                    Change Username
                </Button>
                )}
            </Row>
            <Row className='mt-2 justify-content-center'>
                <Col md='6'>
                    {userDeleted ? (
                        <p className='text-success'><b>User successfully deleted.</b></p>
                    ) : (
                        <Button
                            outline
                            type='submit'
                            color='danger'
                            onClick={() => delUser()}
                        >
                            Delete User
                        </Button>
                    )}
                </Col>
            </Row>
        </Col>
    );
};

export default UserCard;