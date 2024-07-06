import {
  useState,
  useEffect,
  ChangeEvent,
  SyntheticEvent,
} from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectProduct,
  selectLoading,
  selectError,
} from '../store/products/productsSlice';

import { selectUser } from '../store/user/userSlice';

import {
  productDetails,
  createProductReview,
} from '../store/products/productActions';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Rating } from '../components/Rating';

type Params = {
  id: string;
};

const ProductPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const userInfo = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(productDetails(Number(id)));
    }
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setQty(parseInt(e.target.value));
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productId = Number(id);
    dispatch(
      createProductReview({
        id: productId,
        review: {
          rating,
          comment,
        },
      })
    );
    setRating(0);
    setComment('');
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{error}</>
        </Message>
      ) : (
        <div>
          {!product ? null : (
            <>
              <Row>
                <Col md={6}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                  />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color={'#f8e825'}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>£{product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col xs="auto" className="my-1">
                              <Form.Select
                                value={qty}
                                onChange={handleSelect}
                              >
                                {[
                                  ...Array(
                                    product.countInStock
                                  ).keys(),
                                ].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Select>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          disabled={product.countInStock == 0}
                          type="button"
                        >
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h4>Reviews</h4>
                  {product.reviews.length === 0 && (
                    <Message variant="info">
                      <p>No Reviews</p>
                    </Message>
                  )}

                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating
                          value={review.rating}
                          color="#f8e825"
                        />
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                      <h4>Write a review</h4>
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) =>
                                setRating(Number(e.target.value))
                              }
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId="comment">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={5}
                              value={comment}
                              onChange={(e) =>
                                setComment(e.target.value)
                              }
                            ></Form.Control>
                          </Form.Group>

                          <Button
                            disabled={loading}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message variant="info">
                          <p>
                            Please <Link to="/login">login</Link> to
                            write a review
                          </p>
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
