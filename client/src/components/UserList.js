import { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { 
    useGetAllUsersQuery, 
    useDeleteAllUsersMutation 
} from '../features/authApiSlice';
import UserCard from './UserCard';

const UserList = () => {
    const [allUsers, setAllUsers] = useState('');
    const [getAllUsersStarted, setGetAllUsersStarted] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    const getUsers = useGetAllUsersQuery(undefined, { skip: !getAllUsersStarted });
    const [deleteUsers] = useDeleteAllUsersMutation();

    const getAllUsers = async () => {
        setGetAllUsersStarted(true);

        try {
            const response = await getUsers.refetch();

            const users = response.data.allUsers;
            setAllUsers(users);
            setStatusMsg('All users successfully populated.');
        } catch (error) {
            if (!error?.data) {
                setStatusMsg('No server response.');
            } else if (error.data?.status === 403) {
                setStatusMsg('Not authorized to perform this operation.');
            } else {
                setStatusMsg('Request failed.  Please try again later.');
            }
        };
    };

    const delAllUsers = async () => {
        try {
            await deleteUsers().unwrap();
            
            setStatusMsg('All other users successfully deleted.');
            setAllUsers('');
        } catch (error) {
            if (!error?.data) {
                setStatusMsg('No server response.');
            } else if (error.data.status === 404) {
                setStatusMsg('No other users to delete.');
            } else if (error.data.status === 403) {
                setStatusMsg('Not authorized to perform this operation.');
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
                        <p><b>{statusMsg}</b></p>
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