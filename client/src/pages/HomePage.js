import { Container } from 'reactstrap';

const HomePage = () => {
    return (
        <Container>
            <h2 className='my-3'>Home Page</h2>
            <p>Welcome to the MERN Boilerplate. This boilerplate app can be used as a foundation for quick, full stack MERN application development.</p>
            <p>Registering a new user above will grant access to the user dashboard which tests all HTML requests.</p>
            <p>The dashboard recognizes admin privileges and provides expanded dashboard options such as displaying all users, modifying individual users, and deleting users.</p>
            <p><b>Note</b>: This boilerplate has been configured to allow you to create an admin account directly for testing. Remove these features before entering production!</p>
            <p>Visit <a href='https://github.com/DMKCodes/node-express-mongo-boilerplate'>the back end repository</a> for more info about server and database setup.</p>
        </Container>
    );
};

export default HomePage;