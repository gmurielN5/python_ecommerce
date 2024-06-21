import { useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { Link, useLocation, Navigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

import { register } from '../store/user/userActions';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const location = useLocation();

  const redirect = location.state?.from?.pathname || '/';

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
      setMessage('');
    }
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <h1>Register</h1>
      {message && (
        <Message variant="danger">
          <p>{message}</p>
        </Message>
      )}
      {error && (
        <Message variant="danger">
          <p>{error}</p>
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default RegisterPage;
