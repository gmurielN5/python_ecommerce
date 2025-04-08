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
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
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
              <>Order not found</>
            </Message>
          ) : (
            <Container>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Order: {order._id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <Card>
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
                          <>Delivered on {order.deliveredAt}</>
                        </Message>
                      ) : (
                        <Message severity="warning">
                          <>Not Delivered</>
                        </Message>
                      )}
                    </CardContent>
                  </Card>
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 2 }}>
                        Payment Method
                      </Typography>
                      <Typography>
                        <strong>Method: </strong>{' '}
                        {order.paymentMethod}
                      </Typography>
                      {order.isPaid ? (
                        <Message severity="success">
                          <>Paid on {order.paidAt}</>
                        </Message>
                      ) : (
                        <Message severity="warning">
                          <>Not Paid</>
                        </Message>
                      )}
                    </CardContent>
                  </Card>
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 2 }}>
                        Order Items
                      </Typography>
                      {order.orderItems.length === 0 ? (
                        <Message severity="info">
                          <>Order is empty</>
                        </Message>
                      ) : (
                        <List sx={{ p: 0 }}>
                          {order.orderItems.map((item, index) => (
                            <>
                              <ListItem key={index} sx={{ px: 0 }}>
                                <ListItemAvatar>
                                  <Avatar
                                    variant="rounded"
                                    src={item.image}
                                    alt={item.name}
                                    sx={{
                                      width: 56,
                                      height: 56,
                                      mr: 2,
                                    }}
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
                  <Card>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 2 }}>
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
                            onClick={deliverHandler}
                            fullWidth
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
