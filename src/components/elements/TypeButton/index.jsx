import mudarItem from '@/utils/dispatchers/mudarItem';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { TbTriangleSquareCircle } from 'react-icons/tb'

export default function TypeButton({ iconProps, changeFn }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (taskType) => {
    setAnchorEl(null);
    if (typeof taskType === 'string') {
      changeFn(taskType)
    }
  };

  return (
    <>
      <Tooltip title="Tipo de tarefa">
        <IconButton onClick={handleMenu}>
          <TbTriangleSquareCircle {...iconProps} />
        </IconButton>
      </Tooltip>
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
        <MenuItem onClick={() => handleClose('fase')}>
          Fase
        </MenuItem>
        <MenuItem onClick={() => handleClose('tarefa')}>
          Tarefa
        </MenuItem>
        <MenuItem onClick={() => handleClose('terceirizada')}>
          Terceiros
        </MenuItem>
      </Menu>
    </>
  )
}
