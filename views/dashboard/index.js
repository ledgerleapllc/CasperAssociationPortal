/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import InfoRightHome from '../../components/dashboard/info-right-home';
import ContentHome from '../../components/dashboard/content-home';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import {
  setGuideStep,
  setHideGuide,
} from '../../shared/redux-saga/auth/actions';
import IconX from '../../public/images/ic_x.svg';
import { getUserFullDashboard } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../pages/_app';

const Dashboard = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const guideStep = useSelector(state => state.authReducer.appInfo.guideStep);
  const hideGuide = useSelector(state => state.authReducer.appInfo.hideGuide);
  const [isAdmin, setIsAdmin] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

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

    if (!isAdminTemp) {
      setLoading(true);
      dispatch(
        getUserFullDashboard(
          res => {
            setLoading(false);
            setDashboardData(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, []);

  const clickNext = () => {
    localStorage.setItem('GUIDE_SHOW_STEP', guideStep + 1);
    dispatch(setGuideStep({ guideStep: guideStep + 1 }));
  };

  const closeGuide = () => {
    dispatch(setHideGuide({ hideGuide: true }));
    localStorage.setItem('GUIDE_SHOW_STEP', 9);
    dispatch(setGuideStep({ guideStep: 9 }));
  };

  const renderGuideIn = () => {
    if (
      userInfo?.profile?.status === 'approved' ||
      isAdmin === null ||
      isAdmin ||
      hideGuide ||
      !guideStep ||
      guideStep > 8 ||
      guideStep !== 2
    )
      return null;
    return (
      <div className="dashboard-guide" id={`dashboard-guide-${guideStep}`}>
        <section>
          <div id="dashboard-guide-close" onClick={closeGuide}>
            <IconX className="text-xs" style={{ color: '#CCC' }} />
          </div>
          {[2].includes(guideStep) ? (
            <>
              <img
                id="dashboard-guide-left"
                width="20px"
                src="/images/left.png"
                alt=""
              />
              <img
                id="dashboard-guide-right"
                width="20px"
                src="/images/right.png"
                alt=""
              />
            </>
          ) : null}
          {guideStep === 2 ? (
            <>
              <h2>Node Info</h2>
              <p>Track the overall status of your node.</p>
            </>
          ) : null}
          {guideStep <= 8 ? (
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
    <>
      <Head>
        <title>Dashboard - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="flex flex-col xl:flex-row gap-5 w-full h-auto xl:h-full">
          <div className="w-full xl:w-4/5 h-auto xl:h-full relative">
            <ContentHome dashboardData={dashboardData} />
          </div>
          <div className="w-full xl:w-1/5 h-auto xl:h-full relative">
            {renderGuideIn()}
            <Card className="w-full h-full">
              <div className="overflow-y-scroll w-full h-full">
                <InfoRightHome dashboardData={dashboardData} />
              </div>
            </Card>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};
export default LoadingScreen(Dashboard, 'final-member');
