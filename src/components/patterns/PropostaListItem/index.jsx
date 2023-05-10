import toCurrency from '@/commom/utils/toCurrency';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TbCopy, TbSquaresDiagonal, TbTrash } from 'react-icons/tb';

export default function PropostaListItem({ proposta }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = (id) => {
    setAnchorEl(null);
    // Router.push(`/editar/${id}`);
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr 2fr 2fr 1fr', gap: 2 }}>
        <ListItemButton onClick={(evento) => {
          evento.stopPropagation();
          if(proposta.versoes.length) handleMenu(evento);
        }}>
          {`${proposta.numeroProposta}.${proposta.versaoProposta}`}<RiArrowDropDownLine size={20} />
        </ListItemButton>
        {/* <ListItemButton onClick={() => Router.push(`/editar/${proposta.id}`)}> */}
        <ListItemText secondary={proposta.marca}>
          <Link href={`/editar/${proposta.id}`}>{proposta.nomeProjeto}</Link>
        </ListItemText>
        <ListItemText secondary={proposta.cliente} />
        <ListItemText secondary={toCurrency(proposta.valorTotal)} />
        <ListItemText secondary={proposta.status} />
        {/* </ListItemButton> */}
      </ListItem>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {proposta.versoes.map(versao => (
          <MenuItem key={versao.id} onClick={() => closeMenu(versao.id)}>
            {`${versao.numeroProposta}.${versao.versaoProposta}`}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
