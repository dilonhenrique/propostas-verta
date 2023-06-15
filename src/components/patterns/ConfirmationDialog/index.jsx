import { tokenService } from '@/commom/service/tokenService';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { } from 'react';

export default function ConfirmationDialog({ open, setOpen, action, title, description }) {
  function handleClose() { setOpen(false) };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {title || 'Tem certeza?'}
      </DialogTitle>
      {description &&
        <DialogContent>
          <h3>{description}</h3>
        </DialogContent>}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose}>Não</Button>
        <Button variant='contained' onClick={() => {handleClose (); action();}}>Sim</Button>
      </DialogActions>
    </Dialog>
  )
}
