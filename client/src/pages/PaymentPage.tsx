import { useState, SyntheticEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectShippingAddress,
  addPaymentMethod,
} from '../store/cart/cartSlice';

import {
  Button,
  Container,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { CheckoutSteps } from '../components/CheckoutSteps';

const PaymentPage: React.FC = () => {
  const shippingAddress = useAppSelector(selectShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <>
      {!shippingAddress && <Navigate to="/login" replace={true} />}
      <Container>
        <CheckoutSteps step1 step2 step3 />
        <Container component="main" maxWidth="md">
          <Typography component="h1" variant="h5">
            Payment Method
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Select Method
                  </FormLabel>
                  <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="PayPal"
                      control={<Radio />}
                      label="PayPal or Credit Card"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Continue
              </Button>
            </Grid>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default PaymentPage;
