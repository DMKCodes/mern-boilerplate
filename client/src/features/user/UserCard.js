import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    Button
} from 'reactstrap';

const UserCard = ( _id ) => {

    return (
        <Card
            color='success'
            outline
        >
            <CardBody>
                <CardTitle>
                    <h4 className='py-2'>User Panel</h4>
                </CardTitle>
                <CardText>
                    <div>Username:</div>
                    <div>Email:</div>
                    <div>User ID:</div>
                    <div>JWT Token:</div>
                </CardText>
                <CardFooter className='d-flex justify-content-around'>
                    <Row>
                        <Col md='4' xs='6'>
                            <Button>Populate</Button>
                            <p>GET /users/:userId</p>
                        </Col>
                        <Col md='4' xs='6'>
                            <Button>Change</Button>
                            <p>PUT /users/:userId</p>
                        </Col>                        
                        <Col md='4' xs='6'>
                            <Button>Delete</Button>
                            <p>DEL /users/:userId</p>
                        </Col>
                    </Row>
                </CardFooter>
            </CardBody>
        </Card>
    );
};

export default UserCard;