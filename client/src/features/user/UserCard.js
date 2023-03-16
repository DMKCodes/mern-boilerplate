import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardFooter,
    Button
} from 'reactstrap';

const UserCard = ({ user }) => {
    const { username, email, token, id } = user;

    return (
        <Card
            color='success'
            outline
        >
            <CardBody>
                <CardTitle>
                    <h4 className='py-2'>User Panel</h4>
                </CardTitle>
                <CardSubtitle>
                    <p className='mb-0'>Username: {username}</p>
                    <p>Email: {email}</p>
                </CardSubtitle>
                <CardText>
                    User ID: {id}<br/>
                    JWT Token: {token}
                </CardText>
                <CardFooter className='d-flex justify-content-around'>
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                </CardFooter>
            </CardBody>
        </Card>
    );
};

export default UserCard;