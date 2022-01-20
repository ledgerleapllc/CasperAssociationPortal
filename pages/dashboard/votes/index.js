import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';
import {
  Card,
  Tab,
  ForAgainst,
  Table,
  ClockBar,
  Tooltips,
  StatusText,
} from '../../../components/partials';
import {
  getMyVotes,
  getVotes,
} from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../../shared/core/utils';
import { useTable } from '../../../components/partials/table';

const Styles = styled.div`
  .active-vote-table {
    .col-1 {
      width: 40%;
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
      width: 14%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 13%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 5%;
      padding-right: 0 !important;
    }
  }
  .complete-vote-table {
    .col-1 {
      width: 55%;
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
      width: 15%;
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
  const router = useRouter();
  const fetchActiveVotes = (pageValue = page, paramsValue = params) => {
    dispatch(
      getVotes(
        { status: 'active', page: pageValue, ...paramsValue },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchActiveVotes();
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    fetchActiveVotes(1, newParams);
  };

  const goToVoteDetail = id => {
    router.push(`/dashboard/votes/${id}`);
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

  const renderStartDate = row => {
    if (row.start_date && row.start_time) {
      const date = `${row.start_date} ${row.start_time}`;
      return (
        <p>
          {`${formatDate(date, 'dd/MM/yyyy')}`}
          <br />
          {`${formatDate(date, 'HH:mm aaa')} EST`}
        </p>
      );
    }

    return (
      <p>
        {`${formatDate(row.created_at, 'dd/MM/yyyy')}`}
        <br />
        {`${formatDate(row.created_at, 'HH:mm aaa')} EST`}
      </p>
    );
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-vote-table pt-10 h-full"
        onLoadMore={fetchActiveVotes}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell key="header1">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header2" sortKey="time_end">
            <p>Time Remaining</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header3">
            <p>Votes</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header4">
            <Tooltips
              placement="top"
              title="Displays the current vote split. FOR / AGAINST"
              arrow
            >
              <p>Current Split</p>
            </Tooltips>
          </Table.HeaderCell>
          <Table.HeaderCell key="header5">
            <p>Start Date &amp; Time</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header6" />
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow
              className="py-6"
              key={ind}
              selectRowHandler={() => goToVoteDetail(row.id)}
            >
              <Table.BodyCell key="body1">
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body2">{renderTimer(row)}</Table.BodyCell>
              <Table.BodyCell key="body3">
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body4">
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell key="body5">
                {renderStartDate(row)}
              </Table.BodyCell>
              <Table.BodyCell key="body6">
                <a className="text-primary cursor-pointer underline">View</a>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const Tab2 = () => {
  const [completeVotes, setCompleteVotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchFinishVotes = () => {
    dispatch(
      getVotes({ status: 'finish', page }, (data, isHasMore) => {
        setHasMore(isHasMore);
        setCompleteVotes(prevVotes => [...prevVotes, ...data]);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchFinishVotes();
  }, []);

  const goToFinishedVoteDetail = id => {
    router.push(`/dashboard/votes/${id}`);
  };

  const renderEndTime = row => {
    if (row.end_date && row.end_time) {
      return (
        <p>{`${formatDate(new Date(`${row.end_date} ${row.end_time}`))}`}</p>
      );
    }
    return <p>{`${formatDate(new Date(row?.time_end))}`}</p>;
  };

  return (
    <Styles className="h-full">
      <Table
        className="complete-vote-table pt-10 h-full"
        onLoadMore={fetchFinishVotes}
        hasMore={hasMore}
        dataLength={completeVotes.length}
      >
        <Table.Header>
          <Table.HeaderCell key="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="total_votes">
            <p>Total Votes</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="result">
            <p>For/Against</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="date_ended">
            <p>Date Ended</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {completeVotes.map((row, ind) => (
            <Table.BodyRow
              className="py-6"
              key={ind}
              selectRowHandler={() => goToFinishedVoteDetail(row.id)}
            >
              <Table.BodyCell key="truncate">
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="result_count">
                <p>{row.vote?.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell key="for_value">
                <ForAgainst
                  splitFor={row.vote?.for_value}
                  splitAgainst={row.vote?.against_value}
                />
              </Table.BodyCell>
              <Table.BodyCell key="time_end">
                {renderEndTime(row)}
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
  const router = useRouter();
  const fetchMyVotes = (pageValue = page, paramsValue = params) => {
    dispatch(
      getMyVotes({ page: pageValue, ...paramsValue }, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchMyVotes();
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    fetchMyVotes(1, newParams);
  };

  const goToVoteDetail = id => {
    router.push(`/dashboard/votes/${id}`);
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="active-vote-table pt-10 h-full"
        onLoadMore={fetchMyVotes}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell key="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="myVote" sortKey="time_end">
            <p>My Vote</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="datePlaced">
            <p>Date Placed</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="totalVotes">
            <p>Total Votes</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="forAgainst">
            <p>For/Against</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow
              className="py-6"
              key={ind}
              selectRowHandler={() => goToVoteDetail(row.id)}
            >
              <Table.BodyCell key="body1">
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body2">
                <StatusText content={row.voteType} className="uppercase" />
              </Table.BodyCell>
              <Table.BodyCell key="body3">
                <p>{`${formatDate(row.date_placed)}`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body4">
                <p>{row.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body5">
                <ForAgainst
                  splitFor={row.for_value}
                  splitAgainst={row.against_value}
                />
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const DashboardVote = () => {
  const [tabsData, setTabsData] = useState([]);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  useEffect(() => {
    if (userInfo && !['admin', 'sub-admin'].includes(userInfo.role)) {
      setTabsData([
        {
          content: Tab1,
          id: 'active-votes',
          title: 'Active Votes',
        },
        {
          content: Tab2,
          id: 'finished',
          title: 'Finished',
        },
        {
          content: Tab3,
          id: 'my-votes',
          title: 'My Votes',
        },
      ]);
    } else {
      setTabsData([
        {
          content: Tab1,
          id: 'active-votes',
          title: 'Active Votes',
        },
        {
          content: Tab2,
          id: 'finished',
          title: 'Finished',
        },
      ]);
    }
  }, [userInfo]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          {tabsData.length > 0 && (
            <Tab className="w-full h-full pt-12 lg:pt-4" data={tabsData} lazy />
          )}
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  withPageRestricted(DashboardVote, 'votes'),
  'final-all'
);
