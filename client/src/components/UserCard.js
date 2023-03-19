import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, clearCurrentUser } from '../features/userSlice';
import { Row, Col, Button } from 'reactstrap';
import ChangeUsernameForm from './ChangeUsernameForm';
import axios from 'axios';

const UserCard = ({ user, token, setStatusMsg }) => {
    const [changeUsername, setChangeUsername] = useState(false);
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

            setStatusMsg('Username successfully changed. Repopulate to see changes.');
            setChangeUsername(false);
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
                setStatusMsg('Account successfully deleted.  Redirecting...');
                setTimeout(() => {
                    navigate('/');
                    dispatch(clearCurrentUser());
                }, '2000');
            } else {
                setStatusMsg('User successfully deleted. Repopulate to see changes.');
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
                {!changeUsername ? (
                    <Button 
                        outline 
                        type='submit' 
                        color='warning'
                        style={{ width: '175px' }}
                        onClick={() => setChangeUsername(true)}
                    >
                        Change Username
                    </Button>
                ) : (
                    <ChangeUsernameForm 
                        setChangeUsername={setChangeUsername} 
                        putUserUsername={putUserUsername} 
                    />
                )}
            </Row>
            <Row className='mt-2 justify-content-center'>
                <Col md='6'>
                    <Button
                        outline
                        type='submit'
                        color='danger'
                        onClick={() => delUser()}
                    >
                        Delete User
                    </Button>
                </Col>
            </Row>
        </Col>
    );
};

export default UserCard;