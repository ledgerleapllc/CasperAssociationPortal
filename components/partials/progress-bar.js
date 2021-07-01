import { useEffect, useState } from 'react';

const ProgressBar = ({ counts, totalCounts }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTemp = Math.round((counts / totalCounts) * 100);
    setProgress(progressTemp);
  }, [counts, totalCounts]);

  return (
    <div className="w-full h-5 overflow-hidden h-4 mt-2 text-xs border border-gray1 flex rounded-lg bg-gray1">
      <div
        className="w-0 transition-width duration-600 ease-in-out transhadow-none flex flex-col text-center whitespace-nowrap rounded-lg bg-primary"
        style={{ width: `${progress}%` }}
      >
        {!!progress && (
          <p className="w-full text-center text-white">{progress}%</p>
        )}
      </div>
      <>{!progress && <p className="w-full text-center text-white">0%</p>}</>
    </div>
  );
};

export default ProgressBar;
