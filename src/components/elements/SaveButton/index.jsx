import { useState } from 'react';
import Button from '../Button';
import { Alert, ButtonGroup, Divider, ListItemIcon, Menu, MenuItem, Snackbar } from '@mui/material';
import { FiSave } from 'react-icons/fi';
import { TbCopy, TbTrash, TbSquareRoundedPlus, TbSquaresDiagonal, TbSquaresFilled, TbSquarePlus, TbSquareRoundedChevronsUp, TbSquareChevronsUp } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import propostaService from '@/commom/service/propostaService';

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
  async function saveProposta() {
    try {
      const response = await propostaService.saveProposta(propostaAtual);
      setMsgAlert(
        <Alert
          onClose={closeSnack}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Proposta salva com sucesso!
        </Alert>
      )
    } catch (err) {
      console.log(err)
      setMsgAlert(
        <Alert
          onClose={closeSnack}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {err}
        </Alert>
      )
    }
  }

  const [msgAlert, setMsgAlert] = useState('');
  const closeSnack = () => {
    setMsgAlert('');
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
      <Snackbar
        open={Boolean(msgAlert)}
        autoHideDuration={6000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {msgAlert || <></>}
      </Snackbar>
    </>
  )
}
