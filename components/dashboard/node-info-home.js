import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ProgressBar } from '../partials';

const NodeInfoHome = () => {
  const percenCPU = 61;
  const percenPerformance = 83;
  return (
    <div className="flex flex-col pt-5 lg:pb-3">
      <span className="text-3xl">Node Info</span>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-xxl">Node Rank</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-xl text-black1 font-thin">8</span>
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-xxl">Stake Amount</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-xl text-black1 font-thin">2,502,815</span>
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-xxl">Delegators</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-xl text-black1 font-thin">8</span>
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-xxl">Uptime</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">{`Average: {X}%`}</p>
        <ProgressBar percent={75} />
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-xxl">Block Height</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">Current: 1 block behind</p>
        <ProgressBar counts={504} totalCounts={505} type="count" />
      </div>
      <div className="flex flex-col py-2 2xl:py-3">
        <div className="flex flex-row">
          <span className="text-xxl">Update Responsiveness</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">Average: 2+ days early</p>
        <ProgressBar
          percent={100}
          type="text"
          startText="Needs Improvement"
          endText="Great"
        />
      </div>
      <div className="flex flex-col pt-2 pb-9 border-b-2 border-gray">
        <div className="flex flex-row">
          <span className="text-xxl">Peers</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">Average: 63</p>
        <ProgressBar counts={62} totalCounts={88} type="count" />
      </div>
      <div className="flex justify-between py-9">
        <div className="flex w-1/2 pr-2 flex-col">
          <div className="flex flex-row pb-4">
            <span className="text-md font-medium">CPU Load</span>
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
            <span className="text-md font-medium">Performance</span>
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
