import { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectShippingAddress,
  addShippingAddress,
} from '../store/cart/cartSlice';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { CheckoutSteps } from '../components/CheckoutSteps';

const ShippingPage: React.FC = () => {
  const shippingAddress = useAppSelector(selectShippingAddress);
  const [address, setAddress] = useState<string>(
    shippingAddress?.address || ''
  );
  const [city, setCity] = useState<string>(
    shippingAddress?.city || ''
  );
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState<string>(
    shippingAddress?.country || ''
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addShippingAddress({ address, city, postalCode, country })
    );
    navigate('/payment');
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <CheckoutSteps step1 step2 />
      <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Shipping
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                placeholder="Enter address"
                value={address || ''}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                placeholder="Enter city"
                value={city || ''}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="postalCode"
                label="Postal Code"
                name="postalCode"
                placeholder="Enter postal code"
                value={postalCode || ''}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                placeholder="Enter country"
                value={country || ''}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};
export default ShippingPage;
