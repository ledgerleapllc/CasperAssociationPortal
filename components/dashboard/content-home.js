import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import router from 'next/router';
import { Line } from 'react-chartjs-2';
import { Card } from '../partials';
import InfoRightHome from './info-right-home';
import OpenVotes from '../home/open-votes';
import TrendingDiscussion from '../home/trending-discussion';
import Alert from '../home/alert';
import {
  dismissNotification,
  getEarningChart,
  updateClickCTANotification,
  updateViewNotification,
} from '../../shared/redux-saga/dashboard/dashboard-actions';
import { useDialog } from '../partials/dialog';
import useNotifications from '../hooks/useNotifications';
import { getUserDashboard } from '../../shared/redux-saga/auth/actions';
import { DEFAULT_LINE_OPTIONS } from '../../shared/core/constants';
import useValidatorChart from '../hooks/useValidatorChart';

const LineMemo = memo(({ data, options = DEFAULT_LINE_OPTIONS }) => (
  <Line data={data} options={options} />
));

const ContentHome = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [showOpenVotes, setShowOpenVotes] = useState(false);
  const [isAlertLoading, setIsAlertLoading] = useState(true);
  const [alerts, setAlerts] = useState();
  const [bannerAlerts, setBannerAlerts] = useState();
  const [currentNotification, setCurrentNotifications] = useState(null);
  const { bannerNotis, popupNotis } = useNotifications();
  const [stats, setStats] = useState();
  const { mappingData, options, data } = useValidatorChart();
  const [earningChart, setEarningChart] = useState();

  const dispatch = useDispatch();
  const { setDialog } = useDialog();

  useEffect(() => {
    dispatch(
      getUserDashboard(res => {
        setStats(res);
      })
    );
    dispatch(
      getEarningChart(
        { node: userInfo.public_address_node },
        res => {
          res.day = res.day.map(x => x.weight);
          res.month = res.month.map(x => x.weight);
          res.week = res.week.map(x => x.weight);
          res.year = res.year.map(x => x.weight);

          setEarningChart(res);
          mappingData(res);
        },
        () => {}
      )
    );
  }, []);

  useEffect(() => {
    if (alerts) {
      setIsAlertLoading(false);
    }
  }, [alerts]);

  useEffect(() => {
    if (bannerNotis) {
      setBannerAlerts(bannerNotis);
    }
  }, [bannerNotis]);

  useEffect(() => {
    if (userInfo && bannerAlerts) {
      let _alerts = [];
      if (bannerAlerts.length) {
        const highPriorityAlert = bannerAlerts.find(item => item.high_priority);
        const otherAlerts = bannerAlerts.filter(item => !item.high_priority);
        if (highPriorityAlert) {
          _alerts = [..._alerts, ...[highPriorityAlert], ...otherAlerts];
        } else {
          _alerts = [..._alerts, ...bannerAlerts];
        }
      }
      if (
        !userInfo?.profile?.status &&
        !['admin', 'sub-admin'].includes(userInfo?.role)
      ) {
        _alerts = [
          ..._alerts,
          ...[
            {
              id: 'verification',
              title: 'Get IDverified with Casper’s red checkmark!',
              body: 'Verify ownership of your node to earn a trusted status in the network and host a verified public page. IDverified nodes have more trust leading to more delegations.',
              handler: () => {
                router.push('/dashboard/verification');
              },
            },
          ],
        ];
      }
      setAlerts(_alerts);
    }
  }, [userInfo, bannerAlerts]);

  const applyDataForChart = key => {
    mappingData(earningChart, key);
  };

  const doUpdateClickCTA = id => {
    dispatch(updateClickCTANotification({ id }, () => {}));
  };

  const doUpdateViewNotifications = id => {
    if (id !== 'verification') {
      dispatch(updateViewNotification({ id }, () => {}));
    }
  };

  useEffect(() => {
    const value = localStorage.getItem('SEEN_POPUP_NOTIFICATIONS');
    if (popupNotis?.length && !value) {
      setCurrentNotifications(1);
    }
  }, [popupNotis]);

  useEffect(() => {
    if (popupNotis?.[currentNotification - 1]) {
      const alert = popupNotis[currentNotification - 1];
      setDialog({
        type: 'Notification',
        data: {
          title: alert.title,
          content: alert.body,
          ok: alert.btn_text,
          link: alert.action_link,
        },
        settings: {
          zIndex: 50,
        },
        afterClosed: res => {
          if (res) {
            doUpdateClickCTA(alert?.id);
          }
          doUpdateViewNotifications(alert?.id);
          setCurrentNotifications(pre => pre + 1);
          if (currentNotification === popupNotis.length) {
            localStorage.setItem('SEEN_POPUP_NOTIFICATIONS', 1);
          }
        },
      });
    }
  }, [currentNotification]);

  const doDismiss = (index, id) => {
    dispatch(
      dismissNotification({ id }, () => {
        const _alerts = [...alerts];
        _alerts.splice(index, 1);
        setAlerts(_alerts);
      })
    );
  };

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full">
      <div className="flex gap-5 flex-wrap lg:flex-nowrap lg:h-1.5/10">
        {(isAlertLoading || !!alerts.length) && (
          <div className="w-full h-full lg:w-3/5">
            <Alert
              isLoading={isAlertLoading}
              alerts={alerts}
              doDismiss={doDismiss}
              doUpdateClickCTA={doUpdateClickCTA}
              doUpdateView={doUpdateViewNotifications}
            />
          </div>
        )}
        <div className="w-2/4 flex-grow lg:w-1/5 h-full">
          <Card className="lg:flex-none h-full py-3">
            <div className="flex flex-col px-9 justify-center">
              <span className="text-lg font-medium text-black1">
                Pinned {(isAlertLoading || !!alerts.length) && <br />}{' '}
                Discussions
              </span>
              <span className="text-4xl text-black1 font-thin">
                {stats?.totalPinDiscusstion}
              </span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 flex-grow lg:w-1/5 h-full">
          <Card className="lg:flex-none h-full py-3">
            <div className="flex flex-col px-9 justify-center">
              <span className="text-lg font-medium text-black1">
                New {(isAlertLoading || !!alerts.length) && <br />} Discussions
              </span>
              <span className="text-4xl text-black1 font-thin">
                {stats?.totalNewDiscusstion}
              </span>
            </div>
          </Card>
        </div>
      </div>
      <Card className="block lg:hidden h-auto w-full">
        <div className="h-auto">
          <InfoRightHome />
        </div>
      </Card>
      <div className="flex flex-1 gap-5 flex-col-reverse lg:flex-col lg:h-8.5/10 lg:justify-between min-h-0">
        <div className="z-50 lg:z-20 flex h-auto lg:h-1/3">
          <Card className="w-full px-9 py-5">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <p className="text-lg lg:text-2xl">Validator Rewards</p>
                <div>
                  <ul className="mt-4 lg:mt-0 flex items-center">
                    <li className="text-sm lg:mx-4">
                      <button
                        className={
                          options === 'day' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('day')}
                      >
                        Day
                      </button>
                    </li>
                    <li className="px-4">
                      <button
                        className={
                          options === 'week' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('week')}
                      >
                        Week
                      </button>
                    </li>
                    <li className="text-sm mx-4">
                      <button
                        className={
                          options === 'month' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('month')}
                      >
                        Month
                      </button>
                    </li>
                    <li className="text-sm mx-4">
                      <button
                        className={
                          options === 'year' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('year')}
                      >
                        Year
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-full py-4">
                <LineMemo data={data} />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-1 min-h-0 flex-col-reverse lg:flex-row h-2/3">
          <Card className="z-40 flex-grow w-full mt-5 lg:mt-0 lg:w-2/3 lg:mr-3 h-full">
            <TrendingDiscussion />
          </Card>
          <Card
            className={`${
              showOpenVotes
                ? 'z-30 flex-grow w-full lg:w-1/3 lg:mt-0 lg:ml-3 h-full'
                : 'hidden'
            }`}
          >
            <OpenVotes toggleOpenVotes={setShowOpenVotes} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentHome;
