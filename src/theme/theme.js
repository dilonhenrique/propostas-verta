import LinkIntegration from "@/components/elements/LinkIntegration";
import { createTheme } from "@mui/material";

export const verta = createTheme({
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
    },
    MuiLink: {
      defaultProps: {
        component: LinkIntegration
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkIntegration
      }
    }
  }
});

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8D47FF'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkIntegration
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkIntegration
      }
    },
  }
})
