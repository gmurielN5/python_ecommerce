import { Link } from 'react-router-dom';
import { Stepper, Step, StepButton } from '@mui/material';

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
    <Stepper alternativeLabel>
      <Step active={!!step1}>
        <StepButton component={Link} to="/login" disabled={!step1}>
          Login
        </StepButton>
      </Step>
      <Step active={!!step2}>
        <StepButton component={Link} to="/shipping" disabled={!step2}>
          Shipping
        </StepButton>
      </Step>
      <Step active={!!step3}>
        <StepButton component={Link} to="/payment" disabled={!step3}>
          Payment
        </StepButton>
      </Step>
      <Step active={!!step4}>
        <StepButton
          component={Link}
          to="/placeorder"
          disabled={!step4}
        >
          Place Order
        </StepButton>
      </Step>
    </Stepper>
  );
};
