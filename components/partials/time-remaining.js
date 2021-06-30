import { intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

const TimeRemaining = ({ endTime }) => {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const diff = intervalToDuration({
      start: new Date(),
      end: endTime,
    });

    setDuration(diff);
  }, [endTime]);

  return (
    <span>
      {duration.days}d:{duration.hours}h:{duration.minutes}m
    </span>
  );
};

export default TimeRemaining;
