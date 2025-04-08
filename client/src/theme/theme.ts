import { createTheme } from '@mui/material/styles';

// Base Colors
const lightGreen = '#6A9A77'; // Primary
const softBeige = '#EDE7D9'; // Secondary
const mutedPeach = '#F4A896'; // Accent
const creamWhite = '#F9F5F1'; // Light background
const darkBrown = '#3A2F2A'; // Text in light mode
// const deepForest = '#2C3E3B'; // Dark mode background
// const mutedIvory = '#D7CEC6'; // Text in dark mode
// const info = '';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightGreen,
    },
    secondary: {
      main: softBeige,
    },
    background: {
      default: creamWhite,
      paper: '#FFFFFF',
    },
    text: {
      primary: darkBrown,
      secondary: '#6E665A',
    },
    error: {
      main: mutedPeach,
    },
    info: {
      main: '#660033',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#3A2F2A', // Rich brown
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#3A2F2A',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#6E665A', // Softer taupe
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#6E665A',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#6E665A',
    },
    body1: {
      fontSize: '1rem',
      color: '#3A2F2A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6E665A',
    },
  },
});

export default theme;
