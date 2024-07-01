import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectOrderList,
  selectOrderLoading,
  selectOrderError,
} from '../store/order/orderSlice';
import { getOrdersList } from '../store/order/orderActions';

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
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{error}</>
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {ordersList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-check"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-check"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrdersListPage;
