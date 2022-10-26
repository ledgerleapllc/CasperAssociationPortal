import 'react-circular-progressbar/dist/styles.css';
import InfoIcon from '@material-ui/icons/Info';
import { ProgressBar, Tooltips } from '../partials';
import { numberWithCommas } from '../../shared/core/utils';

const InfoRightAdminHome = ({ stats }) => (
  <div className="flex flex-col px-8 py-7">
    <span className="text-lg font-medium pb-5">Metrics</span>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-lg">Total Users</span>
        <Tooltips
          placement="top"
          title="Total number of users on the platform"
          arrow
        >
          <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
        </Tooltips>
      </div>
      <span className="text-base text-black1 font-thin">
        {stats?.total_users}
      </span>
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-lg">Members' Stake</span>
        <Tooltips
          placement="top"
          title="Total amount staked by all members"
          arrow
        >
          <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
        </Tooltips>
      </div>
      <span className="text-base text-black1 font-thin">
        {numberWithCommas(stats?.total_stake)}
      </span>
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-lg">Total Delegators</span>
        <Tooltips placement="top" title="Total number of delegators" arrow>
          <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
        </Tooltips>
      </div>
      <span className="text-base text-black1 font-thin">
        {stats?.total_delegators}
      </span>
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex gap-2 mb-2 items-center">
        <span className="text-lg" style={{ lineHeight: 1.3 }}>
          Average Uptime
        </span>
        <Tooltips placement="top" title="Average Uptime across all nodes" arrow>
          <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
        </Tooltips>
      </div>
      <ProgressBar value={+stats?.avg_uptime} mask="x%" />
    </div>
    <div className="flex flex-col py-2 2xl:py-3">
      <div className="flex gap-2 mb-2 items-center">
        <span className="text-lg" style={{ lineHeight: 1.3 }}>
          Average
          <br />
          Responsiveness
        </span>
        <Tooltips
          placement="top"
          title="Average responsiveness across all nodes"
          arrow
        >
          <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
        </Tooltips>
      </div>
      <ProgressBar
        value={
          +stats?.avg_responsiveness
            ? (+stats?.avg_responsiveness).toFixed(2)
            : 100
        }
        mask="x%"
      />
    </div>
  </div>
);

export default InfoRightAdminHome;
