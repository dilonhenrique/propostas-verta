import ButtonMui from '@mui/material/Button';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function AddButton({ children, ...props }) {
  return (
    <ButtonMui startIcon={<AiOutlinePlusCircle size={18} />} {...props}>{children}</ButtonMui>
  )
}

AddButton.defaultProps = {
  variant: 'contained',
  size: 'small',
  sx: {
    width: '50%',
    maxWidth: '300px',
    marginTop: 2,
    alignSelf: 'center'
  },
};