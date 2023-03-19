import { Container, Row, Col } from 'reactstrap';
import UserList from './UserList';

const AdminPanel = ({ currentUser }) => {
    const { token } = currentUser;

    return (
        <Container className='mb-5'>
            <Row className='border'>
                <h4 className='pt-2'>Admin Panel</h4>
                <p>Use this panel to view and modify other user accounts.</p>
            </Row>
            <Row>
                <Col>
                    <Row className='border border-top-0'>
                        <div><b>All Users</b></div>
                    </Row>
                    <UserList token={token} />
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;