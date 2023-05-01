import { useState } from 'react';
import Button from '../Button';
import { ButtonGroup, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FiSave } from 'react-icons/fi';
import { TbCopy, TbTrash, TbSquareRoundedPlus, TbSquaresDiagonal, TbSquaresFilled, TbSquarePlus, TbSquareRoundedChevronsUp, TbSquareChevronsUp } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/Ri';

const iconProps = {
  size: 20
}

export default function SaveButton({ iconStyle }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup>
        <Button variant='contained' startIcon={<FiSave {...iconStyle} />}>
          <p>Salvar</p>
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
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TbSquaresDiagonal {...iconProps} />
          </ListItemIcon>
          Versionar (nova versão)
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TbCopy {...iconProps} />
          </ListItemIcon>
          Clonar (nova proposta)
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TbTrash {...iconProps} />
          </ListItemIcon>
          Excluir versão atual
        </MenuItem>
      </Menu>
    </>
  )
}
