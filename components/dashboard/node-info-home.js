import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const NodeInfoHome = () => {
  const percenCPU = 61;
  const percenPerformance = 83;
  return (
    <div className="flex flex-col pt-5 lg:pb-3">
      <span className="text-2xl">Node Info</span>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-lg">Node Rank</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-black1 font-thin">8</span>
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-lg">Stake Amount</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-black1 font-thin">2,502,815</span>
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-lg">Delegators</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-black1 font-thin">8</span>
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-lg">Uptime</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
          <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
            75%
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-2 pb-9 border-b-2 border-gray">
        <div className="flex flex-row">
          <span className="text-lg">Peers</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
          <div className="w-1/2 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
            49/88
          </div>
        </div>
      </div>
      <div className="flex justify-between py-9">
        <div className="flex w-1/2 pr-2 flex-col">
          <div className="flex flex-row pb-4">
            <span className="text-sm font-medium">CPU Load</span>
            <img
              className="pl-2"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <div style={{ height: '100%', width: '100%' }}>
            <CircularProgressbar
              value={percenCPU}
              text={`${percenCPU}%`}
              styles={buildStyles({
                pathColor: '#FF473E',
                strokeLinecap: 'butt',
                textColor: '#313131',
                textSize: '26px',
                trailColor: '#9A9A9A',
              })}
            />
          </div>
        </div>
        <div className="flex w-1/2 pl-2 flex-col">
          <div className="flex flex-row pb-4">
            <span className="text-sm font-medium">Performance</span>
            <img
              className="pl-2"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <div style={{ height: '100%', width: '100%' }}>
            <CircularProgressbar
              value={percenPerformance}
              text={`${percenPerformance}%`}
              styles={buildStyles({
                pathColor: '#FF473E',
                strokeLinecap: 'butt',
                textColor: '#313131',
                textSize: '26px',
                trailColor: '#9A9A9A',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeInfoHome;
