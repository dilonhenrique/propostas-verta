import adicionarItem from "@/utils/addItem";
import { InputAdornment, TextField } from "@mui/material";

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

export default function OutlinedInput({ Icon, ...otherProps }) {
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

  return (
    <TextField
      {...otherProps}
    />
  )
}

OutlinedInput.defaultProps = {
  variant: 'outlined',
  size: 'small',
};
