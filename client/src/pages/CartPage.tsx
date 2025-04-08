import React, { useEffect } from 'react';

import {
  useLocation,
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cart/cartActions';

import {
  removeItem,
  selectCart,
  selectCartLoading,
  selectCartError,
} from '../store/cart/cartSlice';

import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  SelectChangeEvent,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

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
  const loading = useAppSelector(selectCartLoading);
  const error = useAppSelector(selectCartError);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id: Number(id), quantity: qty }));
    }
  }, [id, qty, dispatch]);

  const removeFromCartHandler = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleChange = (
    event: SelectChangeEvent<number>,
    id: number
  ) => {
    const value = Number(event.target.value);
    dispatch(addToCart({ id: id, quantity: value }));
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Shopping Cart
          </Typography>
          {loading && <Loader />}
          {error && (
            <Message severity="error">
              <>{error}</>
            </Message>
          )}
          {cartItems.length === 0 ? (
            <Message severity="info">
              <>
                Your cart is empty <Link to="/">Go Back</Link>
              </>
            </Message>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item._id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', borderRadius: '4px' }}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Link to={`/product/${item._id}`}>
                        {item.name}
                      </Link>
                    </Grid>
                    <Grid item md={2}>
                      ${item.price}
                    </Grid>
                    <Grid item md={3}>
                      <Select
                        value={item.quantity}
                        onChange={(e) => handleChange(e, item._id)}
                        fullWidth
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() =>
                          removeFromCartHandler(Number(item._id))
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
                ) items
              </Typography>
              <Typography variant="h6">
                $
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )
                  .toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                disabled={cartItems.length === 0}
                onClick={() => navigate('/shipping')}
              >
                Proceed To Checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
