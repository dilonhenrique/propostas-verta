import ButtonMui from '@mui/material/Button';

export default function Button({ children, ...props }) {
  return (
    <ButtonMui {...props}>{children}</ButtonMui>
  )
}

Button.defaultProps = {
  variant: 'outlined',
  size: 'small',
};