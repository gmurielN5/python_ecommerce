import { ReactElement } from 'react';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

export const Message: React.FC<{
  severity: 'error' | 'warning' | 'info' | 'success';
  children: ReactElement;
}> = ({ severity, children }) => {
  return (
    <Alert
      variant="outlined"
      severity={severity}
      sx={{ alignItems: 'center', my: 2 }}
    >
      <Typography variant="h5">{children}</Typography>
    </Alert>
  );
};
