import LinkIntegration from "@/components/elements/LinkIntegration";
import { createTheme } from "@mui/material";
import { ptBR } from '@mui/x-date-pickers/locales';

export const verta = createTheme(
  {
    palette: {
      primary: {
        main: '#8D47FF'
      }
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif',
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
      },
      /*Estilização do Stepper */
      MuiStepButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            padding: 0,
            margin: 0,
            borderRadius: '20px',
            '.MuiStepLabel-label': {
              transition: '0.3s',
              marginRight: '1rem',
              marginLeft: '0.5rem',
              textTransform: 'uppercase',
              color: ownerState.disabled ? theme.palette.grey[300] : theme.palette.primary.main,
              fontWeight: ownerState.disabled ? theme.typography.fontWeightRegular : 'bold',
              '&.Mui-active, &.Mui-completed': {
                color: theme.palette.primary.main,
                fontWeight: 'bold',
              },
            },
            '.MuiStepLabel-iconContainer': {
              transition: '0.3s',
              padding: 0,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              lineHeight: '39px',
              justifyContent: 'center',
              alignItems: 'center',
              border: `2px ${ownerState.disabled ? theme.palette.grey[300] : theme.palette.primary.main} solid`,
              background: 'transparent',
              'svg': { fill: ownerState.disabled ? theme.palette.grey[300] : theme.palette.primary.main },
              'text': { fill: ownerState.disabled ? theme.palette.grey[300] : theme.palette.primary.main, fontWeight: '600' },
              'circle': { display: 'none' },
              '&.Mui-active': {
                background: theme.palette.primary.main,
                'text': { fill: theme.palette.primary.contrastText },
                'svg': { fill: theme.palette.primary.dark },
              }
            }
          }),
        }
      },
    }
  },
  ptBR
);

export const dark = createTheme(
  {
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
  },
  ptBR
)
