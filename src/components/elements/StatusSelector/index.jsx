import { MenuItem, Select, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'

export default function StatusSelector({ onChange, ...props }) {

  if (props.value === 'aprovada*') {
    props.value = 'aprovada';
    props.disabled = true;
  };

  const color = {
    aprovada: 'success',
    aberta: 'info',
    recusada: 'error',
  }

  const personalized = createTheme({
    components: {
      MuiSelect: {
        defaultProps: {
          fullWidth: true,
          variant: 'outlined',
          size: 'small',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '5rem',
            backgroundColor: theme.palette[color[props.value]]?.light,
            color: theme.palette[color[props.value]]?.contrastText,
            border: 'none',
            height: '2rem',
            fontSize: '.8rem',
            fontWeight: '700',
            transition: '0.3s',
            ':hover': {
              backgroundColor: theme.palette[color[props.value]]?.main,
            },
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
          }),
          icon: ({ theme }) => ({
            color: theme.palette[color[props.value]]?.contrastText,
          }),
        }
      }
    }
  })

  

  return (
    <ThemeProvider theme={personalized}>
      <Select
        onChange={onChange}
        color={color[props.value] || null}
        {...props}
      >
        <MenuItem value='aberta'>Aberta</MenuItem>
        <MenuItem value='aprovada'>Aprovada</MenuItem>
        <MenuItem value='recusada'>Recusada</MenuItem>
      </Select>
    </ThemeProvider>
  )
}