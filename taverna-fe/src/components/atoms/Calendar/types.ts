import { Dayjs } from 'dayjs';

export interface CalendarProps {
  value: Dayjs | null;
  setValue: (value: Dayjs | null) => void;
}
