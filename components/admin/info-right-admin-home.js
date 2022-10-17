import 'react-circular-progressbar/dist/styles.css';
import { ProgressBar, Tooltips } from '../partials';
import { numberWithCommas } from '../../shared/core/utils';

const InfoRightAdminHome = ({ stats }) => (
  <div className="flex flex-col px-8 py-7">
    <span className="text-lg font-medium pb-5">Metrics</span>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex flex-row gap-2">
        <span className="text-lg">Total Users</span>
        <Tooltips
          placement="top"
          title="Total number of users on the platform"
          arrow
        >
          <img
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </Tooltips>
      </div>
      <span className="text-base text-black1 font-thin">
        {stats?.total_users}
      </span>
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex flex-row gap-2">
        <span className="text-lg">Members' Stake</span>
        <Tooltips
          placement="top"
          title="Total amount staked by all members"
          arrow
        >
          <img
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </Tooltips>
      </div>
      <span className="text-base text-black1 font-thin">
        {numberWithCommas(stats?.total_stake)}
      </span>
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex flex-row gap-2">
        <span className="text-lg">Total Delegators</span>
        <Tooltips placement="top" title="Total number of delegators" arrow>
          <img
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </Tooltips>
      </div>
      <span className="text-base text-black1 font-thin">
        {stats?.total_delegators}
      </span>
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex gap-2 mb-2">
        <span className="text-lg" style={{ lineHeight: 1.3 }}>
          Average Uptime
        </span>
        <Tooltips placement="top" title="Average Uptime across all nodes" arrow>
          <img
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </Tooltips>
      </div>
      <ProgressBar value={(+stats?.avgUptime).toFixed(2)} mask="x%" />
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex gap-2 mb-2 items-end">
        <span className="text-lg" style={{ lineHeight: 1.3 }}>
          Average
          <br />
          Block Height
        </span>
        <Tooltips
          placement="top"
          title="Average block height across all nodes"
          arrow
          style={{ marginBottom: '8px' }}
        >
          <img
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </Tooltips>
      </div>
      <ProgressBar
        value={(+stats?.avgBlockHeightAverage).toFixed(2)}
        mask="x%"
      />
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex gap-2 mb-2 items-end">
        <span className="text-lg" style={{ lineHeight: 1.3 }}>
          Average
          <br />
          Responsiveness
        </span>
        <Tooltips
          placement="top"
          title="Average responsiveness across all nodes"
          arrow
          style={{ marginBottom: '8px' }}
        >
          <img
            width="10px"
            height="10px"
            src="/images/ic_feather_info.svg"
            alt="Info"
          />
        </Tooltips>
      </div>
      <ProgressBar
        value={
          +stats?.avgUpdateResponsiveness
            ? (+stats?.avgUpdateResponsiveness).toFixed(2)
            : 100
        }
        mask="x%"
      />
    </div>
  </div>
);

export default InfoRightAdminHome;
