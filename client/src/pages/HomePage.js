import { Container } from 'reactstrap';

const HomePage = () => {
    return (
        <Container>
            <h2 className='mt-3'>Overview</h2>
            <p>Welcome to the MERN Boilerplate. This boilerplate app can be used as a foundation for quick, full stack MERN application development.</p>
            <p>Registering a new user will grant access to the user dashboard.</p>
            <p>Visit <a href='https://github.com/DMKCodes/node-express-mongo-boilerplate'>the back end repository</a> for more info about server and database setup.</p>

            <h3>Features</h3>
            <p>Comprehensive Redux RTK API to test all endpoints.</p>
            <p>Securely register, log in, log out, and authenticate users w/ JWT access and refresh tokens.</p>
            <p>Persistent refresh token authentication remembers users on app refresh.</p>
            <p>Formik forms w/ Yup validation.</p>
            <p>Minimal styling with Reactstrap, responsive and easy to customize.</p>

            <h4>Notes</h4>
            <p>This boilerplate is not production ready until certain features have been removed - e.g., enabling admin privileges from the register form.</p>
            <p>It is suggested to review <b>ALL</b> code, both server and client, and make the necessary changes for best security practices.</p>
            <p>Limited accessibility features should also be revisited to ensure screen reader compatibility.</p>

            <h5>License: MIT</h5>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
            <p>THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
        </Container>
    );
};

export default HomePage;