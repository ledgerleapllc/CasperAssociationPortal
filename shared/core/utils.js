import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export const formatDate = (time, formatType = 'dd/MM/yyyy') => {
  let timeConvert = new Date(time);
  if (!time) timeConvert = new Date();
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  return format(timeConvert, formatType);
};

export const formatDateEST = (time, formatType = 'dd/MM/yyyy') => {
  if (time) return format(zonedTimeToUtc(time, 'UTC'), formatType);
  return format(new Date(), formatType);
};

export const getShortNodeAddress = (address, length = 10) => {
  if (address?.length > length + 6) {
    return `${address.substr(0, length)}...${address.substr(-6)}`;
  }
  return address;
};

export const generateTextForEras = resposiveness_value => {
  if (resposiveness_value === 0 || resposiveness_value) {
    return `${resposiveness_value} era${resposiveness_value > 1 ? 's' : ''} ${
      resposiveness_value < 0 ? 'late' : 'early'
    }`;
  }
  return '';
};

export const numberWithCommas = str =>
  str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
