import { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button, Row, Col, Table } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

import { updateUser } from '../store/user/userActions';
import { getUserOrdersList } from '../store/order/orderActions';
import { selectOrderList } from '../store/order/orderSlice';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const ProfilePage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);
  const ordersList = useAppSelector(selectOrderList);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      dispatch(getUserOrdersList());
    }
  }, [user, dispatch]);

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      if (user) {
        dispatch(
          updateUser({
            id: user._id,
            name: name,
            email: email,
            password: password,
          })
        );
        setMessage('');
      }
    }
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>

          {message && (
            <Message variant="danger">
              <>{message}</>
            </Message>
          )}
          {error && (
            <Message variant="danger">
              <>{error}</>
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
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>

        <Col md={9}>
          {!ordersList.length ? null : (
            <>
              <h2>My Orders</h2>
              <Table striped responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {ordersList.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <Button className="btn-sm">Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
