import { Box, CircularProgress } from '@mui/material';

export const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};
