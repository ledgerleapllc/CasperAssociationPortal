import { useEffect, useState } from 'react';

const ProgressBar = props => {
  const { counts, totalCounts, percent, type, startText, endText } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTemp = Math.round((counts / totalCounts) * 100);
    setProgress(progressTemp);
  }, [counts, totalCounts]);

  useEffect(() => {
    if (percent) {
      setProgress(percent);
    }
  }, [percent]);

  const generateProgressPercent = () => {
    if (type === 'text') {
      return <></>;
    }

    if (type === 'count') {
      return (
        <>
          {(!!counts || !!totalCounts) && (
            <p className="w-full text-center text-white">
              {counts}/{totalCounts}
            </p>
          )}
        </>
      );
    }

    return (
      <>
        {!!progress && (
          <p className="w-full text-center text-white">{progress}%</p>
        )}
      </>
    );
  };

  return (
    <>
      <div className="w-full h-5 overflow-hidden h-4 mt-2 text-xs border border-gray1 flex rounded-lg bg-gray1">
        <div
          className="w-0 transition-width duration-600 ease-in-out transhadow-none flex flex-col text-center whitespace-nowrap rounded-lg bg-primary"
          style={{ width: `${progress}%` }}
        >
          {generateProgressPercent()}
        </div>
        <>
          {!progress && type !== 'text' && (
            <>
              {type === 'count' ? (
                <p className="w-full text-center text-white">
                  {counts}/{totalCounts}
                </p>
              ) : (
                <p className="w-full text-center text-white">0%</p>
              )}
            </>
          )}
        </>
      </div>
      <>
        {type === 'text' && (
          <div className="w-full flex justify-between">
            <span className="text-xs text-gray">{startText}</span>
            <span className="text-xs text-gray">{endText}</span>
          </div>
        )}
      </>
    </>
  );
};

export default ProgressBar;
