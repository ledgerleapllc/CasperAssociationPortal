import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import { ProgressBar } from '../partials';

const NodeInfoHome = () => {
  const metrics = useSelector(state => state.authReducer.metrics);

  const percenCPU = 61;
  const percenPerformance = 83;
  return (
    <div className="flex flex-col pt-5 lg:pb-3">
      <span className="text-2xl">Node Info</span>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Node Rank</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-black1 font-thin">8</span>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Stake Amount</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-black1 font-thin">2,502,815</span>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Delegators</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-black1 font-thin">8</span>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Uptime</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">{`Average: ${metrics?.uptime}%`}</p>
        <ProgressBar percent={metrics?.uptime} />
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Block Height</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">
          Current: {metrics?.block_height_average} block behind
        </p>
        <ProgressBar
          counts={metrics?.block_height_average}
          totalCounts={
            metrics?.monitoring_criteria?.['block-height']?.warning_level || 0
          }
          type="split"
        />
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Update Responsiveness</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">
          Average: {metrics?.update_responsiveness}+ days early
        </p>
        <ProgressBar
          counts={metrics?.update_responsiveness}
          totalCounts={5}
          type="text"
          startText="Needs Improvement"
          endText="Great"
        />
      </div>
      <div className="flex flex-col pt-2 pb-9 border-b-2 border-gray">
        <div className="flex flex-row">
          <span className="text-lg">Peers</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">Average: {metrics?.peers}</p>
        <ProgressBar counts={metrics?.peers} totalCounts={88} type="count" />
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
