import Link from 'next/link';
import { useEffect, useState } from 'react';
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
      width: 15%;
    }
    .col-5 {
      width: 15%;
    }
    .col-6 {
      width: 10%;
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

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-ballot-table pt-10 h-full"
        onLoadMore={fetchActiveBallots}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell sortKey="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Time Remaining</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Total <br />
              Votes
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Split <br />
              For/Against
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Start Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((row, ind) => (
            <Table.BodyRow key={`b-${ind}`}>
              <Table.BodyCell>
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <ClockBar
                  endTime={new Date(row.time_end)}
                  startTime={new Date(row.created_at)}
                />
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{formatDate(row.created_at)}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <Link href={`/admin/ballots/detail/${row.id}`}>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Manage
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
        className="complete-ballot-table pt-10 h-full"
        onLoadMore={fetchCompleteBallots}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell sortKey="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Final Result</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Total <br />
              Votes
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Split <br />
              For/Against
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Start Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>End Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((row, ind) => (
            <Table.BodyRow key={`a-${ind}`}>
              <Table.BodyCell >
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <StatusText className="capitalize" content={row.status} />
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{formatDate(row.created_at, 'hh:mm aaa dd/MM/yyyy')}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{formatDate(row.time_end, 'hh:mm aaa dd/MM/yyyy')}</p>
              </Table.BodyCell>
              <Table.BodyCell>
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
    <Card className="h-full lg:pl-24 lg:py-10 lg:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <div className="flex justify-between lg:mr-24">
          <h3 className="text-dark2 text-xl lg:pr-32 font-medium">Ballots</h3>
          <Link href="/admin/ballots/add">
            <button
              type="button"
              className="transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            >
              + New Ballot
            </button>
          </Link>
        </div>
        <Tab
          className="w-full h-full pt-12 lg:pt-0 ballot-tabs"
          data={tabsData}
          scrollable
        />
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(Ballots, 'final-admin');
