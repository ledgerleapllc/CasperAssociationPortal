import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import { Card } from '../partials';
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
import { ValidatorChart } from '../charts/validator-chart';

const LineMemo = memo(({ name, data }) => (
  <ValidatorChart name={name} data={data} />
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
  const [earningChart, setEarningChart] = useState();
  const [optionChart, setOptionChart] = useState('day');
  const [loadingDataChart, setLoadingDataChart] = useState(false);

  const dispatch = useDispatch();
  const { setDialog } = useDialog();

  useEffect(() => {
    dispatch(
      getUserDashboard(res => {
        setStats(res);
      })
    );
    setLoadingDataChart(true);
    dispatch(
      getEarningChart(
        { node: userInfo.public_address_node },
        res => {
          setEarningChart(res);
          setLoadingDataChart(false);
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
        _alerts.push({
          id: 'verification',
          title: 'Get ID verified with Casper’s red checkmark!',
          body: 'Verify ownership of your node to earn a trusted status in the network and host a verified public page. ID verified nodes have more trust leading to more delegations.',
          handler: () => {
            router.push('/dashboard/verification');
          },
        });
      }

      if (
        userInfo?.reset_kyc &&
        !['admin', 'sub-admin'].includes(userInfo?.role)
      ) {
        _alerts.push({
          id: 'verification',
          title: 'Verify your KYC!',
          custom_text: 'Get Verified',
          custom_action: () => router.push('/dashboard/verification'),
          body: 'We were unable to verify your kyc. It’s ok, an admin has reset the verification process to the beginning, and you can try resubmitting your documents again to get verified.',
          handler: () => {},
        });
      }

      if (
        !userInfo?.metric?.is_open_port &&
        !['admin', 'sub-admin'].includes(userInfo?.role)
      ) {
        _alerts.push({
          id: 'open_port',
          title:
            'We’re having a problem getting your metrics. Make sure port 8888 is open on your node and try again.',
          body: '',
          handler: () => {},
        });
      }
      setAlerts([..._alerts]);
    }
  }, [userInfo, bannerAlerts]);

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
    <div className="flex flex-col w-full h-full">
      <div id="dashboard-content-node3__widgets" className="gap-5">
        {(isAlertLoading || !!alerts.length) && (
          <div className="custom-alert-box">
            <Alert
              isLoading={isAlertLoading}
              alerts={alerts}
              doDismiss={doDismiss}
              doUpdateClickCTA={doUpdateClickCTA}
              doUpdateView={doUpdateViewNotifications}
            />
          </div>
        )}
        <div className="custom-pinned-d-box">
          <Card className="w-full h-full py-3">
            <div className="w-full h-full flex flex-col px-9 justify-center">
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
        <div className="custom-new-d-box">
          <Card className="w-full h-full py-3">
            <div className="w-full h-full flex flex-col px-9 justify-center">
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
      <div id="dashboard-content-node3__Detail">
        <div id="custom-validator-rewards-box3" className="z-50 lg:z-20">
          <Card className="w-full h-full px-9 py-5">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <p className="text-lg lg:text-2xl">Validator Rewards</p>
                <div>
                  <ul className="mt-4 gap-4 lg:mt-0 flex items-center">
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'day' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('day')}
                      >
                        Day
                      </button>
                    </li>
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'week' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('week')}
                      >
                        Week
                      </button>
                    </li>
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'month' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('month')}
                      >
                        Month
                      </button>
                    </li>
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'year' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('year')}
                      >
                        Year
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-full pt-2">
                {loadingDataChart && (
                  <div className="h-full flex items-center">
                    <ReactLoading
                      className="mx-auto"
                      type="spinningBubbles"
                      color="#FF473E"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
                {!loadingDataChart && earningChart && (
                  <LineMemo
                    name="Self stake"
                    data={earningChart[optionChart]}
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
        <div id="dashboard-content-node3__SubDetail" className="gap-5">
          <div id="dashboard-content-node3__SubDetailLeft">
            <Card className="z-40 w-full h-full overflow-y-auto">
              <TrendingDiscussion />
            </Card>
          </div>
          <div
            className={`${showOpenVotes ? '' : 'hidden'}`}
            id="dashboard-content-node3__SubDetailRight"
          >
            <Card className="z-30 w-full h-full overflow-y-auto">
              <OpenVotes toggleOpenVotes={setShowOpenVotes} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHome;
