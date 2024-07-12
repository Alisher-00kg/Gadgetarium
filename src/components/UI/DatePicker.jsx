import * as React from 'react';
import dayjs from 'dayjs';
// import 'dayjs/locale/ru';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import utc from 'dayjs/plugin/utc';
import { IconButton, Stack, Typography, styled } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

dayjs.extend(utc);
dayjs.locale('ru');

function CustomCalendarHeader(props) {
   const { currentMonth, onMonthChange } = props;

   const selectNextMonth = () =>
      onMonthChange(currentMonth.add(1, 'month'), 'left');
   const selectNextYear = () =>
      onMonthChange(currentMonth.add(1, 'year'), 'left');
   const selectPreviousMonth = () =>
      onMonthChange(currentMonth.subtract(1, 'month'), 'right');
   const selectPreviousYear = () =>
      onMonthChange(currentMonth.subtract(1, 'year'), 'right');

   return (
      <CustomCalendarHeaderRoot>
         <Stack spacing={1} direction="row">
            <IconButton onClick={selectPreviousMonth} title="Previous month">
               <ChevronLeft />
            </IconButton>
         </Stack>
         <Typography variant="body2">
            {currentMonth.format('MMMM YYYY')}
         </Typography>
         <Stack spacing={1} direction="row">
            <IconButton onClick={selectNextMonth} title="Next month">
               <ChevronRight />
            </IconButton>
         </Stack>
      </CustomCalendarHeaderRoot>
   );
}
export default function DatePicker({
   selected,
   onChange,
   dateFormat,
   value,
   minDate,
   maxDate,
}) {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruRU}>
         <DemoContainer components={['DatePicker']}>
            <MuiDatePicker
               selected={selected}
               onChange={onChange}
               dateFormat={dateFormat}
               value={value}
               minDate={minDate}
               maxDate={maxDate}
               slots={{
                  calendarHeader: CustomCalendarHeader,
               }}
               slotProps={{
                  desktopPaper: {
                     sx: {
                        '.MuiPickersDay-root:focus.Mui-selected': {
                           background: '#cb11ab',
                           color: '#fff',
                        },
                     },
                  },
               }}
            />
         </DemoContainer>
      </LocalizationProvider>
   );
}

const CustomCalendarHeaderRoot = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '8px 16px',
   alignItems: 'center',
});
