import { useState, useEffect } from 'react';
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

    const getAllUsers = useGetAllUsersQuery(undefined, { skip: !getAllUsersStarted });
    const [deleteAllUsers] = useDeleteAllUsersMutation();

    useEffect(() => {
        if (getAllUsersStarted) {
            if (allUsers) {
                getAllUsers.refetch();
            }
            const { data, error } = getAllUsers;

            if (error) {
                setStatusMsg('Error retrieving users.');
                setGetAllUsersStarted(false);
            } else if (data) {
                setStatusMsg('Successfully retrieved all users.');
                setAllUsers(data.allUsers);
                setGetAllUsersStarted(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllUsersStarted, getAllUsers]);

    const delAllUsers = async () => {
        try {
            await deleteAllUsers().unwrap();
            
            setStatusMsg('All other users successfully deleted.');
            setAllUsers('');
        } catch (error) {
            if (!error?.data) {
                setStatusMsg('No server response.');
            } else if (error.status === 404) {
                setStatusMsg('No other users to delete.');
            } else if (error.status === 403) {
                setStatusMsg('Not authorized to perform this operation.');
            } else {
                setStatusMsg('Internal error.  Please try again later.');
            }
        };
    };

    return (
        <>
            <Row className='border border-top-0 justify-content-center p-3'>
                <Col md='4'>
                    <Button 
                        outline 
                        type='submit' 
                        color='primary' 
                        onClick={() => setGetAllUsersStarted(true)}
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