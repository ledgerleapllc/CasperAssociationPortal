import { format } from 'date-fns';

export const formatDate = (time, formatType = 'dd/MM/yyyy') => {
  const timeConvert = new Date(time);
  console.log('timeConvert', timeConvert);
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  console.log('format(timeConvert, formatType)', format(timeConvert, formatType));
  return format(timeConvert, formatType);
};
