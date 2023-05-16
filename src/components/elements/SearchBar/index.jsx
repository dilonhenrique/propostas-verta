import { setSearch } from '@/store/reducers/listaPropostas';
import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import { useDispatch } from 'react-redux';

export default function SearchBar() {
  const [busca, setBusca] = useState('');
  const dispatch = useDispatch();
  function buscar(evento) {
    evento.preventDefault();
    dispatch(setSearch(evento.target.value));
  }
  function keyDown(evento){
    if(evento.keyCode == 13){
      buscar(evento);
    }
  }

  return (
    <form onSubmit={buscar}>
      <TextField
        value={busca}
        onChange={evento => setBusca(evento.target.value)}
        onBlur={buscar}
        onKeyDown={keyDown}
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
          endAdornment:
            <InputAdornment position="end">
              <TbSearch size={18} />
            </InputAdornment>
        }}
      />
    </form>
  )
}
