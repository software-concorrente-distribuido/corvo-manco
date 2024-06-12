import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarProps } from './types';

export function Calendar({ value, setValue }: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem sx={{ maxWidth: '240px' }}>
        <DatePicker
          sx={{ background: 'white', borderRadius: '4px' }}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}

export default Calendar;
