import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';

export default function DateInput({error = false, value, ...props}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DatePicker
        {...props}
        value={dayjs(value)}
        slotProps={{ textField: { variant: 'outlined', error }, }}
      />
    </LocalizationProvider>
  )
}
