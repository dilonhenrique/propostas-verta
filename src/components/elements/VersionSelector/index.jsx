import { MenuItem, Select } from '@mui/material'
import React, { memo, useState } from 'react'

function VersionSelector({options, ...props}) {
  return (
    <Select variant='standard' size='small' {...props}>
      {options.map(option =>
        <MenuItem key={option} value={option}>v{option}</MenuItem>
      )}
    </Select>
  )
}

export default memo(VersionSelector);
