/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Table } from '../partials';
import TrendingDiscussion from '../home/trending-discussion';
import Alert from '../home/alert';
import {
  dismissNotification,
  updateClickCTANotification,
  updateViewNotification,
} from '../../shared/redux-saga/dashboard/dashboard-actions';
import { useDialog } from '../partials/dialog';
import useNotifications from '../hooks/useNotifications';
import { getUserDashboard } from '../../shared/redux-saga/auth/actions';
import { useTable } from '../partials/table';
import VerifiedIcon from '../../public/images/ic_check_mark.svg';

const Styles = styled.div`
  .verified-members-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 40%;
    }
    .col-2 {
      width: 30%;
    }
    .col-3 {
      width: 30%;
    }
  }
`;

const VerifiedMembers = ({ dashboardData }) => {
  const { data, register, hasMore, appendData, setHasMore, setData } =
    useTable();

  useEffect(() => {
    setData([]);
    setHasMore(false);
    if (
      dashboardData.association_members &&
      dashboardData.association_members.length > 0
    ) {
      appendData(dashboardData.association_members);
    }
  }, [dashboardData]);

  return (
    <Styles className="w-full h-full">
      <Table
        {...register}
        className="verified-members-table"
        onLoadMore={() => {}}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell key="header1">
            <p>Validator</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header2">
            <p>Name</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header3">
            <p>Status</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, index) => (
            <Table.BodyRow key={`b-${index}`}>
              <Table.BodyCell key="body1">
                <p className="truncate">{row.public_key}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body2">
                <div className="flex items-center">
                  <p className="mr-1">
                    <a href={`/dashboard/profile/${row.id}`}>{row.pseudonym}</a>
                  </p>
                  <VerifiedIcon />
                </div>
              </Table.BodyCell>
              <Table.BodyCell key="body3">
                <p
                  style={{
                    color:
                      row.extra_status === 'On Probation'
                        ? 'orange'
                        : row.extra_status === 'Suspended'
                        ? 'red'
                        : 'green',
                  }}
                >
                  {row.extra_status
                    ? row.extra_status
                    : row.node_status
                    ? row.node_status
                    : ''}
                </p>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const ContentHome = ({ dashboardData }) => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAlertLoading, setIsAlertLoading] = useState(true);
  const [alerts, setAlerts] = useState();
  const [bannerAlerts, setBannerAlerts] = useState();
  const [currentNotification, setCurrentNotifications] = useState(null);
  const { bannerNotis, popupNotis } = useNotifications();
  const [stats, setStats] = useState();
  const [total, setTotal] = useState(0);
  const [verified, setVerified] = useState(0);
  const router = useHistory();
  const dispatch = useDispatch();
  const { setDialog } = useDialog();

  useEffect(() => {
    dispatch(
      getUserDashboard(
        res => {
          setStats(res);
        },
        () => {}
      )
    );
  }, []);

  useEffect(() => {
    setTotal(dashboardData?.total_members);
    setVerified(dashboardData?.verified_members);
  }, [dashboardData]);

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
    if (userInfo) {
      let _alerts = [];
      if (bannerAlerts && bannerAlerts.length) {
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

      setAlerts([..._alerts]);
    }
  }, [userInfo, bannerAlerts]);

  const doUpdateClickCTA = id => {
    dispatch(updateClickCTANotification({ id }, () => {}));
  };

  const doUpdateViewNotifications = id => {
    if (id !== 'verification' && !isNaN(id)) {
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
    <div className="flex flex-col w-full h-full gap-5">
      {(isAlertLoading || !!alerts.length) && (
        <div className="w-3/5">
          <Alert
            isLoading={isAlertLoading}
            alerts={alerts}
            doDismiss={doDismiss}
            doUpdateClickCTA={doUpdateClickCTA}
            doUpdateView={doUpdateViewNotifications}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-5">
        <Card className="w-full md:w-1/2 h-32">
          <div className="w-full h-full flex flex-col px-9 justify-center">
            <span className="text-lg font-medium text-black1">
              Pinned {(isAlertLoading || !!alerts.length) && <br />} Discussions
            </span>
            <span className="text-4xl text-black1 font-thin">
              {stats?.totalPinDiscusstion}
            </span>
          </div>
        </Card>
        <Card className="w-full md:w-1/2 h-32">
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
      <Card className="w-full flex flex-col px-9 py-5 h-300px min-h-300px">
        <div className="flex items-center mb-3">
          <p className="text-lg font-medium">Association Members</p>
          <div className="flex items-center ml-auto mr-0">
            <p className="text-sm">Total Members: {total}</p>
            <div className="ml-5 flex items-center">
              <VerifiedIcon />
              <p className="ml-1 text-sm">Verified Members: {verified}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden">
          <VerifiedMembers dashboardData={dashboardData} />
        </div>
      </Card>
      <Card className="z-40 w-full h-full min-h-300px">
        <TrendingDiscussion />
      </Card>
    </div>
  );
};

export default ContentHome;
