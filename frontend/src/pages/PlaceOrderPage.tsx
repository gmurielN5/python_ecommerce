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
} from '../store/order/orderSlice';

import { placeOrder } from '../store/order/orderActions';
import { clearCart } from '../store/cart/cartSlice';

import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';

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
      navigate(`/order/${orderDetail._id}`);
      dispatch(clearCart());
    }
  }, [orderSuccess, orderDetail, navigate, dispatch]);

  const handleOrder = () => {
    dispatch(
      placeOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <>
      {orderLoading ? (
        <Loader />
      ) : (
        <div>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  {!shippingAddress ? null : (
                    <p>
                      <strong>Shipping: </strong>
                      {shippingAddress.address}
                      {shippingAddress.city}
                      {shippingAddress.postalCode}
                      {shippingAddress.country}
                    </p>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {cartItems.length === 0 ? (
                    <Message variant="info">
                      <p>Your cart is empty</p>
                    </Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.quantity} X ${item.price} = $
                              {(item.quantity * item.price).toFixed(
                                2
                              )}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col>${itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>${shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {orderError && (
                    <ListGroup.Item>
                      <Message variant="danger">
                        <>{orderError}</>
                      </Message>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems.length === 0}
                      onClick={handleOrder}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default PlaceOrderPage;
