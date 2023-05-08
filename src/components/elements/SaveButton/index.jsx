import { useState } from 'react';
import Button from '../Button';
import { Alert, ButtonGroup, Divider, ListItemIcon, Menu, MenuItem, Snackbar } from '@mui/material';
import { FiSave } from 'react-icons/fi';
import { TbCopy, TbTrash, TbSquareRoundedPlus, TbSquaresDiagonal, TbSquaresFilled, TbSquarePlus, TbSquareRoundedChevronsUp, TbSquareChevronsUp } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import propostaService from '@/commom/service/propostaService';
import { useSnackbar } from 'notistack';

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
  async function saveProposta() {
    try {
      const response = await propostaService.saveProposta(propostaAtual);
      //msg de sucesso
      enqueueSnackbar('Proposta salva com sucesso!', { variant: 'success' });
    } catch (err) {
      console.log(err)
      //msg de erro
      enqueueSnackbar('Ops! Erro ao salvar.', { variant: 'error' });
    }
  }

  return (
    <>
      <ButtonGroup>
        <Button variant='contained' startIcon={<FiSave {...iconStyle} />} onClick={saveProposta}>
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
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <TbSquaresDiagonal {...iconProps} />
          </ListItemIcon>
          Versionar (nova versão)
        </MenuItem>
        <MenuItem onClick={closeMenu}>
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
