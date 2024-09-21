import { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

import { updateUser } from '../store/user/userActions';
import { getUserOrdersList } from '../store/order/orderActions';
import { selectOrderList } from '../store/order/orderSlice';

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

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
    <Container>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Typography variant="h4">User Profile</Typography>
          {message && (
            <Message severity="error">
              <>{message}</>
            </Message>
          )}
          {error && (
            <Message severity="error">
              <>{error}</>
            </Message>
          )}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              id="passwordConfirm"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Update
            </Button>
          </form>
        </Grid>
        <Grid item md={9}>
          {ordersList.length > 0 && (
            <>
              <Typography variant="h4">My Orders</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersList.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/order/${order._id}`}>
                          <Button variant="contained" size="small">
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
