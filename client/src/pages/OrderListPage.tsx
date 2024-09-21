import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectOrderList,
  selectOrderLoading,
  selectOrderError,
} from '../store/order/orderSlice';
import { getOrdersList } from '../store/order/orderActions';

import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const OrdersListPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const ordersList = useAppSelector(selectOrderList);
  const loading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Orders
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>USER</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.user && order.user.name}
                  </TableCell>
                  <TableCell>
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <CheckIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <CheckIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <IconButton color="primary" size="small">
                        <InfoIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrdersListPage;
