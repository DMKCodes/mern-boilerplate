import { useSelector } from 'react-redux';
import { checkAdmin } from '../features/user/userSlice';
import { Container, Row, Col } from 'reactstrap';
import Subheader from '../components/Subheader';
import UserCard from '../features/user/UserCard';
import AdminCard from '../features/user/AdminCard';

const DashboardPage = ({ user }) => {
    const isAdmin = useSelector(checkAdmin);
    const { username } = user;

    return (
        <Container fluid>
            <Subheader current={`Dashboard: ${username}`}/>
            <Row className='pt-1'>
                <h2>Welcome, {username}!</h2>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xs='10' md='8' className='pt-3'>
                    <UserCard user={user} />
                </Col>
            </Row>
            {isAdmin &&
                <Row className='d-flex justify-content-center'>
                    <Col xs='10' md='8' className='pt-3'>
                        <AdminCard user={user} />
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default DashboardPage;