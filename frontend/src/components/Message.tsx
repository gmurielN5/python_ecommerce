import { ReactElement } from 'react';
import Alert from '@mui/material/Alert';

export const Message: React.FC<{
  severity: 'error' | 'warning' | 'info' | 'success';
  children: ReactElement;
}> = ({ severity, children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};
