import { MenuItem, Select } from '@mui/material'
import React, { memo } from 'react'

function VersionSelector({options, ...props}) {
  return (
    <Select variant='standard' size='small' {...props}>
      {options.map(option =>
        <MenuItem key={option.id} value={option.versaoProposta}>v{option.versaoProposta}</MenuItem>
      )}
    </Select>
  )
}

export default memo(VersionSelector);
