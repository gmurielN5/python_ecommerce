import { useEffect, ChangeEvent } from 'react';

import {
  useLocation,
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectProduct,
  selectLoading,
} from '../store/products/productsSlice';
import { productInfo } from '../store/products/productActions';

import {
  addToCart,
  removeItem,
  selectCart,
} from '../store/cart/cartSlice';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

type Params = {
  id: string;
};

const CartPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<Params>();
  const qty = location.search
    ? Number(location.search.split('=')[1])
    : 1;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectLoading);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(productInfo(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      dispatch(addToCart({ product, qty }));
    }
  }, [dispatch, product, qty]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleAddItem = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(addToCart({ product, qty: parseInt(e.target.value) }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        {loading && <Loader />}
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            <p>
              Your cart is empty <Link to="/">Go Back</Link>
            </p>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) => handleAddItem(e)}
                    >
                      {[...Array(item.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
