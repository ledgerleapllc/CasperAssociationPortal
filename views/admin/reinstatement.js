/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import styled from 'styled-components';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Tab, Table } from '../../components/partials';
import { useDialog } from '../../components/partials/dialog';
import { useTable } from '../../components/partials/table';
import { formatDateEST } from '../../shared/core/utils';
import {
  approveReinstatement,
  getActiveReinstatements,
  getHistoryReinstatements,
  rejectReinstatement,
} from '../../shared/redux-saga/admin/actions';
import { AppContext } from '../../pages/_app';

const Styles = styled.div`
  .active-reinstatement-table {
    display: flex;
    flex-direction: column;
    .table-header {
      padding-right: 8px;
    }
    .col-1 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 25%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 20%;
      padding-right: 0 !important;
    }
  }
  .history-reinstatement-table {
    display: flex;
    flex-direction: column;
    .table-header {
      padding-right: 8px;
    }
    .col-1 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 20%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-7 {
      width: 10%;
      padding-right: 0 !important;
    }
  }
`;

const Tab1 = () => {
  const { data, register, hasMore, appendData, resetData, setHasMore } =
    useTable();
  const dispatch = useDispatch();
  const { setDialog, onClosed } = useDialog();
  const { setLoading } = useContext(AppContext);

  const fetchActiveRequests = () => {
    resetData();
    dispatch(
      getActiveReinstatements(
        result => {
          setHasMore(false);
          appendData(result);
        },
        () => {
          setHasMore(false);
          appendData([]);
        }
      )
    );
  };

  useEffect(() => {
    fetchActiveRequests();
  }, []);

  const clickYes = row => {
    setLoading(true);
    dispatch(
      approveReinstatement(
        row.id,
        () => {
          // fetchActiveRequests();
          // onClosed();
          window.location.reload();
        },
        () => {
          setLoading(false);
          onClosed();
        }
      )
    );
  };

  const clickNo = row => {
    setLoading(true);
    dispatch(
      rejectReinstatement(
        row.id,
        () => {
          // fetchActiveRequests();
          // onClosed();
          window.location.reload();
        },
        () => {
          setLoading(false);
          onClosed();
        }
      )
    );
  };

  const clickReview = row => {
    setDialog({
      type: 'Dialog',
      data: {
        content: (
          <div className="text-center" style={{ backgroundColor: 'white' }}>
            <p className="mb-5">{row.reactivation_reason}</p>
            <hr />
            <p className="mt-5">{`
              If you have reviewed the user's request for reinstatement and are  satisfied with their reasoning, then click YES to reinstate their membership privliges. Otherwise click NO.
            `}</p>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="mt-5 mx-2 px-8 py-1 text-lg text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                onClick={() => clickYes(row)}
              >
                Yes
              </button>
              <button
                type="button"
                className="mt-5 mx-2 px-8 py-1 text-lg text-primary rounded-full bg-white border border-primary shadow-md focus:outline-none hover:opacity-40"
                onClick={() => clickNo(row)}
              >
                No
              </button>
            </div>
          </div>
        ),
      },
      settings: {
        hideButton: true,
        pyClass: 'py-0',
        zIndex: 100,
      },
    });
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-reinstatement-table pt-8 h-full"
        onLoadMore={() => {}}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell key="h_userID">
            <p>User ID</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_revokeTime">
            <p>Revoke Time</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_revokeReason">
            <p>Revoke Reason</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_reinstatementRequestTime">
            <p>Reinstatement Request Time</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_email">
            <p>Email</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_adminAction">
            <p>Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={`b-${ind}`}>
              <Table.BodyCell key="user_id">
                <p className="truncate">{row.user_id}</p>
              </Table.BodyCell>
              <Table.BodyCell key="revoke_at">
                <p className="truncate">{`${formatDateEST(
                  row.revoke_at,
                  'dd/MM/yyyy'
                )}`}</p>
                <p className="truncate">{`${formatDateEST(
                  row.revoke_at,
                  'HH:mm aa'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="revoke_reason">
                <p className="truncate">{row.revoke_reason}</p>
              </Table.BodyCell>
              <Table.BodyCell key="reactivation_requested_at">
                <p className="truncate">{`${formatDateEST(
                  row.reactivation_requested_at,
                  'dd/MM/yyyy'
                )}`}</p>
                <p className="truncate">{`${formatDateEST(
                  row.reactivation_requested_at,
                  'HH:mm aa'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="email">
                <p className="truncate">{row.user?.email}</p>
              </Table.BodyCell>
              <Table.BodyCell key="buttonActions">
                <button
                  type="button"
                  className="px-6 py-2 text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  onClick={() => clickReview(row)}
                >
                  Review
                </button>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab2 = () => {
  const { data, register, hasMore, appendData, resetData, setHasMore } =
    useTable();
  const dispatch = useDispatch();
  const { setDialog } = useDialog();

  const fetchHistoryRequests = () => {
    resetData();
    dispatch(
      getHistoryReinstatements(
        result => {
          setHasMore(false);
          appendData(result);
        },
        () => {
          setHasMore(false);
          appendData([]);
        }
      )
    );
  };

  useEffect(() => {
    fetchHistoryRequests();
  }, []);

  const clickDecision = row => {
    setDialog({
      type: 'Dialog',
      data: {
        content: (
          <div className="text-center" style={{ backgroundColor: 'white' }}>
            <p className="mb-5">{row.reactivation_reason}</p>
            <hr />
          </div>
        ),
      },
      settings: {
        hideButton: true,
        pyClass: 'py-0',
        zIndex: 100,
      },
    });
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="history-reinstatement-table pt-8 h-full"
        onLoadMore={() => {}}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell key="h_userID">
            <p>User ID</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_revokeTime">
            <p>Revoke Time</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_revokeReason">
            <p>Revoke Reason</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_reinstatementRequestTime">
            <p>Reinstatement Request Time</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_email">
            <p>Email</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_decisionTime">
            <p>Decision Time</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="h_decision">
            <p>Decision</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={`a-${ind}`}>
              <Table.BodyCell key="user_id">
                <p className="truncate">{row.user_id}</p>
              </Table.BodyCell>
              <Table.BodyCell key="revoke_at">
                <p className="truncate">{`${formatDateEST(
                  row.revoke_at,
                  'dd/MM/yyyy'
                )}`}</p>
                <p className="truncate">{`${formatDateEST(
                  row.revoke_at,
                  'HH:mm aa'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="revoke_reason">
                <p className="truncate">{row.revoke_reason}</p>
              </Table.BodyCell>
              <Table.BodyCell key="reactivation_requested_at">
                <p className="truncate">{`${formatDateEST(
                  row.reactivation_requested_at,
                  'dd/MM/yyyy'
                )}`}</p>
                <p className="truncate">{`${formatDateEST(
                  row.reactivation_requested_at,
                  'HH:mm aa'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="email">
                <p className="truncate">{row.user?.email}</p>
              </Table.BodyCell>
              <Table.BodyCell key="decision_time">
                <p className="truncate">{`${formatDateEST(
                  row.decision_at,
                  'dd/MM/yyyy'
                )}`}</p>
                <p className="truncate">{`${formatDateEST(
                  row.decision_at,
                  'HH:mm aa'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="decision">
                <a
                  className="underline font-bold"
                  onClick={() => clickDecision(row)}
                >
                  {row.decision ? 'Yes' : 'No'}
                </a>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const tabsData = [
  {
    content: Tab1,
    id: 'active_requests',
    title: 'Active Requests',
  },
  {
    content: Tab2,
    id: 'requests_history',
    title: 'Requests History',
  },
];

const Reinstatement = () => (
  <>
    <Head>
      <title>Reinstatement - Casper Association Portal</title>
    </Head>
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <Tab className="w-full h-full pt-12 lg:pt-0" data={tabsData} />
        </div>
      </Card>
    </LayoutDashboard>
  </>
);

export default LoadingScreen(Reinstatement, 'final-admin', 'reinstatement');
