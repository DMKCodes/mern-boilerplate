import { useSelector } from 'react-redux';
import { checkAdmin, selectCurrentUser } from '../features/user/userSlice';
import { Container, Row, Col } from 'reactstrap';
import Subheader from '../components/Subheader';
import UserCard from '../features/user/UserCard';
import AdminCard from '../features/user/AdminCard';

const DashboardPage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = useSelector(checkAdmin);
    const { username, _id } = currentUser;

    return (
        <Container fluid>
            <Subheader current={`Dashboard: ${username}`}/>
            <Row className='pt-1'>
                <h2>Welcome, {username}!</h2>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xs='10' md='8' className='pt-3'>
                    <UserCard _id={_id} />
                </Col>
            </Row>
            {isAdmin &&
                <Row className='d-flex justify-content-center'>
                    <Col xs='10' md='8' className='pt-3'>
                        <AdminCard isAdmin={isAdmin} />
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default DashboardPage;