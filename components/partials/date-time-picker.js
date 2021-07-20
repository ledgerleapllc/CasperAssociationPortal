import { useState, useEffect } from 'react';

const DateTimePicker = props => {
  const { onChange, className } = props;
  const [date, setDate] = useState('');
  const toogleDateInput = e => {
    if (e.target.type === 'date') {
      if (e.target.value) {
        const [year, month, day] = e.target.value.split('-');
        setDate(`${month}/${day}/${year}`);
      }
      e.target.type = 'text';
    } else {
      if (e.target.value) {
        const [month, day, year] = e.target.value.split('/');
        setDate(`${year}-${month}-${day}`);
      }
      e.target.type = 'date';
    }
  };

  useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date]);

  return (
    <input
      type="text"
      className={`${className} px-7 lg:auto h-14 rounded-full shadow-md focus:outline-none`}
      placeholder="DOB (mm/dd/yyyy) *"
      onFocus={e => toogleDateInput(e)}
      onBlur={e => toogleDateInput(e)}
      value={date}
      onChange={e => setDate(e.target.value)}
    />
  );
};

export default DateTimePicker;
