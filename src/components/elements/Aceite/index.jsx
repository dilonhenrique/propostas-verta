import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

export default function AceiteCheckbox({error, value, onChange, ...props}) {
  return (
    <FormControlLabel sx={{color: error ? 'red' : 'inherit'}} control={<Checkbox value={value} onChange={onChange} />} {...props} />
  )
}
