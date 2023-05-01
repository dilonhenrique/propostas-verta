import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8D47FF'
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.75em'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.85em'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      }
    }
  }
});