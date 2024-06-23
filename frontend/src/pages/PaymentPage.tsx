import { useState, SyntheticEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectShippingAddress,
  addPaymentMethod,
} from '../store/cart/cartSlice';

import { Form, Button, Col } from 'react-bootstrap';

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
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentPage;
