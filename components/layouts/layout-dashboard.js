/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGuideStep,
  setHideGuide,
} from '../../shared/redux-saga/auth/actions';
import Header from '../dashboard/header';
import Sidebar from '../dashboard/sidebar';
import IconX from '../../public/images/ic_x.svg';

export default function LayoutDashboard({ children, bg }) {
  const isCollapsed = useSelector(
    state => state.authReducer.appInfo.isCollapsed
  );
  const guideStep = useSelector(state => state.authReducer.appInfo.guideStep);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const hideGuide = useSelector(state => state.authReducer.appInfo.hideGuide);

  const [isAdmin, setIsAdmin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
    setIsAdmin(isAdminTemp);
    let guideStepValue = localStorage.getItem('GUIDE_SHOW_STEP');
    if (!guideStepValue) {
      localStorage.setItem('GUIDE_SHOW_STEP', 1);
      guideStepValue = 1;
    } else {
      guideStepValue = parseInt(guideStepValue, 10);
    }
    dispatch(setGuideStep({ guideStep: guideStepValue }));
  }, []);

  const clickNext = () => {
    localStorage.setItem('GUIDE_SHOW_STEP', guideStep + 1);
    dispatch(setGuideStep({ guideStep: guideStep + 1 }));
  };

  const renderGuideOut = () => {
    if (isAdmin || hideGuide || !guideStep || guideStep > 8 || guideStep === 2)
      return null;
    return (
      <div className="dashboard-guide" id={`dashboard-guide-${guideStep}`}>
        <section>
          <div
            id="dashboard-guide-close"
            onClick={() => dispatch(setHideGuide({ hideGuide: true }))}
          >
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
