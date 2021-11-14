import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { formatDate } from '../../../shared/core/utils';
import { getBallots } from '../../../shared/redux-saga/admin/actions';

const Styles = styled.div`
  .active-ballot-table {
    .col-1 {
      width: 30%;
    }
    .col-2 {
      width: 15%;
    }
    .col-3 {
      width: 15%;
    }
    .col-4 {
      width: 12%;
    }
    .col-5 {
      width: 10%;
    }
    .col-6 {
      width: 18%;
    }
  }
  .complete-ballot-table {
    .col-1 {
      width: 30%;
    }
    .col-2 {
      width: 15%;
    }
    .col-3 {
      width: 12%;
    }
    .col-4 {
      width: 12%;
    }
    .col-5 {
      width: 10%;
    }
    .col-6 {
      width: 10%;
    }
    .col-7 {
      width: 10%;
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

  const renderTimer = row => {
    if (row.start_date && row.start_time && row.end_date && row.end_time) {
      return (
        <ClockBar
          endTime={new Date(`${row.end_date} ${row.end_time}`)}
          startTime={new Date(`${row.start_date} ${row.start_time}`)}
        />
      );
    }
    return (
      <ClockBar
        endTime={new Date(row.time_end)}
        startTime={new Date(row.created_at)}
      />
    );
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
        <Table.Body className="padding-tracker">
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
                <p>{`${formatDate(row.created_at)} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="buttonActions">
                <div className="flex gap-4">
                  <Link href={`/admin/ballots/edit/${row.id}`}>
                    <button
                      type="button"
                      className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    >
                      Edit
                    </button>
                  </Link>
                  <Link href={`/admin/ballots/detail/${row.id}`}>
                    <button
                      type="button"
                      className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    >
                      Manage
                    </button>
                  </Link>
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
        <Table.Body className="padding-tracker">
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
                <p>{`${formatDate(
                  row.created_at,
                  'hh:mm aaa dd/MM/yyyy'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="timeEnd">
                <p>{`${formatDate(
                  row.time_end,
                  'hh:mm aaa dd/MM/yyyy'
                )} EST`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="actionButtons">
                <Link href={`/admin/ballots/detail/${row.id}`}>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    View
                  </button>
                </Link>
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
    content: Tab2,
    id: 'complete',
    title: 'Complete',
  },
];

const Ballots = () => (
  <LayoutDashboard>
    <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <div className="flex justify-end lg:mr-card">
          <Link href="/admin/ballots/add">
            <a>
              <Button primary>+ New Ballot</Button>
            </a>
          </Link>
        </div>
        <Tab className="w-full h-full pt-12 lg:pt-0 lg:-mt-7" data={tabsData} />
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(Ballots, 'final-admin', 'ballots');
