import { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectShippingAddress,
  addShippingAddress,
} from '../store/cart/cartSlice';

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
    <>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter city"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter postal code"
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  );
};
export default ShippingPage;
