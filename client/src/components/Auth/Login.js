import React from 'react';
// Actions
import { loginUser } from '../../actions/';
// Bootstrap
import { Form, Button, Container, Card } from 'react-bootstrap';

// Form Validation
import useForm from '../../customHooks/useForm';
import validate from './LoginValidation';

// Router Dom
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const Login = ({ loginUser, isAuthenticated }) => {
  const login = async () => {
    try {
      await loginUser(lastname, password);
    } catch (err) {
      return;
    }
    //  eslint-disable-next-line
  };

  const { onChange, onSubmit, formData, errors } = useForm(login, validate);

  const { lastname, password } = formData;

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Container className='h-100 d-flex flex-column justify-content-center'>
      <h3 className='text-center'>Login</h3>
      <Card className='w-100'>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name='lastname'
                type='text'
                placeholder='Last Name'
                onChange={onChange}
                value={lastname || ''}
              />
            </Form.Group>
            <p>{errors.lastname}</p>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                placeholder='Password'
                onChange={onChange}
                value={password || ''}
              />
            </Form.Group>
            <p>{errors.password}</p>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
