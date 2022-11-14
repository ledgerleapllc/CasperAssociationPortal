/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useContext } from 'react';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGuideStep,
  setHideGuide,
  logoutApp,
} from '../../shared/redux-saga/auth/actions';
import Header from '../dashboard/header';
import Sidebar from '../dashboard/sidebar';
import IconX from '../../public/images/ic_x.svg';
import { useDialog } from '../partials/dialog';
import {
  requestReactivation,
  canRequestReactivation,
} from '../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../pages/_app';

const ReactivationModal = ({ userInfo, onClosed }) => {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [canRequestData, setCanRequestData] = useState(null);
  const [reactivationReason, setReactivationReason] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const { setLoading } = useContext(AppContext);

  const globalSettings = userInfo?.globalSettings || {};

  const clickLogout = e => {
    e.preventDefault();
    dispatch(logoutApp());
    onClosed();
  };

  const submitReactivate = () => {
    if (!reactivationReason || !reactivationReason.trim()) {
      return;
    }
    const params = {
      reactivationReason,
    };
    setLoading(true);
    dispatch(
      requestReactivation(
        params,
        () => {
          setLoading(false);
          setShowThanks(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        () => {
          window.location.reload();
        }
      )
    );
  };

  const clickReactivate = () => {
    setProcessing(true);
    dispatch(
      canRequestReactivation(
        res => {
          setProcessing(false);
          if (res) {
            setCanRequestData(res);
          }
        },
        () => {
          setProcessing(false);
        }
      )
    );
  };

  if (processing) {
    return (
      <>
        <p className="text-2xl text-center text-primary mb-10">
          Checking uptime and redmarks...
        </p>
        <ReactLoading
          className="mx-auto"
          type="spinningBubbles"
          color="#FF473E"
          width={100}
          height={100}
        />
      </>
    );
  }

  if (canRequestData) {
    if (canRequestData.canRequest) {
      if (showThanks) {
        return (
          <>
            <p className="text-2xl text-center text-primary mb-10">Thanks!</p>
            <div className="w-full h-full flex flex-col items-center border-gray">
              <p className="text-center">{`
                Please check back in 72 hours to allow the administrators time to review your account.
              `}</p>
            </div>
          </>
        );
      }
      return (
        <>
          <p className="text-2xl text-center text-primary mb-5">
            You can request reactivation.
          </p>
          <div className="w-full h-full flex flex-col items-center border-gray">
            <div className="mb-5">
              <div className="flex flex-col text-center sm:text-left sm:flex-row items-center">
                <label style={{ width: '90px' }}>Uptime:</label>
                <span style={{ width: '80px' }}>
                  {canRequestData.avg_uptime}%
                </span>
                <p>(minimum {globalSettings.uptime_probation || 0}%)</p>
              </div>
              <div className="mt-5 sm:mt-0 flex flex-col text-center sm:text-left sm:flex-row items-center">
                <label style={{ width: '90px' }}>Redmarks:</label>
                <span style={{ width: '80px' }}>
                  {canRequestData.avg_redmarks}
                </span>
                <p>(maximum {globalSettings.redmarks_revoke || 0})</p>
              </div>
            </div>
            <p>{`
              Please share the reason you believe that reactivation should be granted in the box below
            `}</p>
            <textarea
              value={reactivationReason}
              onChange={e => setReactivationReason(e.target.value)}
              rows="4"
              className="mt-2 mb-5 p-4 resize-none w-full border border-gray focus:outline-none"
            />
            <button
              type="button"
              className="px-8 py-3 text-lg text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
              onClick={submitReactivate}
            >
              Request Activation
            </button>
            <a
              onClick={clickLogout}
              className="mt-3 font-bold underline text-primary"
            >
              Log out
            </a>
          </div>
        </>
      );
    }
    return (
      <>
        <p className="text-2xl text-center text-primary mb-5">
          You cannot request reactivation yet.
        </p>
        <div className="w-full h-full text-center flex flex-col items-center border-gray">
          <div className="mb-5">
            <div className="flex flex-col text-center sm:text-left sm:flex-row items-center">
              <label style={{ width: '90px' }}>Uptime:</label>
              <span style={{ width: '80px' }}>
                {canRequestData.avg_uptime}%
              </span>
              <p>(minimum {globalSettings.uptime_probation || 0}%)</p>
            </div>
            <div className="mt-5 sm:mt-0 flex flex-col text-center sm:text-left sm:flex-row items-center">
              <label style={{ width: '90px' }}>Redmarks:</label>
              <span style={{ width: '80px' }}>
                {canRequestData.avg_redmarks}
              </span>
              <p>(maximum {globalSettings.redmarks_revoke || 0})</p>
            </div>
          </div>
          <p className="text-center mb-5">{`
            Please continue to operate your node effectively and check back later. You will be able to request reactivation once the numbers improve.
          `}</p>
          <button
            type="button"
            className="px-8 py-3 text-lg text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
            onClick={clickLogout}
          >
            Log out
          </button>
        </div>
      </>
    );
  }

  if (
    userInfo?.profile?.reactivation_requested &&
    parseInt(userInfo?.profile?.reactivation_requested, 10) === 1
  ) {
    return (
      <>
        <p className="text-2xl text-center text-primary mb-5">
          Reactivation application awaiting admin review
        </p>
        <div className="w-full h-full text-center flex flex-col items-center border-gray">
          <p className="mb-5">{`
            Please check back in 72 hours to allow the administrators time to review your account.
          `}</p>
          <button
            type="button"
            className="px-8 py-3 text-lg text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
            onClick={clickLogout}
          >
            Log out
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="text-2xl text-center text-primary mb-5">Uh oh!</p>
      <div className="w-full h-full text-center flex flex-col items-center border-gray">
        <p className="mb-5">
          {userInfo?.profile?.revoke_reason
            ? `
            Your membership has been revoked for ${userInfo?.profile?.revoke_reason}.
          `
            : `
            Your membership has been revoked.
          `}
        </p>
        <p>{`
          You may be able to reinstate your membership as long as:
        `}</p>
        <p>{`
          1) Uptime remains above ${
            globalSettings.uptime_probation || 0
          }% for the last ${globalSettings.uptime_calc_size || 0} ERAs.
        `}</p>
        <p className="mb-5">{`
          2) You have less than ${
            globalSettings.redmarks_revoke || 0
          } redmarks within the last ${
          globalSettings.redmarks_revoke_calc_size || 0
        } ERAs.
        `}</p>
        <button
          type="button"
          className="px-8 py-3 text-lg text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={clickReactivate}
        >
          Check if I can Reactivate
        </button>
        <a
          onClick={clickLogout}
          className="mt-3 font-bold underline text-primary"
        >
          Log out
        </a>
      </div>
    </>
  );
};

export default function LayoutDashboard({ children, bg }) {
  const isCollapsed = useSelector(
    state => state.authReducer.appInfo.isCollapsed
  );
  const guideStep = useSelector(state => state.authReducer.appInfo.guideStep);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const hideGuide = useSelector(state => state.authReducer.appInfo.hideGuide);

  const dispatch = useDispatch();
  const { setDialog, onClosed } = useDialog();

  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    let guideStepValue = localStorage.getItem('GUIDE_SHOW_STEP');
    if (!guideStepValue) {
      localStorage.setItem('GUIDE_SHOW_STEP', 1);
      guideStepValue = 1;
    } else {
      guideStepValue = parseInt(guideStepValue, 10);
    }
    dispatch(setGuideStep({ guideStep: guideStepValue }));
  }, []);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
      setIsAdmin(isAdminTemp);

      if (!isAdminTemp && userInfo?.profile?.extra_status === 'Suspended') {
        setDialog({
          type: 'DialogCustom',
          data: {
            content: (
              <div className="p-16" style={{ backgroundColor: 'white' }}>
                <ReactivationModal userInfo={userInfo} onClosed={onClosed} />
              </div>
            ),
          },
          settings: {
            noClose: true,
            zIndex: 100,
          },
        });
      }
    }
  }, [userInfo]);

  const clickNext = () => {
    localStorage.setItem('GUIDE_SHOW_STEP', guideStep + 1);
    dispatch(setGuideStep({ guideStep: guideStep + 1 }));
  };

  const closeGuide = () => {
    dispatch(setHideGuide({ hideGuide: true }));
    localStorage.setItem('GUIDE_SHOW_STEP', 9);
    dispatch(setGuideStep({ guideStep: 9 }));
  };

  const renderGuideOut = () => {
    if (
      userInfo?.profile?.status === 'approved' ||
      isAdmin ||
      hideGuide ||
      !guideStep ||
      guideStep > 8 ||
      guideStep === 2
    )
      return null;
    return (
      <div className="dashboard-guide" id={`dashboard-guide-${guideStep}`}>
        <section>
          <div id="dashboard-guide-close" onClick={() => closeGuide()}>
            <IconX className="text-xs" style={{ color: '#CCC' }} />
          </div>
          {[1, 3, 4, 5, 6, 7, 8].includes(guideStep) ? (
            <img
              id="dashboard-guide-left"
              width="20px"
              src="/images/left.png"
              alt=""
            />
          ) : null}
          {guideStep === 1 ? (
            <>
              <h2>Welcome to the Dashboard!</h2>
              <p>
                The dashboard is your hub for tracking node stats as well as
                active discussions and live votes.
              </p>
            </>
          ) : guideStep === 3 ? (
            <>
              <h2>Get Verified</h2>
              <p>
                To participate in votes and other Casper Association related
                activities, users must first verify their identity.
              </p>
            </>
          ) : guideStep === 4 ? (
            <>
              <h2>Nodes</h2>
              <p>
                You can add additional nodes that you control and monitor each
                status independently.
              </p>
            </>
          ) : guideStep === 5 ? (
            <>
              <h2>Discussions</h2>
              <p>
                Here members are able to join in meaningful discussions with
                other Casper Association Members.
              </p>
            </>
          ) : guideStep === 6 ? (
            <>
              <h2>Votes</h2>
              <p>
                Explore ballots created by the Casper team and cast votes which
                helps govern the Casper ecosystem.
              </p>
            </>
          ) : guideStep === 7 ? (
            <>
              <h2>Perks</h2>
              <p>
                All verified members gain access to exclusive perks as long as
                your node remains in good standing with the Association.
              </p>
            </>
          ) : guideStep === 8 ? (
            <>
              <h2>The tour is complete.</h2>
              <p>We hope you enjoy your experience!</p>
            </>
          ) : null}
          {guideStep <= 8 && guideStep !== 2 ? (
            <div>
              <ul>
                <li>
                  <span className={guideStep === 1 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 2 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 3 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 4 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 5 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 6 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 7 ? 'active' : ''} />
                </li>
                <li>
                  <span className={guideStep === 8 ? 'active' : ''} />
                </li>
              </ul>
              <span>{guideStep} / 8</span>
              <button
                type="button"
                className="text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                onClick={clickNext}
              >
                Next
              </button>
            </div>
          ) : null}
        </section>
      </div>
    );
  };

  return (
    <div id="dashboard-layout">
      {renderGuideOut()}
      <Sidebar />
      <div
        id="dashboard-layoutContent"
        className={isCollapsed ? 'collapsedSidebar' : ''}
      >
        <Header />
        <div
          id="landing-page__dashboard"
          className={`${bg || ''} px-5 py-6.25`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
