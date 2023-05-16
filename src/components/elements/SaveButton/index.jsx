import { useState } from 'react';
import Button from '../Button';
import { ButtonGroup, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FiSave } from 'react-icons/fi';
import { TbCopy, TbTrash, TbSquaresDiagonal } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import propostaService from '@/commom/service/propostaService';
import { useRouter } from 'next/router';

const iconProps = {
  size: 20
}

export default function SaveButton({ iconStyle }) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const propostaAtual = useSelector(state => state.propostaAtual.data);
  async function saveProposta(proposta) {
    closeMenu();
    return await propostaService.saveProposta(proposta || propostaAtual);
  }

  async function versionar() {
    const novaProposta = {
      ...propostaAtual,
      versaoProposta: await propostaService.getNextVersion(),
      id: undefined,
      status: propostaAtual.status === 'aprovada' ? 'aprovada' : propostaAtual.status,
      contrato: '',
    };
    await saveProposta(novaProposta);
  }
  async function clonar() {
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
  async function excluir() {
    closeMenu();
    const response = await propostaService.deleteProposta(propostaAtual.id);
    if (response.affectedRows) {
      router.push('/');
    }
  }

  return (
    <>
      <ButtonGroup>
        <Button variant='contained' startIcon={<FiSave {...iconStyle} />} onClick={() => saveProposta()}>
          Salvar
        </Button>
        <Button variant="contained" onClick={handleMenu} className='dropdown'>
          <RiArrowDropDownLine size={20} />
        </Button>
      </ButtonGroup>

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
        <MenuItem onClick={versionar}>
          <ListItemIcon>
            <TbSquaresDiagonal {...iconProps} />
          </ListItemIcon>
          Versionar (nova versão)
        </MenuItem>
        <MenuItem onClick={clonar}>
          <ListItemIcon>
            <TbCopy {...iconProps} />
          </ListItemIcon>
          Clonar (nova proposta)
        </MenuItem>
        <Divider />
        <MenuItem onClick={excluir}>
          <ListItemIcon>
            <TbTrash {...iconProps} />
          </ListItemIcon>
          Excluir versão atual
        </MenuItem>
      </Menu>
    </>
  )
}
