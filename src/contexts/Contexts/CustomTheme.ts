import { createTheme } from '@mui/material/styles';

export const raynetTheme = createTheme({
  palette: {
    primary: {
      main: '#00A5C8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#707070',
    },
    background: {
      default: '#f4f7f8', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    success: {
      main: '#5FAA00',
    },
    warning: {
      main: '#E1AF37', 
    },
    error: {
      main: '#F07355', 
    },
    info: {
      main: '#00AF78',
    },
    
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontSize: '1.8rem',
      fontWeight: 400,
      color: '#333',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 8, 
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e0e6e8',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});