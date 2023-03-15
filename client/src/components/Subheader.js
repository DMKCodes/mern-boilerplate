import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Subheader = ({ current }) => {
    return (
        <Row>
            <Col className='pt-2'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{current}</BreadcrumbItem>
                </Breadcrumb>
            </Col>
        </Row>
    );
};

export default Subheader;