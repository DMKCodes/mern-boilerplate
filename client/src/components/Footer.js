import { Container, Row, Col} from 'reactstrap';

const Footer = () => {
    return (
        <footer className='footer sticky-bottom bg-success text-light'>
            <Container className='p-2'>
                <Row>
                    <Col md='4' xs='12'>
                        <p>Created by Douglas Kissack</p>
                    </Col>
                    <Col md='4' xs='6'>                     
                        <a 
                            href='https://github.com/DMKCodes'
                            target='_blank'
                            rel='noreferrer'
                            style={{ color: 'white' }}
                        >
                            GitHub
                        </a>
                    </Col>
                    <Col md='4' xs='6'>                     
                        <a 
                            href='https://dmk.codes/'
                            target='_blank'
                            rel='noreferrer'
                            style={{ color: 'white' }}
                        >
                            Portfolio
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;