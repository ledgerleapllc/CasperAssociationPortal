import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import styled from 'styled-components';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  Tab,
  ClockBar,
  StatusText,
  ForAgainst,
  Table,
  Button,
} from '../../../components/partials';
import { useTable } from '../../../components/partials/table';
import { formatDate, getDateObject } from '../../../shared/core/utils';
import { getBallots } from '../../../shared/redux-saga/admin/actions';

const Styles = styled.div`
  .active-ballot-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 25%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 13%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 17%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 20%;
      padding-right: 0 !important;
    }
  }
  .complete-ballot-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 30%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 12%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 12%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-7 {
      width: 10%;
      padding-right: 0 !important;
    }
  }
`;

const Tab1 = () => {
  const {
    data,
    register,
    hasMore,
    appendData,
    resetData,
    setHasMore,
    page,
    setPage,
    params,
    setParams,
  } = useTable();

  const dispatch = useDispatch();
  const router = useHistory();

  const fetchActiveBallots = (pageValue = page, paramsValue = params) => {
    dispatch(
      getBallots(
        { status: 'active', page: pageValue, ...paramsValue },
        (result, isHasMore) => {
          setHasMore(isHasMore);
          appendData(result);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchActiveBallots();
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    fetchActiveBallots(1, newParams);
  };

  const renderStartDate = row => {
    if (row.time_begin) {
      return (
        <p className="truncate">
          {formatDate(row.time_begin, 'dd/MM/yyyy')}
          <br />
          {formatDate(row.time_begin, 'HH:mm aa')}
        </p>
      );
    }

    return (
      <p className="truncate">
        {formatDate(row.created_at, 'dd/MM/yyyy')}
        <br />
        {formatDate(row.created_at, 'HH:mm aa')}
      </p>
    );
  };

  const renderTimer = row => {
    if (row.time_begin && row.time_end) {
      return (
        <ClockBar
          endTime={getDateObject(row.time_end)}
          startTime={getDateObject(row.time_begin)}
        />
      );
    }
    return null;
  };

  const goToEdit = row => {
    router.push(`/admin/ballots/edit/${row.id}`);
  };

  const goToDetail = row => {
    router.push(`/admin/ballots/detail/${row.id}`);
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-ballot-table pt-8 h-full"
        onLoadMore={fetchActiveBallots}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell key="title" sortKey="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="time">
            <p>Time Remaining</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="totalVotes">
            <p>
              Total <br />
              Votes
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="split">
            <p>
              Split <br />
              For/Against
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="startDate">
            <p>Start Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="adminAction">
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={`b-${ind}`}>
              <Table.BodyCell key="title">
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="createdAt1">
                {renderTimer(row)}
              </Table.BodyCell>
              <Table.BodyCell key="resultCount">
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell key="forValue">
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell key="createdAt2">
                {renderStartDate(row)}
              </Table.BodyCell>
              <Table.BodyCell key="buttonActions">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    onClick={() => goToEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    onClick={() => goToDetail(row)}
                  >
                    Manage
                  </button>
                </div>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab3 = () => {
  const {
    data,
    register,
    hasMore,
    appendData,
    resetData,
    setHasMore,
    page,
    setPage,
    params,
    setParams,
  } = useTable();

  const dispatch = useDispatch();
  const router = useHistory();
  const fetchScheduledBallots = (pageValue = page, paramsValue = params) => {
    dispatch(
      getBallots(
        { status: 'scheduled', page: pageValue, ...paramsValue },
        (result, isHasMore) => {
          setHasMore(isHasMore);
          appendData(result);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchScheduledBallots();
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    fetchScheduledBallots(1, newParams);
  };

  const renderStartDate = row => {
    if (row.time_begin) {
      return (
        <p className="truncate">
          {formatDate(row.time_begin, 'dd/MM/yyyy')}
          <br />
          {formatDate(row.time_begin, 'HH:mm aa')}
        </p>
      );
    }

    return (
      <p className="truncate">
        {formatDate(row.created_at, 'dd/MM/yyyy')}
        <br />
        {formatDate(row.created_at, 'HH:mm aa')}
      </p>
    );
  };

  const goToEdit = row => {
    router.push(`/admin/ballots/edit/${row.id}`);
  };

  const goToDetail = row => {
    router.push(`/admin/ballots/detail/${row.id}`);
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-ballot-table pt-8 h-full"
        onLoadMore={fetchScheduledBallots}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell key="title" sortKey="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="time">
            <p>Time Remaining</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="totalVotes">
            <p>
              Total <br />
              Votes
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="split">
            <p>
              Split <br />
              For/Against
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="startDate">
            <p>Start Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="adminAction">
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={`b-${ind}`}>
              <Table.BodyCell key="title">
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="createdAt1">
                <span className="text-gray text-xs font-semibold">
                  Scheduled
                </span>
              </Table.BodyCell>
              <Table.BodyCell key="resultCount">
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell key="forValue">
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell key="createdAt2">
                {renderStartDate(row)}
              </Table.BodyCell>
              <Table.BodyCell key="buttonActions">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    onClick={() => goToEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    onClick={() => goToDetail(row)}
                  >
                    Manage
                  </button>
                </div>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab2 = () => {
  const {
    data,
    register,
    hasMore,
    appendData,
    resetData,
    setHasMore,
    page,
    setPage,
    params,
    setParams,
  } = useTable();
  const dispatch = useDispatch();
  const fetchCompleteBallots = (pageValue = page, paramsValue = params) => {
    dispatch(
      getBallots(
        { status: 'complete', page: pageValue, ...paramsValue },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchCompleteBallots();
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    fetchCompleteBallots(1, newParams);
  };

  const router = useHistory();
  const goToDetail = row => {
    router.push(`/admin/ballots/detail/${row.id}`);
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="complete-ballot-table pt-8 h-full"
        onLoadMore={fetchCompleteBallots}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell key="title" sortKey="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="finalResult">
            <p>Final Result</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="totalVotes">
            <p>
              Total <br />
              Votes
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="split">
            <p>
              Split <br />
              For/Against
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="startDate">
            <p>Start Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="endDate">
            <p>End Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="adminAction">
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={`a-${ind}`}>
              <Table.BodyCell key="title">
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="status">
                <StatusText className="capitalize" content={row.status} />
              </Table.BodyCell>
              <Table.BodyCell key="resultCount">
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell key="split">
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell key="createdAt3">
                <p className="truncate">
                  {formatDate(row.created_at, 'dd/MM/yyyy')}
                  <br />
                  {formatDate(row.created_at, 'HH:mm aa')}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="timeEnd">
                <p className="truncate">
                  {formatDate(row.time_end, 'dd/MM/yyyy')}
                  <br />
                  {formatDate(row.time_end, 'HH:mm aa')}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="actionButtons">
                <button
                  type="button"
                  className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  onClick={() => goToDetail(row)}
                >
                  View
                </button>
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
    id: 'active',
    title: 'Active',
  },
  {
    content: Tab3,
    id: 'scheduled',
    title: 'Scheduled',
  },
  {
    content: Tab2,
    id: 'complete',
    title: 'Complete',
  },
];

const Ballots = () => (
  <>
    <Head>
      <title>Ballots - Casper Association Portal</title>
    </Head>
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="flex justify-end lg:mr-card relative">
            <Link to="/admin/ballots/add">
              <span>
                <Button primary className="px-5 py-2">
                  + New Ballot
                </Button>
              </span>
            </Link>
          </div>
          <Tab
            className="w-full h-full pt-12 lg:pt-0 lg:-mt-7"
            data={tabsData}
          />
        </div>
      </Card>
    </LayoutDashboard>
  </>
);

export default LoadingScreen(Ballots, 'final-admin', 'ballots');
