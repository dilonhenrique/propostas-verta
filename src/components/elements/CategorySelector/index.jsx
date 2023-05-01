import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { memo } from 'react';

function CategorySelector(props) {
  const categorias = [
    {
      value: 'IV',
      label: 'Identidade visual'
    },
    {
      value: 'NAM',
      label: 'Naming'
    },
    {
      value: 'NIV',
      label: 'Naming + Id visual'
    },
    {
      value: 'EMB',
      label: 'Embalagem'
    },
    {
      value: 'DESIGN',
      label: 'Design'
    },
    {
      value: 'MOVIE',
      label: 'Audio visual'
    },
  ]
  return (
    <FormControl fullWidth sx={{ minWidth: 200 }}>
      <InputLabel id='categoria'>categoria</InputLabel>
      <Select variant='outlined' label='categoria' labelId='categoria' {...props}>
        {categorias.map(categoria =>
          <MenuItem key={categoria.value} value={categoria.value}>{categoria.label}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default memo(CategorySelector);
