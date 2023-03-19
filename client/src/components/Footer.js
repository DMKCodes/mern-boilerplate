import { Container, Row, Col} from 'reactstrap';

const Footer = () => {
    return (
        <footer className='footer sticky-bottom border-top bg-success text-light'>
            <Container className='p-2'>
                <Row>
                    <Col>
                        <p>Created by Douglas Kissack</p>
                    </Col>
                    <Col>                     
                        <a 
                            href='https://github.com/DMKCodes'
                            target='_blank'
                            rel='noreferrer'
                            style={{ color: 'white' }}
                        >
                            GitHub
                        </a>
                    </Col>
                    <Col>                     
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