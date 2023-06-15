import { Button, FormControl, InputBase, MenuItem, Select, ThemeProvider, createTheme, styled } from '@mui/material'
import React, { useState } from 'react'

export default function StatusSelector({ onChange, isLoading, ...props }) {

  if (props.value === 'aprovada*') {
    props.value = 'aprovada';
    props.disabled = true;
  };

  const color = {
    aprovada: 'success',
    aberta: 'info',
    recusada: 'error',
  }

  const SelectColorFull = styled(Select)(({ theme }) => ({
    borderRadius: '5rem',
    backgroundColor: theme.palette[color[props.value]]?.main,
    color: theme.palette[color[props.value]]?.contrastText,
    border: 'none',
    height: '2rem',
    fontSize: '.8rem',
    fontWeight: '700',
    transition: '0.3s',
    ':hover': {
      backgroundColor: theme.palette[color[props.value]]?.dark,
    },
    '.MuiOutlinedInput-notchedOutline': { border: 0 },
    '.MuiSelect-icon': { color: theme.palette[color[props.value]]?.contrastText, },
    '.MuiInputBase-input': { textOverflow: 'inherit', },
    // '&.loading': {
    //   width: '2rem',
    //   '> *': { opacity: 0 }
    // }
  }))

  return (
    <SelectColorFull
      onChange={onChange}
      color={color[props.value] || null}
      fullWidth
      variant='outlined'
      size='small'
      className={isLoading ? 'loading' : ''}
      disabled={isLoading}
      {...props}
    >
      <MenuItem value='aberta'>Aberta</MenuItem>
      <MenuItem value='aprovada'>Aprovada</MenuItem>
      <MenuItem value='recusada'>Recusada</MenuItem>
    </SelectColorFull>
  )
}