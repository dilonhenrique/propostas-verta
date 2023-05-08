import calcularProposta from "@/commom/utils/calcularProposta";
import { InputAdornment, TextField } from "@mui/material";
import ReactInputMask from "react-input-mask";

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

export default function OutlinedInput({ onBlur, Icon, ...otherProps }) {
  if (Icon) {
    otherProps.InputProps = {
      ...otherProps.InputProps,
      startAdornment: (
        <InputAdornment position="start">
          <Icon {...iconProps} />
        </InputAdornment>
      )
    }
  }

  function onBlurHandler(evento){
    evento.preventDefault();
    onBlur ? onBlur(evento) : null;
    calcularProposta();
  }

  return (
    <TextField {...otherProps} onBlur={onBlurHandler} />
  )
}

OutlinedInput.defaultProps = {
  variant: 'outlined',
  size: 'small',
};
