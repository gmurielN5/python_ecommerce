import React, { useState, useEffect, SyntheticEvent } from 'react';

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
  SelectChangeEvent,
  Container,
  Grid,
  Typography,
  // Card,
  // CardContent,
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

// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

  const handleSelect = (e: SelectChangeEvent<number>): void => {
    setQty(Number(e.target.value));
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
    <Container sx={{ mt: 2 }} maxWidth={false}>
      <Link to="/">Go Back</Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <>
          {!product ? null : (
            <>
              <Grid
                container
                spacing={2}
                sx={{ mt: 2 }}
                maxWidth="false"
              >
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <Typography variant="h3">
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
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        ${product.price}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>{product.description}</Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        {product.countInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Typography>
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
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )}
                    <ListItem sx={{ my: 2 }}>
                      <Button
                        onClick={addToCartHandler}
                        fullWidth
                        variant="contained"
                        color="primary"
                        // startIcon={<ShoppingCartIcon />}
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ mt: 2 }}
                maxWidth="false"
              >
                <Grid item xs={12}>
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
                    <ListItem sx={{ p: 0 }}>
                      <Typography variant="h6" sx={{ my: 2 }}>
                        Write a review
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      {userInfo ? (
                        <form onSubmit={submitHandler}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <FormControl
                                fullWidth
                                variant="outlined"
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
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id="comment"
                                label="Review"
                                multiline
                                rows={5}
                                variant="outlined"
                                fullWidth
                                value={comment}
                                onChange={(e) =>
                                  setComment(e.target.value)
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
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
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductPage;
