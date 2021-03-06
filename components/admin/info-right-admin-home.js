import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import useMetrics from '../hooks/useMetrics';
import { ProgressBar, Tooltips } from '../partials';
import { numberWithCommas } from '../../shared/core/utils';

const InfoRightAdminHome = ({ stats }) => {
  const { metrics, metricConfig } = useMetrics();
  const authUser = useSelector(state => state.authReducer.userInfo);

  const renderMaxPeers = () => {
    const maxPeers = metricConfig?.max?.peers;
    const peers =
      authUser?.role === 'admin' ? metrics?.peers_setting : metrics?.peers;
    if (maxPeers && peers) {
      if (maxPeers > peers) return maxPeers;
      return peers;
    }
    if (maxPeers) return maxPeers;
    return peers;
  };

  return (
    <div className="flex flex-col mx-9 my-3 bg-white">
      <div className="flex flex-col pt-5 lg:pb-3">
        <span className="text-lg font-medium pb-5">Metrics</span>
        <div className="flex flex-col py-3 xl:py-1 2xl:py-3">
          <div className="flex gap-2 flex-row">
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
            {stats?.totalUser}
          </span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex gap-2 flex-row">
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
            {numberWithCommas(stats?.totalStake)}
          </span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex gap-2 flex-row">
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
            {stats?.totalDelegators}
          </span>
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div className="flex gap-2 flex-row">
            <span className="text-lg" style={{ lineHeight: 1.4 }}>
              Average Uptime
            </span>
            <Tooltips
              placement="top"
              title="Average Uptime across all nodes"
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
          <ProgressBar value={(+stats?.avgUptime).toFixed(2)} mask="x%" />
        </div>
        <div className="flex flex-col py-2 2xl:py-3">
          <div
            className="flex gap-2 flex-row"
            style={{ alignItems: 'flex-end' }}
          >
            <span className="text-lg" style={{ lineHeight: 1.4 }}>
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
          <div
            className="flex gap-2 flex-row"
            style={{ alignItems: 'flex-end' }}
          >
            <span className="text-lg" style={{ lineHeight: 1.4 }}>
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
        <div className="flex flex-col py-2 2xl:py-3">
          <div
            className="flex gap-2 flex-row"
            style={{ alignItems: 'flex-end' }}
          >
            <span className="text-lg" style={{ lineHeight: 1.4 }}>
              Peers
            </span>
          </div>
          <ProgressBar
            value={
              authUser?.role === 'admin'
                ? metrics?.peers_setting
                : metrics?.peers
            }
            total={renderMaxPeers()}
            mask="x/y"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoRightAdminHome;
