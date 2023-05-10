import { useState } from 'react';
import Button from '../Button';
import { Alert, ButtonGroup, Divider, ListItemIcon, Menu, MenuItem, Snackbar } from '@mui/material';
import { FiSave } from 'react-icons/fi';
import { TbCopy, TbTrash, TbSquareRoundedPlus, TbSquaresDiagonal, TbSquaresFilled, TbSquarePlus, TbSquareRoundedChevronsUp, TbSquareChevronsUp } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import propostaService from '@/commom/service/propostaService';
import { useSnackbar } from 'notistack';
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';

const iconProps = {
  size: 20
}

export default function SaveButton({ iconStyle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const propostaAtual = useSelector(state => state.propostaAtual);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  async function saveProposta(proposta) {
    closeMenu();
    try {
      const response = await propostaService.saveProposta(proposta || propostaAtual);
      enqueueSnackbar('Proposta salva com sucesso!', { variant: 'success' });
      return response;
    } catch (err) {
      console.log(err)
      enqueueSnackbar('Ops! Erro ao salvar.', { variant: 'error' });
      return err;
    }
  }

  async function versionar(){
    const novaProposta = {
      ...propostaAtual,
      versaoProposta: propostaService.getNextVersion(),
      id: undefined,
      status: propostaAtual.status === 'aprovada' ? 'aprovada' : propostaAtual.status,
      contrato: '',
    };
    const response = await saveProposta(novaProposta);
    
    //update no store
    propostaDispatcher.updateVersions(await propostaService.getVersions(novaProposta.numeroProposta));
    propostaDispatcher.updateProposta({...novaProposta, id: response.insertId});
  }
  async function clonar(){
    const novaProposta = {
      ...propostaAtual,
      numeroProposta: await propostaService.getNextProposta(),
      versaoProposta: 1,
      id: undefined,
      status: 'aberta',
      contrato: '',
    };
    const response = await saveProposta(novaProposta);

    //update no store
    propostaDispatcher.updateVersions(await propostaService.getVersions(novaProposta.numeroProposta));
    propostaDispatcher.updateProposta({...novaProposta, id: response.insertId});
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
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <TbTrash {...iconProps} />
          </ListItemIcon>
          Excluir versão atual
        </MenuItem>
      </Menu>
    </>
  )
}
