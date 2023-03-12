import { useSelector } from 'react-redux';
import { checkAdmin } from '../features/user/userSlice';
import UserCard from '../features/user/UserCard';
import AdminCard from '../features/user/AdminCard';
import { Container, Row } from 'reactstrap';

const DashboardPage = ({ user }) => {
    const isAdmin = useSelector(checkAdmin);
    const { username } = user;

    return (
        <Container fluid>
            <Row className='mt-3'>
                <h2>Welcome, {username}!</h2>
            </Row>
            <Row className='d-flex justify-content-center'>
                <UserCard />
            </Row>
            {isAdmin ? (
                <Row className='d-flex justify-content-center'>
                    <AdminCard />
                </Row>
            ) : (
                null
            )}
        </Container>
    );
};

export default DashboardPage;