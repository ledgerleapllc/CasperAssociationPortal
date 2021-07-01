import { intervalToDuration, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';

const ClockBar = props => {
  const [duration, setDuration] = useState('');
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const diff = intervalToDuration({
      start: new Date(),
      end: props.endTime,
    });

    setDuration(diff);

    const totalSeconds = differenceInSeconds(props.endTime, props.startTime);

    const intervalIdTemp = setInterval(() => {
      const currentTime = new Date();
      const diffTemp = intervalToDuration({
        start: currentTime,
        end: props.endTime,
      });
      const currentSeconds = differenceInSeconds(props.endTime, currentTime);
      const progressTemp = Math.round((currentSeconds / totalSeconds) * 100);
      setProgress(Math.round(progressTemp));
      setDuration(diffTemp);
    }, 1000);

    setIntervalId(intervalIdTemp);
    return () => {
      clearInterval(intervalId);
      setDuration('');
      setProgress(0);
    };
  }, [props.endTime, props.startTime]);

  return (
    <div>
      <p>
        {duration.days}d:{duration.hours}h:{duration.minutes}m
      </p>
      {!props.hideProgressBar && (
        <div
          className={`${props.className} w-28 overflow-hidden h-4 mt-2 text-xs border border-gray flex rounded-lg bg-opacity-50`}
        >
          <div
            className="w-0 transition-width duration-600 ease-in-out transhadow-none flex flex-col text-center whitespace-nowrap rounded-lg bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ClockBar;
