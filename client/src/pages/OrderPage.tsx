import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

// import PayPalButton from '../components/PaypalButton';

import {
  getOrderDetails,
  // payOrder,
  deliverOrder,
} from '../store/order/orderActions';

import {
  selectOrder,
  selectOrderLoading,
  selectOrderError,
} from '../store/order/orderSlice';

import { selectUser } from '../store/user/userSlice';

import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useEffect } from 'react';

type Params = {
  id: string;
};

const OrderPage: React.FC = () => {
  const { id } = useParams<Params>();

  const order = useAppSelector(selectOrder);
  const loading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);
  const userInfo = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const itemsPrice = useMemo(
    (): number =>
      Number(
        order?.orderItems
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      ),
    [order]
  );

  useEffect(() => {
    if (id) {
      if (!order || order._id !== Number(id)) {
        const orderId = Number(id);
        dispatch(getOrderDetails(orderId));
      }
    }
  }, [order, id, dispatch]);

  // const successPaymentHandler = (details: any, data: any) => {
  //   dispatch(
  //     payOrder({ id: Number(id), details: details, data: data })
  //   );
  // };

  const deliverHandler = () => {
    if (!order) {
      return;
    }
    dispatch(deliverOrder(order));
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <>
          {!order ? (
            <Message severity="error">
              <p>Order not found</p>
            </Message>
          ) : (
            <Container>
              <Typography variant="h4" gutterBottom>
                Order: {order._id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5">Shipping</Typography>
                      <Typography>
                        <strong>Name: </strong> {order.user.name}
                      </Typography>
                      <Typography>
                        <strong>Email: </strong> {order.user.email}
                      </Typography>
                      <Typography>
                        <strong>Shipping: </strong>
                        {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                      </Typography>

                      {order.isDelivered ? (
                        <Message severity="success">
                          <p>Delivered on {order.deliveredAt}</p>
                        </Message>
                      ) : (
                        <Message severity="warning">
                          <p>Not Delivered</p>
                        </Message>
                      )}
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ marginTop: '16px' }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        Payment Method
                      </Typography>
                      <Typography>
                        <strong>Method: </strong>{' '}
                        {order.paymentMethod}
                      </Typography>
                      {order.isPaid ? (
                        <Message severity="success">
                          <p>Paid on {order.paidAt}</p>
                        </Message>
                      ) : (
                        <Message severity="warning">
                          <p>Not Paid</p>
                        </Message>
                      )}
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ marginTop: '16px' }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        Order Items
                      </Typography>
                      {order.orderItems.length === 0 ? (
                        <Message severity="info">
                          <p>Order is empty</p>
                        </Message>
                      ) : (
                        <List>
                          {order.orderItems.map((item, index) => (
                            <>
                              <ListItem
                                alignItems="flex-start"
                                key={index}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    variant="rounded"
                                    src={item.image}
                                    alt={item.name}
                                    sx={{ width: 56, height: 56 }}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Link to={`/product/${item._id}`}>
                                      {item.name}
                                    </Link>
                                  }
                                  secondary={`${item.quantity} X $${
                                    item.price
                                  } = $${(
                                    item.quantity * item.price
                                  ).toFixed(2)}`}
                                />
                              </ListItem>
                              {index <
                                order.orderItems.length - 1 && (
                                <Divider />
                              )}
                            </>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5">
                        Order Summary
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText primary="Items" />
                          <Typography>${itemsPrice}</Typography>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Shipping" />
                          <Typography>
                            ${order.shippingPrice}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Tax" />
                          <Typography>${order.taxPrice}</Typography>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Total" />
                          <Typography>${order.totalPrice}</Typography>
                        </ListItem>
                        {/* {!order.isPaid && (
                         <ListItem>
                          <PayPalButton
                            amount={order?.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                            </ListItem>
                      )} */}
                      </List>
                    </CardContent>
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <CardActions>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={deliverHandler}
                          >
                            Mark As Delivered
                          </Button>
                        </CardActions>
                      )}
                  </Card>
                </Grid>
              </Grid>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};
export default OrderPage;
