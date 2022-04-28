import { useEffect, useState } from 'react';

const LineProgressBar = ({ text, progress, options }) => {
  const progressbarTextPosition = () => {
    if (progress >= 15 && progress <= 55) {
      return {
        left: `${progress / 2}%`,
        fontSize: '10px',
      };
    }
    return {
      left: `50%`,
      fontSize: '10px',
    };
  };

  return (
    <div className="w-full mb-3">
      <div
        className="progress-bar progress-bar-line relative w-full overflow-hidden mt-3 text-xs border border-gray1 flex rounded-lg bg-gray1"
        style={{ height: '16px', padding: '0.03rem' }}
      >
        <div
          className="w-0 transition-width duration-600 ease-in-out transhadow-none flex whitespace-nowrap rounded-lg bg-primary"
          style={{ width: `${progress}%` }}
        />
        <span
          className="progress-label text-white absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={progressbarTextPosition()}
        >
          {text}
        </span>
      </div>
      <div className="w-full flex justify-between">
        <span className="text-xs text-gray">{options?.startText}</span>
        <span className="text-xs text-gray">{options?.endText}</span>
      </div>
    </div>
  );
};

const CircleProgressBar = ({ text, progress }) => {
  let progressValue = 0;
  if (progress && !Number.isNaN(progress)) progressValue = parseFloat(progress);

  return (
    <div className="progress-bar progress-bar-circle h-0 aspect-w-1 aspect-h-1 relative w-full inline-flex items-center justify-center overflow-hidden rounded-full">
      <div>
        <svg width="100%" height="100%">
          <circle
            className="progress-tracker shadow-light"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r="40%"
            cx="50%"
            cy="50%"
          />
          <circle
            className="progress-tracking"
            strokeWidth={progressValue ? '6' : '0'}
            strokeDasharray={45 * 2 * Math.PI}
            strokeDashoffset={
              45 * 2 * Math.PI - (progressValue / 100) * 45 * 2 * Math.PI
            }
            stroke="currentColor"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            fill="transparent"
            r="40%"
            cx="50%"
            cy="50%"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-y-2/4 -translate-x-2/4 h-4/5 w-4/5 shadow-normal rounded-full" />
        <span className="progress-label font-thin absolute text-2xl top-1/2 left-1/2 transform -translate-y-2/4 -translate-x-2/4">
          {text}
        </span>
      </div>
    </div>
  );
};

const ProgressBar = props => {
  const { shape = 'line', value, mask = '', total } = props;
  const [progress, setProgress] = useState(0);

  const renderText = () => mask.replace('x', value || 0).replace('y', total);

  useEffect(() => {
    let progressTemp;
    if (!total) {
      progressTemp = value;
    } else {
      progressTemp =
        value > 0 && !!total ? Math.round((value / total) * 100) : 0;
    }
    setProgress(progressTemp);
  }, [value, total]);

  if (shape === 'line') {
    return (
      <LineProgressBar progress={progress} text={renderText()} {...props} />
    );
  }
  if (shape === 'circle') {
    return (
      <CircleProgressBar progress={progress} text={renderText()} {...props} />
    );
  }
  return null;
};

export default ProgressBar;
