import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { getOrderDetails } from '../store/order/orderActions';

import {
  selectOrder,
  selectOrderLoading,
  selectOrderError,
} from '../store/order/orderSlice';

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
import { useEffect } from 'react';

type Params = {
  id: string;
};

const OrderPage: React.FC = () => {
  const { id } = useParams<Params>();
  // const [sdkReady, setSdkReady] = useState(false);

  const order = useAppSelector(selectOrder);
  const loading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);

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
        dispatch(getOrderDetails(id));
      }
    }
  }, [order, id, dispatch]);

  // const addPayPalScript = () => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${
  //     import.meta.env.VITE_PAYMENT_API
  //   }`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };

  // console.log(order);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{error}</>
        </Message>
      ) : (
        <div>
          <h1>Order: {order?._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order?.user?.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {order?.user?.email}
                  </p>
                  <p>
                    <strong>Shipping: </strong>
                    {order?.shippingAddress?.address},
                    {order?.shippingAddress?.city}
                    {order?.shippingAddress?.postalCode},
                    {order?.shippingAddress?.country}
                  </p>

                  {order?.isDelivered ? (
                    <Message variant="success">
                      <p>Delivered on {order?.deliveredAt}</p>
                    </Message>
                  ) : (
                    <Message variant="warning">
                      <p>Not Delivered</p>
                    </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order?.paymentMethod}
                  </p>
                  {order?.isPaid ? (
                    <Message variant="success">
                      <p>Paid on {order.paidAt}</p>
                    </Message>
                  ) : (
                    <Message variant="warning">
                      <p>Not Paid</p>
                    </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order?.orderItems?.length === 0 ? (
                    <Message variant="info">
                      <p>Order is empty</p>
                    </Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order?.orderItems?.map((item, index) => (
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
                      <Col>${order?.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${order?.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${order?.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {/*
                  {!order?.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}

                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order?.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )} */}
                </ListGroup>
                {/* {loadingDeliver && <Loader />} */}
                {/* {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )} */}
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default OrderPage;
