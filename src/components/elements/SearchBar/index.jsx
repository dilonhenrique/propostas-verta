import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'

export default function SearchBar() {
  const [busca, setBusca] = useState('')
  return (
    <TextField
      value={busca}
      onChange={evento => setBusca(evento.target.value)}
      variant='outlined'
      size="small"
      type='search'
      placeholder='Buscar...'
      InputProps={{
        sx: {
          // backgroundColor: '#e7e7e7',
          borderRadius: 50,
          height: 30,
          // '&::focus': {
          //   backgroundColor: '#ffffff',
          // }
        },
        startAdornment:
          <InputAdornment position="start">
            <TbSearch size={18} />
          </InputAdornment>
      }}
    />
  )
}
