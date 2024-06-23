import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type StepsProps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

export const CheckoutSteps: React.FC<StepsProps> = ({
  step1,
  step2,
  step3,
  step4,
}) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to="/shipping">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to="/payment">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to="/placeorder">
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};
