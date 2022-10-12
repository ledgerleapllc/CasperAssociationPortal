import 'react-circular-progressbar/dist/styles.css';
import { generateTextForEras, numberWithCommas } from '../../shared/core/utils';
import useMetrics from '../hooks/useMetrics';
import { ProgressBar, Tooltips } from '../partials';

const NodeInfoHome = ({ dashboardData }) => {
  const { metricConfig } = useMetrics(true);
  return (
    <div className="flex flex-col py-3">
      <span className="text-lg font-medium">Node Info</span>
      <div className="flex flex-col py-2">
        <div>
          <span className="text-lg">Registered Node Rankings</span>
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
          {dashboardData?.node_rank
            ? `${dashboardData?.node_rank} out of ${dashboardData?.node_rank_total}`
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
          {numberWithCommas(dashboardData?.total_stake)}
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
          {numberWithCommas(dashboardData?.total_self_stake)}
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
          {dashboardData?.total_delegators}
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
        <p className="text-sm text-gray mb-2">{`Average: ${dashboardData?.uptime}%`}</p>
        <ProgressBar value={dashboardData?.uptime} total={100} mask="x%" />
      </div>
      <div className="flex flex-col pb-2">
        <p className="text-xs text-gray mb-1">
          ERAs Active: {dashboardData?.eras_active}
        </p>
        <p className="text-xs text-gray mb-1">
          ERAs since Redmark: {dashboardData?.eras_sinse_bad_mark}
        </p>
        <p className="text-xs text-gray mb-1">
          Total Redmarks: {dashboardData?.total_bad_marks}
        </p>
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
          Average: {generateTextForEras(dashboardData?.update_responsiveness)}
        </p>
        <ProgressBar
          value={dashboardData?.update_responsiveness}
          total={100}
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
          Average: {dashboardData?.peers}
        </p>
        <ProgressBar
          value={dashboardData?.peers}
          total={metricConfig?.max?.peers}
          mask="x/y"
        />
      </div>
    </div>
  );
};

export default NodeInfoHome;
