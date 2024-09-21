import { useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectCart,
  selectShippingAddress,
  selectPaymentMethod,
} from '../store/cart/cartSlice';
import {
  selectOrder,
  selectOrderLoading,
  selectOrderSuccess,
  selectOrderError,
  clearOrderItem,
} from '../store/order/orderSlice';

import { createOrder } from '../store/order/orderActions';
import { clearCart } from '../store/cart/cartSlice';

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
import { CheckoutSteps } from '../components/CheckoutSteps';

const PlaceOrderPage: React.FC = () => {
  const cartItems = useAppSelector(selectCart);
  const shippingAddress = useAppSelector(selectShippingAddress);
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const orderDetail = useAppSelector(selectOrder);
  const orderLoading = useAppSelector(selectOrderLoading);
  const orderError = useAppSelector(selectOrderError);
  const orderSuccess = useAppSelector(selectOrderSuccess);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemsPrice: number = useMemo(
    (): number =>
      Number(
        cartItems
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      ),
    [cartItems]
  );

  const shippingPrice = useMemo(
    (): number => Number((itemsPrice > 100 ? 0 : 10).toFixed(2)),
    [itemsPrice]
  );

  const taxPrice = useMemo(
    (): number => Number((0.082 * itemsPrice).toFixed(2)),
    [itemsPrice]
  );

  const totalPrice = useMemo(
    (): number =>
      Number((itemsPrice + shippingPrice + taxPrice).toFixed(2)),
    [itemsPrice, shippingPrice, taxPrice]
  );

  useEffect(() => {
    if (orderSuccess && orderDetail) {
      dispatch(clearCart());
      dispatch(clearOrderItem());
      navigate(`/order/${orderDetail._id}`);
    }
  }, [orderSuccess, orderDetail, navigate, dispatch]);

  const handleOrder = () => {
    if (shippingAddress && paymentMethod) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        })
      );
    }
  };

  return (
    <Container>
      {orderLoading ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Container>
            <Grid container spacing={2}>
              <Grid item md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5">Shipping</Typography>
                    {!shippingAddress ? null : (
                      <>
                        <Typography>
                          <strong>Address: </strong>
                          {shippingAddress.address}
                        </Typography>
                        <Typography>
                          <strong>City: </strong>
                          {shippingAddress.city}
                        </Typography>
                        <Typography>
                          <strong>Postal Code: </strong>
                          {shippingAddress.postalCode}
                        </Typography>
                        <Typography>
                          <strong>Country: </strong>
                          {shippingAddress.country}
                        </Typography>
                      </>
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
                      <strong>Method: </strong>
                      {paymentMethod}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  style={{ marginTop: '16px' }}
                >
                  <CardContent>
                    <Typography variant="h5">Order Items</Typography>
                    {cartItems.length === 0 ? (
                      <Message severity="info">
                        <p>Your cart is empty</p>
                      </Message>
                    ) : (
                      <List>
                        {cartItems.map((item, index) => (
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
                            {index < cartItems.length - 1 && (
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
                        <Typography>${shippingPrice}</Typography>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Tax" />
                        <Typography>${taxPrice}</Typography>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Total" />
                        <Typography>${totalPrice}</Typography>
                      </ListItem>
                      {orderError && (
                        <ListItem>
                          <Message severity="error">
                            <>{orderError}</>
                          </Message>
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={cartItems.length === 0}
                      onClick={handleOrder}
                    >
                      Place Order
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Container>
  );
};
export default PlaceOrderPage;
