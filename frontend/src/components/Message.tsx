import { ReactElement } from 'react';
import { Alert } from 'react-bootstrap';

export const Message: React.FC<{
  variant: string;
  children: ReactElement;
}> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
