// import { format } from 'date-fns';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';

export const getDateObject = (dateString = null) => {
  if (dateString) {
    if (dateString.includes('T') && dateString.includes('Z')) {
      return new Date(dateString);
    }
    return new Date(`${dateString} UTC`);
  }
  return new Date();
};

export const formatDate = (
  time,
  formatType = 'dd/MM/yyyy',
  fromNonUTC = false
) => {
  const timeConvert = getDateObject(time);
  if (timeConvert.toString() === 'Invalid Date') return timeConvert.toString();
  if (fromNonUTC || (time && time.includes('T') && time.includes('Z'))) {
    return formatInTimeZone(zonedTimeToUtc(timeConvert), 'UTC', formatType);
  }
  // return format(timeConvert, formatType);
  return formatInTimeZone(timeConvert, 'UTC', formatType);
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
