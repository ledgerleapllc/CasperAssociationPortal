import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import useMetrics from '../../../components/hooks/useMetrics';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, ClockBar, ProgressBar } from '../../../components/partials';
import { formatDate } from '../../../shared/core/utils';

const aspects = [
  {
    aspect: 'uptime',
    label: 'Uptime',
  },
  {
    aspect: 'block_height_average',
    label: 'Block Height Average',
  },
  {
    aspect: 'update_responsiveness',
    label: 'Update Responsiveness',
  },
];

const DashboardMembership = () => {
  const { metrics, refreshMetrics } = useMetrics();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [kycStatus, setKYCStatus] = useState();
  const [nodeStatus, setNodeStatus] = useState();
  const [warningMetrics, setWarningMetrics] = useState([]);

  useEffect(() => {
    refreshMetrics();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setKYCStatus(userInfo?.kyc_verified_at ? 1 : 0);
    }
  }, [userInfo]);

  useEffect(() => {
    if (metrics && Object.keys(metrics).length > 0) {
      setNodeStatus(metrics?.node_status);
      const warnings = [];
      aspects.forEach(x => {
        if (
          metrics[x.aspect] <
          metrics?.monitoring_criteria[x.aspect].probation_start
        ) {
          warnings.push({
            ...x,
            ...metrics?.monitoring_criteria[x.aspect],
            time_start: metrics[`${x.aspect}_time_start`],
          });
        }
      });
      console.log(warnings);
      setWarningMetrics(warnings);
    }
  }, [metrics]);

  const getKYCVerifiedData = () => {
    const data = {
      1: {
        label: 'Verified',
        desc: (
          <>
            Great work being verified. Now just keep that node running strong to
            maintain access
          </>
        ),
      },
      0: {
        label: 'Not verified',
        desc: (
          <>
            Some parts of the portal are not yet open to you!{' '}
            <Link href="/dashboard/verification/">
              <a className="underline text-primary pr-1">Get verified</a>
            </Link>
            for full access!
          </>
        ),
      },
    };
    return data[kycStatus];
  };

  const getNodeData = () => {
    if (nodeStatus === 'Probation') {
      let nearestAspect = [];
      nearestAspect = aspects
        .map(x => ({
          ...x,
          time_end: metrics[`${x.aspect}_time_end`],
        }))
        .sort((a, b) =>
          compareDesc(new Date(a.time_end), new Date(b.time_end))
        );
      return {
        label: 'Probation',
        desc: (
          <div className="flex">
            Probation! You must increase your
            <span className="px-1">{nearestAspect[0]?.label} within</span>
            <ClockBar
              endTime={new Date(nearestAspect[0]?.time_end)}
              hideProgressBar
            />
          </div>
        ),
      };
    }

    if (nodeStatus === 'Pulled') {
      const failMetrics = [];
      aspects.forEach(x => {
        if (
          metrics[x.aspect] <
          metrics.monitoring_criteria[x.aspect].probation_start
        ) {
          failMetrics.push(x.label);
        }
      });
      return {
        label: 'Pulled!',
        desc: (
          <>
            You must increase your {failMetrics.join(', ')} to restore full
            portal access!
          </>
        ),
      };
    }

    return {
      label: 'Online',
      desc: <>Nice work!</>,
    };
  };

  return (
    <LayoutDashboard bg="bg-gradient-to-tl from-gray2 to-white1">
      <div className="membership h-full flex flex-col gap-5 w-328">
        {warningMetrics.map(warnMetric => (
          <Card className="flex flex-col px-9 py-5 bg-primary">
            <span className="text-base font-medium text-white">
              {warnMetric.label} Warning!
            </span>
            <span className="pt-1.25 text-xs text-white">
              Your {warnMetric.label} has fallen outside the minimum acceptable
              range on{' '}
              {formatDate(warnMetric.time_start, 'MM/dd/yyyy HH:mm aa')} and you
              have been placed on probation. Don’t panic, there is still time to
              correct this.
            </span>
            <span className="pt-1.25 text-xs text-white">
              You have {warnMetric.given_to_correct_value}{' '}
              {warnMetric.given_to_correct_unit} to correct this problem before
              your membership status is revoked. Bring your {warnMetric.label}{' '}
              {warnMetric.probation_start} to correct this issue.
            </span>
          </Card>
        ))}
        <Card className="flex flex-col px-9 py-5">
          <span className="text-base font-medium">Membership</span>
          <div className="mt-2.5 mb-8 border border-primary border-b" />
          <span className="text-xs pb-5">
            {`All members of the Casper portal need to maintain minimum node
            metrics to have access to all parts of the portal including Node
            Uptime, Block Height, and Update Responsiveness. If your node falls
            short of the minimum criteria, you will be notified through email
            and given a grace period to fix your statistics. If you do not fix
            it in time, some areas of your portal access will be blocked until
            your average is restored.`}
          </span>
        </Card>
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 flex-grow">
            <Card className="flex px-9 py-6 gap-6">
              <div className="w-32">
                <span className="text-base font-medium">Node Status:</span>
              </div>
              <div className="flex flex-1 flex-col gap-1.25">
                <p className="text-base font-medium text-primary">
                  {getNodeData()?.label}
                </p>
                <span className="text-sm text-gray">{getNodeData()?.desc}</span>
              </div>
            </Card>
            <Card className="flex px-9 py-6 gap-6">
              <div className="w-32">
                <span className="text-base font-medium">KYC Status:</span>
              </div>
              <div className="flex flex-1 flex-col gap-1.25">
                <p className="text-base font-medium text-primary">
                  {getKYCVerifiedData()?.label}
                </p>
                <span className="text-sm text-gray">
                  {getKYCVerifiedData()?.desc}
                </span>
              </div>
            </Card>
          </div>
          <div className="flex-1 min-h-0">
            <div className="flex h-full gap-5">
              <Card
                className={`flex flex-col px-6 pt-6 h-full w-40 metrics-card ${
                  metrics.uptime <
                    metrics?.monitoring_criteria?.uptime?.warning_level &&
                  'metrics-card-warning'
                }`}
              >
                <p className="text-sm title font-medium pb-1">Uptime</p>
                <p className="text-xs desc">Average: {metrics.uptime}%</p>
                <div className="flex-1 min-h-0 mt-4">
                  <ProgressBar
                    shape="circle"
                    value={metrics.uptime}
                    mask="x%"
                  />
                </div>
              </Card>
              <Card
                className={`flex flex-col px-6 pt-6 h-full w-40 metrics-card ${
                  metrics.block_height_average <
                    metrics?.monitoring_criteria?.block_height_average
                      ?.warning_level && 'metrics-card-warning'
                }`}
              >
                <p className="text-sm font-medium pb-1">Block Height</p>
                <p className="text-xs desc">
                  Current: {metrics.block_height_average}/
                  {metrics.block_height_average}
                </p>
                <div className="flex-1 min-h-0 mt-4">
                  <ProgressBar
                    shape="circle"
                    value={metrics.block_height_average}
                    mask="x"
                  />
                </div>
              </Card>
              <Card
                className={`flex flex-col px-6 pt-6 h-full w-40 metrics-card ${
                  metrics.update_responsiveness <
                    metrics?.monitoring_criteria?.update_responsiveness
                      ?.warning_level && 'metrics-card-warning'
                }`}
              >
                <p className="text-sm font-medium pb-1">Updates</p>
                <p className="text-xs desc">On Time</p>
                <div className="flex-1 min-h-0 mt-4">
                  <ProgressBar
                    shape="circle"
                    value={metrics.update_responsiveness}
                    mask="x%"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardMembership, 'final-all');
