import { useSelector } from 'react-redux';
import { checkAdmin, selectCurrentUser } from '../features/userSlice';
import { Container, Row, Col } from 'reactstrap';
import Subheader from '../components/Subheader';
import UserPanel from '../components/UserPanel';
import AdminPanel from '../components/AdminPanel';

const DashboardPage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = useSelector(checkAdmin);
    const { username } = currentUser;

    return (
        <Container fluid className='mt-3'>
            <Subheader current={`Dashboard: ${username}`}/>
            <Row className='pt-1'>
                <h2>Welcome, {username}!</h2>
            </Row>
            <Row className='d-flex justify-content-center mb-5'>
                <Col xs='10' md='8' className='pt-3'>
                    <UserPanel />
                </Col>
            </Row>
            {isAdmin &&
                <Row className='d-flex justify-content-center'>
                    <Col xs='10' md='8' className='pt-3'>
                        <AdminPanel />
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default DashboardPage;