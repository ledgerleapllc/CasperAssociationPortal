import { format } from 'date-fns';

export const formatDate = (time, formatType = 'dd/MM/yyyy') => {
  const timeConvert = new Date(time);
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  return format(timeConvert, formatType);
};
