import 'react-circular-progressbar/dist/styles.css';
import useMetrics from '../hooks/useMetrics';
import { ProgressBar } from '../partials';

const NodeInfoHome = () => {
  const { metrics, metricConfig } = useMetrics();

  return (
    <div className="flex flex-col pt-5 lg:pb-3">
      <span className="text-lg font-medium">Node Info</span>
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
        <ProgressBar
          value={metrics?.uptime}
          total={metricConfig?.max?.uptime}
          mask="x%"
        />
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
          value={metrics?.block_height_average}
          total={metricConfig?.max?.block_height_average}
          mask="x/y"
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
          value={metrics?.update_responsiveness}
          total={metricConfig?.max?.update_responsiveness}
          mask=""
          options={{
            startText: 'Needs Improvement',
            endText: 'Great',
          }}
        />
      </div>
      <div className="flex flex-col pt-2 pb-9">
        <div className="flex flex-row">
          <span className="text-lg">Peers</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <p className="text-sm text-gray mb-2">Average: {metrics?.peers}</p>
        <ProgressBar
          value={metrics?.peers}
          total={metricConfig?.max?.peers}
          mask="x/y"
        />
      </div>
    </div>
  );
};

export default NodeInfoHome;
