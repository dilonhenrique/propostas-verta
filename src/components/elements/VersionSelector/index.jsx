import { MenuItem, Select } from '@mui/material'
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react'

function VersionSelector({options, ...props}) {
  const router = useRouter();
  return (
    <Select variant='standard' size='small' {...props}>
      {options.map(option =>
        <MenuItem key={option.id} value={option.versao}>v{option.versao}</MenuItem>
      )}
    </Select>
  )
}

export default memo(VersionSelector);
