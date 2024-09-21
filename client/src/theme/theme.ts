import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A bold blue
      light: '#63a4ff', // A lighter shade of the primary color
      dark: '#004ba0', // A darker shade of the primary color
      contrastText: '#ffffff', // Text color to be used on primary color background
    },
    secondary: {
      main: '#f50057', // A vibrant pink
      light: '#ff5983', // A lighter shade of the secondary color
      dark: '#bb002f', // A darker shade of the secondary color
      contrastText: '#ffffff', // Text color to be used on secondary color background
    },
    background: {
      default: '#f4f6f8', // A light grey background for the overall app
      paper: '#ffffff', // A white background for cards, dialogs, etc.
    },
    text: {
      primary: '#333333', // Dark text for readability on light backgrounds
      secondary: '#555555', // Slightly lighter text for secondary information
    },
    error: {
      main: '#d32f2f', // Error color, typically used for validation messages
    },
    warning: {
      main: '#ffa726', // Warning color, useful for alerts
    },
    info: {
      main: '#0288d1', // Info color, often used for less critical information
    },
    success: {
      main: '#388e3c', // Success color, typically used for success messages
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Disable uppercase transformation for buttons
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for components
  },
});

export default theme;
