import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

import { login } from '../store/user/userActions';

import {
  Link,
  useLocation,
  Navigate,
  redirect,
} from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const location = useLocation();

  const origin = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      {user && <Navigate to={origin} replace={true} />}
      <h1>Sign In</h1>
      {error && (
        <Message variant="danger">
          <p>{error}</p>
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={(e) => handleLogin(e)}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            to={
              redirect
                ? `/register?redirect=${redirect}`
                : '/register'
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default LoginPage;
