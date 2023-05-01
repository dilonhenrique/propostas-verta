import { TextField } from "@mui/material";

export default function StandardInput({ propKey, ...props }) {

  return (
    <TextField {...props} />
  )
}

StandardInput.defaultProps = {
  variant: 'standard'
};
