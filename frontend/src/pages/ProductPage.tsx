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
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { BasicRating } from '../components/Rating';

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
    <Container>
      <Link to="/">Go Back</Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <Container>
          {!product ? null : (
            <>
              <Grid container spacing={4}>
                <Grid item md={6}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item md={6}>
                  <List>
                    <ListItem>
                      <Typography variant="h4">
                        {product.name}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <BasicRating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListItem>
                    <ListItem>
                      <Typography variant="h6">
                        Price: ${product.price}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        Description: {product.description}
                      </Typography>
                    </ListItem>
                  </List>
                  <Card variant="outlined">
                    <CardContent>
                      <List>
                        <ListItem>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography>Price:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography>
                                <strong>£{product.price}</strong>
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography>Status:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography>
                                {product.countInStock > 0
                                  ? 'In Stock'
                                  : 'Out of Stock'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                        {product.countInStock > 0 && (
                          <ListItem>
                            <Grid container alignItems="center">
                              <Grid item xs={6}>
                                <Typography>Qty</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                >
                                  <InputLabel>Quantity</InputLabel>
                                  <Select
                                    value={qty}
                                    onChange={handleSelect}
                                    label="Quantity"
                                  >
                                    {[
                                      ...Array(
                                        product.countInStock
                                      ).keys(),
                                    ].map((x) => (
                                      <MenuItem
                                        key={x + 1}
                                        value={x + 1}
                                      >
                                        {x + 1}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </ListItem>
                        )}
                        <ListItem>
                          <Button
                            onClick={addToCartHandler}
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartIcon />}
                            disabled={product.countInStock === 0}
                          >
                            Add to Cart
                          </Button>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid container spacing={4} mt={4}>
                  <Grid item md={6}>
                    <Typography variant="h5">Reviews</Typography>
                    {product.reviews.length === 0 && (
                      <Box sx={{ marginTop: 2 }}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                        >
                          No Reviews
                        </Typography>
                      </Box>
                    )}
                    <List>
                      {product.reviews.map((review) => (
                        <ListItem key={review._id} divider>
                          <ListItemText
                            primary={<strong>{review.name}</strong>}
                            secondary={
                              <>
                                <Rating
                                  value={review.rating}
                                  readOnly
                                />
                                <Typography>
                                  {review.comment}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                      <ListItem>
                        <Typography variant="h6">
                          Write a review
                        </Typography>
                      </ListItem>
                      <ListItem>
                        {userInfo ? (
                          <form onSubmit={submitHandler}>
                            <FormControl
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <InputLabel id="rating-label">
                                Rating
                              </InputLabel>
                              <Select
                                labelId="rating-label"
                                id="rating"
                                value={rating}
                                onChange={(e) =>
                                  setRating(Number(e.target.value))
                                }
                                label="Rating"
                              >
                                <MenuItem value="">
                                  <em>Select...</em>
                                </MenuItem>
                                <MenuItem value={1}>
                                  1 - Poor
                                </MenuItem>
                                <MenuItem value={2}>
                                  2 - Fair
                                </MenuItem>
                                <MenuItem value={3}>
                                  3 - Good
                                </MenuItem>
                                <MenuItem value={4}>
                                  4 - Very Good
                                </MenuItem>
                                <MenuItem value={5}>
                                  5 - Excellent
                                </MenuItem>
                              </Select>
                            </FormControl>

                            <TextField
                              id="comment"
                              label="Review"
                              multiline
                              rows={5}
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={comment}
                              onChange={(e) =>
                                setComment(e.target.value)
                              }
                            />

                            <Button
                              disabled={loading}
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                            >
                              Submit
                            </Button>
                          </form>
                        ) : (
                          <Message severity="info">
                            <p>
                              Please <Link to="/login">login</Link> to
                              write a review
                            </p>
                          </Message>
                        )}
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      )}
    </Container>
  );
};

export default ProductPage;
