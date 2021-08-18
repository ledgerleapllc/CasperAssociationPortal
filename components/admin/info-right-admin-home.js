import 'react-circular-progressbar/dist/styles.css';
import useMetrics from '../hooks/useMetrics';
import { ProgressBar } from '../partials';
import { numberWithCommas } from '../../shared/core/utils';

const InfoRightAdminHome = ({ stats }) => {
  const { metricConfig } = useMetrics();

  return (
    <div className="flex flex-col mx-9 my-3 bg-white">
      <div
        className="
          flex flex-col 
          pt-3 lg:pb-3
          2xl:pt-5
        "
      >
        <span className="text-lg font-medium pb-5">Metrics</span>
        <div className="flex flex-col py-3 xl:py-1 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Total Users</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <span className="text-base text-black1 font-thin">
            {stats?.totalUser}
          </span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Member’s Stake</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <span className="text-base text-black1 font-thin">
            {numberWithCommas(stats?.totalStake)}
          </span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Total Delegators</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <span className="text-base text-black1 font-thin">
            {stats?.totalDelegators}
          </span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex flex-row">
            <span className="text-lg">Average Uptime</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <ProgressBar value={(+stats?.avgUptime).toFixed(2)} mask="x%" />
        </div>
        <div className="flex flex-col pt-2 pb-9 xl:pb-6 2xl:pb-9">
          <div className="flex flex-row">
            <span className="text-lg">Average Block Height</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <ProgressBar
            value={(+stats?.avgBlockHeightAverage).toFixed(2)}
            mask="x%"
          />
        </div>
        <div className="flex flex-col pt-2 pb-9 xl:pb-6 2xl:pb-9">
          <div className="flex flex-row">
            <span className="text-lg">Average Responsiveness</span>
            <img
              className="pl-3"
              src="/images/ic_feather_info.svg"
              alt="Info"
            />
          </div>
          <ProgressBar
            value={(+stats?.avgUpdateResponsiveness).toFixed(2)}
            mask="x%"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoRightAdminHome;
