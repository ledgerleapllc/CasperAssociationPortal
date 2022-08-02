import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Slider from 'react-slick';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import InfoIcon from '@material-ui/icons/Info';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import useMetrics from '../../../components/hooks/useMetrics';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, ProgressBar, Tooltips } from '../../../components/partials';
import { formatDate } from '../../../shared/core/utils';
import ArrowIcon from '../../../public/images/ic_arrow.svg';

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const WarningCards = ({ warnings, isLoading }) => {
  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Card
      className={classNames(
        'w-full flex bg-primary items-center justify-between py-5 items-center',
        warnings?.length > 1 ? 'px-1' : 'px-8'
      )}
    >
      {isLoading ? (
        <div className="w-full">
          <ReactLoading
            className="mx-auto"
            type="spinningBubbles"
            color="white"
            width={25}
            height={25}
          />
        </div>
      ) : (
        <>
          <button
            type="button"
            className="text-3xl text-white focus:outline-none disabled:opacity-40"
            onClick={prev}
            hidden={warnings?.length === 1}
          >
            <ArrowIcon />
          </button>
          <div className="h-full" style={{ width: 'calc(100% - 3.75rem)' }}>
            <div
              className="overflow-hidden px-2 text-white h-full block min-w-full"
              style={{ width: 0 }}
            >
              <Slider ref={sliderRef} {...settings}>
                {warnings.map((warnMetric, index) => (
                  <div key={`warning_${index}`}>
                    <div className="flex flex-col bg-primary">
                      <span className="text-lg font-medium text-white">
                        {warnMetric?.label} Warning!
                      </span>
                      <span className="pt-1.25 text-xs text-white">
                        Your {warnMetric?.label} has fallen outside the minimum
                        acceptable range on
                        {`${formatDate(
                          warnMetric?.time_start,
                          'dd/MM/yyyy HH:mm aa'
                        )} EST`}
                        and you have been placed on probation. Don’t panic,
                        there is still time to correct this.
                      </span>
                      <span className="pt-1.25 text-xs text-white">
                        You have {warnMetric?.given_to_correct_value}{' '}
                        {warnMetric?.given_to_correct_unit} to correct this
                        problem before your membership status is revoked. Bring
                        your {warnMetric?.label} {warnMetric?.probation_start}%{' '}
                        to correct this issue.
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <button
            type="button"
            className="text-3xl text-white focus:outline-none transform rotate-180 disabled:opacity-40"
            onClick={next}
            hidden={warnings?.length === 1}
          >
            <ArrowIcon />
          </button>
        </>
      )}
    </Card>
  );
};

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
  const { metrics, refreshMetrics, metricConfig } = useMetrics();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [kycStatus, setKYCStatus] = useState(null);
  const [nodeStatus, setNodeStatus] = useState(null);
  const [warningMetrics, setWarningMetrics] = useState([]);

  useEffect(() => {
    refreshMetrics();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setKYCStatus(
        userInfo?.profile && userInfo?.profile?.status === 'approved' ? 1 : 0
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (metrics && Object.keys(metrics).length > 0) {
      setNodeStatus(metrics?.node_status);
      const warnings = [];
      aspects.forEach(x => {
        if (
          metrics[x.aspect] <
            metrics?.monitoring_criteria[x.aspect].warning_level ||
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
        label: 'Not Verified',
        desc: (
          <>
            Some parts of the portal are not yet open to you!{' '}
            <Link to="/dashboard/verification/">
              <span className="underline text-primary pr-1">Get verified</span>
            </Link>
            for full access!
          </>
        ),
      },
    };
    return data[kycStatus];
  };

  const getNodeData = () => {
    if (nodeStatus === 'Online') {
      return {
        label: 'Online',
        desc: <>Nice work!</>,
      };
    }
    if (nodeStatus === 'Offline') {
      return {
        label: 'Offline',
        desc: '',
      };
    }
    return {
      label: '',
      desc: '',
    };
  };

  const formatValue = () => {
    let value = '';
    if (metricConfig?.max?.update_responsiveness) {
      value =
        (100 * metrics.update_responsiveness || 0) /
        metricConfig?.max?.update_responsiveness;
      value = value.toFixed(2);
    }
    return parseFloat(value);
  };

  return (
    <>
      <Head>
        <title>Membership - Casper Association Portal</title>
      </Head>
      <LayoutDashboard bg="bg-gradient-to-tl from-gray2 to-white1">
        <div id="landing-page__membership" className="membership gap-5">
          {warningMetrics?.length > 0 && (
            <WarningCards warnings={warningMetrics} />
          )}
          <Card className="flex flex-col px-9 py-5">
            <span className="text-lg font-medium">Membership</span>
            <div className="mt-2.5 mb-8 border border-primary border-b" />
            <p className="pb-5">
              {`All members of the Casper portal need to maintain minimum node
              metrics to have access to all parts of the portal including Node
              Uptime, Block Height, and Update Responsiveness. If your node falls
              short of the minimum criteria, you will be notified through email
              and given a grace period to fix your statistics. If you do not fix
              it in time, some areas of your portal access will be blocked until
              your average is restored.`}
            </p>
          </Card>
          <div id="landing-page__membership_Widgets">
            <div id="landing-page__membership_WidgetsLeft" className="gap-5">
              <Card className="custom-membership-widget flex px-9 py-6 gap-6">
                <div className="w-60">
                  <span className="text-lg font-medium">Node Status:</span>
                </div>
                <div className="flex flex-1 flex-col gap-1.25">
                  <p className="text-lg font-medium text-primary">
                    {getNodeData()?.label}
                  </p>
                  <span className="text-sm text-gray">
                    {getNodeData()?.desc}
                  </span>
                </div>
              </Card>
              <Card className="custom-membership-widget flex px-9 py-6 gap-6">
                <div className="w-60">
                  <span className="text-lg font-medium">
                    Identity Verification Status:
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.25">
                  <p className="text-lg font-medium text-primary">
                    {getKYCVerifiedData()?.label}
                  </p>
                  <span className="text-sm text-gray">
                    {getKYCVerifiedData()?.desc}
                  </span>
                </div>
              </Card>
            </div>
            <div id="landing-page__membership_WidgetsRight">
              <div className="flex h-full gap-5">
                <Card
                  className={`flex flex-col px-6 pt-6 h-full metrics-card ${
                    (!metrics.uptime ||
                      metrics.uptime <
                        metrics?.monitoring_criteria?.uptime?.warning_level) &&
                    'metrics-card-warning'
                  }`}
                >
                  <Tooltips
                    disableTheme
                    placement="top"
                    title="Uptime measures the amount of rewards a given node collects out of the total possible rewards a node could collect over a period of 30 days"
                    arrow
                  >
                    <div
                      className="flex pb-1"
                      style={{ alignItems: 'center', cursor: 'pointer' }}
                    >
                      <p className="text-sm font-medium pr-1">Uptime</p>
                      <InfoIcon style={{ fontSize: '20px' }} />
                    </div>
                  </Tooltips>
                  <p className="text-xs desc">
                    Average: {metrics.average_uptime}%
                  </p>
                  <div className="flex-1 min-h-0 mt-4">
                    <ProgressBar
                      shape="circle"
                      value={
                        metrics.uptime
                          ? parseFloat(metrics.uptime.toFixed(2))
                          : 0
                      }
                      mask="x%"
                    />
                  </div>
                </Card>
                <Card
                  className={`flex flex-col px-6 pt-6 h-full metrics-card ${
                    (!metrics.block_height_average ||
                      metrics.block_height_average <
                        metrics?.monitoring_criteria?.block_height_average
                          ?.warning_level) &&
                    'metrics-card-warning'
                  }`}
                >
                  <Tooltips
                    disableTheme
                    placement="top"
                    title="Blockheight measures what block you are on from the last 10 blocks"
                    arrow
                  >
                    <div
                      className="flex pb-1"
                      style={{ alignItems: 'center', cursor: 'pointer' }}
                    >
                      <p className="text-sm font-medium pr-1">Block Height</p>
                      <InfoIcon style={{ fontSize: '20px' }} />
                    </div>
                  </Tooltips>
                  <p className="text-xs desc">
                    {metrics?.blocks_behind} blocks behind
                  </p>
                  <div className="flex-1 min-h-0 mt-4">
                    <ProgressBar
                      shape="circle"
                      value={metrics.block_height_average}
                      total={metricConfig?.max?.block_height_average}
                      mask="x/y"
                    />
                  </div>
                </Card>
                <Card
                  className={`flex flex-col px-6 pt-6 h-full metrics-card ${
                    (!metrics.update_responsiveness ||
                      metrics.update_responsiveness <
                        metrics?.monitoring_criteria?.update_responsiveness
                          ?.warning_level) &&
                    'metrics-card-warning'
                  }`}
                >
                  <p className="text-sm font-medium pb-1">Updates</p>
                  <p className="text-xs desc">On Time</p>
                  <div className="flex-1 min-h-0 mt-4">
                    <ProgressBar
                      shape="circle"
                      value={formatValue()}
                      mask="x%"
                    />
                  </div>
                </Card>
                <Card className="flex flex-col px-6 pt-6 h-full metrics-card">
                  <p className="text-sm font-medium pb-1">Peers</p>
                  <p className="text-xs desc">
                    Average: {metrics?.average_peers}
                  </p>
                  <div className="flex-1 min-h-0 mt-4">
                    <ProgressBar
                      shape="circle"
                      value={metrics?.peers}
                      total={metricConfig?.max?.peers}
                      mask="x/y"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(DashboardMembership, 'final-all');
