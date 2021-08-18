import { format } from 'date-fns';

export const formatDate = (time, formatType = 'dd/MM/yyyy') => {
  const timeConvert = new Date(time);
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  return format(timeConvert, formatType);
};

export const getShortNodeAddress = address => {
  if (address) {
    return `${address.substr(0, 10)}...${address.substr(-4)}`;
  }
  return '-';
};

export const numberWithCommas = str =>
  str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
