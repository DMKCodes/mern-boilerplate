import { useSelector } from 'react-redux';
import { checkAdmin, selectCurrentUser } from '../features/user/userSlice';
import { Container, Row, Col } from 'reactstrap';
import Subheader from '../components/Subheader';
import UserCard from '../components/UserCard';
import AdminCard from '../components/AdminCard';

const DashboardPage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = useSelector(checkAdmin);
    const { username } = currentUser;

    return (
        <Container fluid>
            <Subheader current={`Dashboard: ${username}`}/>
            <Row className='pt-1'>
                <h2>Welcome, {username}!</h2>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xs='10' md='8' className='pt-3'>
                    <UserCard currentUser={currentUser} />
                </Col>
            </Row>
            {isAdmin &&
                <Row className='d-flex justify-content-center'>
                    <Col xs='10' md='8' className='pt-3'>
                        <AdminCard />
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default DashboardPage;