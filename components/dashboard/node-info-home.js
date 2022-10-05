import 'react-circular-progressbar/dist/styles.css';
import { generateTextForEras, numberWithCommas } from '../../shared/core/utils';
import useMetrics from '../hooks/useMetrics';
import { ProgressBar, Tooltips } from '../partials';

const NodeInfoHome = () => {
  const { metrics, metricConfig } = useMetrics(true);
  return (
    <div className="flex flex-col pt-5 lg:pb-3">
      <span className="text-lg font-medium">Node Info</span>
      <div className="flex flex-col py-2">
        <div>
          <span className="text-lg">
            {metrics?.addresses && metrics?.addresses.length > 0
              ? 'Top Registered Node Rankings'
              : 'Registered Node Rankings'}
          </span>
          <Tooltips
            placement="top"
            title="Ranks all nodes in the platform - based on uptime, fee, responsiveness, delegator count, and stake amount, all sharing equally weighted importance."
            arrow
          >
            <img
              width="10px"
              height="10px"
              src="/images/ic_feather_info.svg"
              alt="Info"
              style={{ marginLeft: '5px', display: 'inline-block' }}
            />
          </Tooltips>
        </div>
        <span className="text-base text-black1 font-thin">
          {metrics?.rank
            ? `${metrics?.rank} out of ${metrics?.totalCount}`
            : ''}
        </span>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Total Stake</span>
          <img
            className="pl-3"
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </div>
        <span className="text-base text-black1 font-thin">
          {numberWithCommas(metrics?.stake_amount)}
        </span>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Self Stake</span>
          <img
            className="pl-3"
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </div>
        <span className="text-base text-black1 font-thin">
          {numberWithCommas(metrics?.self_stake_amount)}
        </span>
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Delegators</span>
          <img
            className="pl-3"
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </div>
        <span className="text-base text-black1 font-thin">
          {metrics?.delegators}
        </span>
      </div>
      <div className="flex flex-col pt-2">
        <div className="flex flex-row">
          <span className="text-lg">Uptime</span>
          <Tooltips
            placement="top"
            title="Uptime is calculated from the percentage of ERAs you have joined multiplied by the rewards offered per area minus any ERAs you missed while your bid was high enough to be in the validation pool."
            arrow
          >
            <img
              width="10px"
              height="10px"
              src="/images/ic_feather_info.svg"
              alt="Info"
              style={{ marginLeft: '5px', display: 'inline-block' }}
            />
          </Tooltips>
        </div>
        <p className="text-sm text-gray mb-2">{`Average: ${metrics?.average_uptime}%`}</p>
        <ProgressBar
          value={metrics?.uptime}
          total={metricConfig?.max?.uptime}
          mask="x%"
        />
      </div>
      <div className="flex flex-col pb-2">
        <p className="text-xs text-gray mb-1">ERAs Active: X</p>
        <p className="text-xs text-gray mb-1">ERAs since Redmark: X</p>
        <p className="text-xs text-gray mb-1">Total Redmarks: X</p>
        {/*
        <div className="flex flex-row">
          <span className="text-lg">Block Height</span>
          <img
            className="pl-3"
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </div>
        <p className="text-sm text-gray mb-2">
          Current: {metrics?.blocks_behind} blocks behind
        </p>
        <ProgressBar
          value={metrics?.block_height_average}
          total={metricConfig?.max?.block_height_average}
          mask="x/y"
        />
        */}
      </div>
      <div className="flex flex-col py-2">
        <div className="flex flex-row">
          <span className="text-lg">Update Responsiveness</span>
          <img
            className="pl-3"
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </div>
        <p className="text-sm text-gray mb-2">
          Average: {generateTextForEras(metrics?.average_responsiveness)}
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
        </div>
        <p className="text-sm text-gray mb-2">
          Average: {metrics?.average_peers}
        </p>
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
