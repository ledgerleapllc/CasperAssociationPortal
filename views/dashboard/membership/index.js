import { Link } from 'react-router-dom';
import { useContext, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Slider from 'react-slick';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import InfoIcon from '@material-ui/icons/Info';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, ProgressBar, Tooltips } from '../../../components/partials';
import ArrowIcon from '../../../public/images/ic_arrow.svg';
import { getUserMembershipInfo } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../../pages/_app';

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
                        {warnMetric?.isWarning
                          ? `Your ${warnMetric?.label} has fallen outside the minimum
                        acceptable range. Don’t panic, there is still time to correct
                        this.`
                          : `Your ${warnMetric?.label} has fallen outside the minimum
                        acceptable range on and you have been placed on
                        probation. Don’t panic, there is still time to correct
                        this.`}
                      </span>
                      {warnMetric?.correction_value &&
                      warnMetric?.correction_unit ? (
                        <span className="pt-1.25 text-xs text-white">
                          You have {warnMetric?.correction_value}{' '}
                          {warnMetric?.correction_unit} to correct this problem
                          before your membership status is revoked. Bring your{' '}
                          {warnMetric?.label}{' '}
                          {warnMetric?.isWarning
                            ? warnMetric?.warning
                            : warnMetric?.probation}
                          % to correct this issue.
                        </span>
                      ) : null}
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

const DashboardMembership = () => {
  const [kycStatus, setKYCStatus] = useState(null);
  const [nodeStatus, setNodeStatus] = useState(null);
  const [warningMetrics, setWarningMetrics] = useState([]);
  const [membershipData, setMembershipData] = useState({});
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getUserMembershipInfo(
        res => {
          setLoading(false);
          setMembershipData(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, []);

  useEffect(() => {
    if (membershipData && Object.keys(membershipData).length > 0) {
      setNodeStatus(membershipData?.node_status);
      setKYCStatus(membershipData.kyc_status === 'Not Verified' ? 0 : 1);
    }
  }, [membershipData]);

  useEffect(() => {
    if (
      membershipData &&
      Object.keys(membershipData).length > 0 &&
      userInfo &&
      userInfo.globalSettings
    ) {
      const warnings = [];
      if (membershipData.avg_uptime) {
        if (
          userInfo?.profile?.extra_status === 'On Probation' &&
          membershipData.avg_uptime < userInfo.globalSettings?.uptime_probation
        ) {
          warnings.push({
            aspect: 'uptime',
            label: 'Uptime',
            probation: userInfo.globalSettings?.uptime_probation,
            warning: userInfo.globalSettings?.uptime_warning,
            correction_unit: userInfo.globalSettings?.uptime_correction_unit,
            correction_value: userInfo.globalSettings?.uptime_correction_value,
            isWarning: false,
          });
        } else if (
          membershipData.avg_uptime < userInfo.globalSettings?.uptime_warning
        ) {
          warnings.push({
            aspect: 'uptime',
            label: 'Uptime',
            probation: userInfo.globalSettings?.uptime_probation,
            warning: userInfo.globalSettings?.uptime_warning,
            correction_unit: userInfo.globalSettings?.uptime_correction_unit,
            correction_value: userInfo.globalSettings?.uptime_correction_value,
            isWarning: true,
          });
        }
      }
      setWarningMetrics(warnings);
    }
  }, [membershipData, userInfo]);

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

  const getExtraUptimeCardClass = () => {
    if (
      membershipData &&
      Object.keys(membershipData).length > 0 &&
      membershipData.avg_uptime &&
      userInfo &&
      userInfo.globalSettings
    ) {
      if (
        userInfo?.profile?.extra_status === 'On Probation' &&
        membershipData.avg_uptime < userInfo.globalSettings?.uptime_probation
      ) {
        return 'metrics-card-warning';
      }
      if (
        membershipData.avg_uptime < userInfo?.globalSettings?.uptime_warning
      ) {
        return 'metrics-card-warning';
      }
    }
    return '';
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
  return (
    <>
      <Head>
        <title>Membership - Casper Association Portal</title>
      </Head>
      <LayoutDashboard bg="bg-gradient-to-tl from-gray2 to-white1">
        <div className="w-full 2xl:w-4/5 h-auto 2xl:h-full flex flex-col membership gap-5">
          {warningMetrics?.length > 0 && (
            <WarningCards warnings={warningMetrics} />
          )}
          <Card className="flex flex-col px-9 py-5">
            <span className="text-lg font-medium">Membership</span>
            <div className="mt-2.5 mb-8 border border-primary border-b" />
            <p className="pb-5">
              {`All members of the Casper portal need to maintain minimum node
              metrics to have access to all parts of the portal including Node
              Uptime, and Update Responsiveness. If your node falls
              short of the minimum criteria, you will be notified through email
              and given a grace period to fix your statistics. If you do not fix
              it in time, some areas of your portal access will be blocked until
              your average is restored.`}
            </p>
          </Card>
          <div className="flex flex-col 2xl:flex-row gap-5">
            <div className="w-full 2xl:w-1/2 gap-5 flex flex-col lg:flex-row 2xl:flex-col">
              <Card className="w-full lg:w-1/2 2xl:w-full flex flex-col md:flex-row px-6 py-5 gap-5">
                <div className="w-full md:w-60">
                  <span className="text-lg font-medium">Node Status:</span>
                </div>
                <div className="flex md:flex-1 flex-col gap-1.25">
                  <p className="text-lg font-medium text-primary">
                    {getNodeData()?.label}
                  </p>
                  <span className="text-sm text-gray">
                    {getNodeData()?.desc}
                  </span>
                </div>
              </Card>
              <Card className="w-full lg:w-1/2 2xl:w-full flex flex-col md:flex-row px-6 py-5 gap-5">
                <div className="w-full md:w-60">
                  <span className="text-lg font-medium">
                    Identity Verification Status:
                  </span>
                </div>
                <div className="flex md:flex-1 flex-col gap-1.25">
                  <p className="text-lg font-medium text-primary">
                    {getKYCVerifiedData()?.label}
                  </p>
                  <span className="text-sm text-gray">
                    {getKYCVerifiedData()?.desc}
                  </span>
                </div>
              </Card>
            </div>
            <div className="w-full 2xl:w-1/2">
              <div className="flex flex-col sm:flex-row w-full h-full gap-5">
                <Card
                  className={`w-full sm:w-1/2 lg:w-1/3 2xl:w-2/3 flex px-6 py-6 metrics-card ${getExtraUptimeCardClass()}`}
                >
                  <div className="w-1/2">
                    <Tooltips
                      disableTheme
                      placement="top"
                      title="This is the % of ERAs that you have been in the validation pool while your bid was high enough to be in the pool out of the last [admin setting] ERAs."
                      arrow
                    >
                      <div
                        className="flex pb-1"
                        style={{ alignItems: 'center', cursor: 'pointer' }}
                      >
                        <p className="text-sm font-medium pr-1">Uptime</p>
                        <InfoIcon
                          style={{ color: 'black', fontSize: '16px' }}
                        />
                      </div>
                    </Tooltips>
                    <p className="text-xs desc mb-5">
                      Average: {membershipData?.avg_uptime}%
                    </p>
                    <hr />
                    <p className="text-xs mt-5">
                      <b>Total ERAs:</b> {membershipData?.total_eras}
                    </p>
                    <p className="text-xs mt-2">
                      <b>ERAs since Redmark:</b>{' '}
                      {membershipData?.eras_since_bad_mark}
                    </p>
                    <p className="text-xs mt-2">
                      <b>Total Redmarks:</b> {membershipData?.total_bad_marks}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <ProgressBar
                      shape="circle"
                      value={membershipData?.avg_uptime}
                      mask="x%"
                      size="exlarge"
                    />
                  </div>
                </Card>
                <Card className="w-full sm:w-1/2 lg:w-1/4 2xl:w-1/3 flex flex-col px-6 py-6 metrics-card">
                  <p className="text-sm font-medium pb-1">Updates</p>
                  <p className="text-xs desc">On Time</p>
                  <div className="mt-2">
                    <ProgressBar
                      shape="circle"
                      value={membershipData?.update_responsiveness}
                      mask="x%"
                      size="large"
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
