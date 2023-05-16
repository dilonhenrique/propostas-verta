import propostaService from '@/commom/service/propostaService';
import { CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { SlOptions } from 'react-icons/sl'
import { TbCopy, TbFileCheck, TbSquaresDiagonal, TbTrash } from 'react-icons/tb'

export default function PropostaActions({ proposta }) {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  
  async function saveProposta(propostaAtual) {
    await propostaService.saveProposta(propostaAtual);
    setLoading(false);
  }
  async function versionar(){
    closeMenu();
    setLoading(true);
    const propostaAtual = await propostaService.getSingleProposta(proposta.id);
    const novaProposta = {
      ...propostaAtual,
      versaoProposta: await propostaService.getNextVersion(proposta.numeroProposta),
      id: undefined,
      status: propostaAtual.status === 'aprovada' ? 'aprovada' : propostaAtual.status,
      contrato: '',
    };
    await saveProposta(novaProposta);
  }
  async function clonar(){
    closeMenu();
    setLoading(true);
    const propostaAtual = await propostaService.getSingleProposta(proposta.id);
    const novaProposta = {
      ...propostaAtual,
      numeroProposta: await propostaService.getNextProposta(),
      versaoProposta: 1,
      id: undefined,
      status: 'aberta',
      contrato: '',
    };
    await saveProposta(novaProposta);
  }
  async function excluir(){
    closeMenu();
    setLoading(true);
    await propostaService.deleteProposta(proposta.id);
    setLoading(false);
  }

  return (
    <>
      {loading
        ? <CircularProgress size={16} thickness={6} />
        : <IconButton onClick={handleMenu}><SlOptions size={18} color='#a9a9a9' /></IconButton>
      }
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem disabled onClick={() => {}}>
          <ListItemIcon>
            <TbFileCheck size={20} />
          </ListItemIcon>
          Assinar
        </MenuItem>
        <MenuItem onClick={versionar}>
          <ListItemIcon>
            <TbSquaresDiagonal size={20} />
          </ListItemIcon>
          Versionar (nova versão)
        </MenuItem>
        <MenuItem onClick={clonar}>
          <ListItemIcon>
            <TbCopy size={20} />
          </ListItemIcon>
          Clonar (nova proposta)
        </MenuItem>
        <Divider />
        <MenuItem onClick={excluir}>
          <ListItemIcon>
            <TbTrash size={20} />
          </ListItemIcon>
          Excluir versão
        </MenuItem>
      </Menu>
    </>
  )
}
