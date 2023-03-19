import { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import UserCard from './UserCard';

const UserList = ({ token }) => {
    const [allUsers, setAllUsers] = useState('');
    const [statusMsg, setStatusMsg] = useState('');

    const getAllUsers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/users/',
                { headers: { 'Authorization': `Bearer ${token}` }}
            );

            const users = response.data.allUsers;
            setAllUsers(users);
            setStatusMsg('All users successfully populated.');
        } catch (error) {
            console.log(error);
            setStatusMsg('Internal error.  Please try again later.');
        };
    };

    const delAllUsers = async () => {
        try {
            await axios.delete(
                'http://localhost:5000/users/',
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            
            setStatusMsg('All other users successfully deleted.');
            setAllUsers('');
        } catch (error) {
            if (error.response?.status === 404) {
                setStatusMsg('No other users to delete.');
            } else {
                setStatusMsg('Internal error.  Please try again later.');
            }
        };
    };

    return (
        <>
            <Row className='border border-top-0 justify-content-center p-2'>
                <Col md='4'>
                    <Button 
                        outline 
                        type='submit' 
                        color='primary' 
                        onClick={() => getAllUsers()}
                    >
                        Populate Users
                    </Button>
                    <p className='mb-0'>GET /users</p>
                </Col>
                <Col md='4'>
                    <Button
                        outline
                        type='submit'
                        color='danger'
                        onClick={() => delAllUsers()}
                    >
                        Delete All Users
                    </Button>
                    <p className='mb-0'>DEL /users</p>
                </Col>
                {statusMsg &&
                    <Col xs='12' className='mt-3'>
                        <p className='text-success'><b>{statusMsg}</b></p>
                    </Col>
                }
                </Row>
            <Row className='border border-top-0 justify-content-center p-2'>
                {allUsers ? (
                    <>
                        {allUsers.map((user) => {
                            return (
                                <UserCard 
                                    key={user._id} 
                                    user={user} 
                                    token={token} 
                                    setStatusMsg={setStatusMsg} 
                                />
                            );
                        })}
                    </>
                ) : (
                    null
                )}
            </Row>
        </>       
    );
};

export default UserList;