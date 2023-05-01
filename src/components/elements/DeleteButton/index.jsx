import { IconButton, Tooltip } from '@mui/material';
import { TbTrash } from 'react-icons/tb';

export default function DeleteButton({ iconProps, ...other }) {
  return (
    <Tooltip title="Excluir">
      <IconButton {...other}><TbTrash {...iconProps} /></IconButton>
    </Tooltip>
  )
}
