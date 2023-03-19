import { Container, Row, Col} from 'reactstrap';

const Footer = () => {
    return (
        <footer className='footer border-top'>
            <Container className='pt-1'>
                <Row>
                    <Col>Created by Douglas Kissack</Col>
                    <Col>https://github.com/DMKCodes</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;