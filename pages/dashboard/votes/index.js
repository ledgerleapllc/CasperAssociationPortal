import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  Tab,
  ForAgainst,
  Table,
  ClockBar,
} from '../../../components/partials';
import { getVotes } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../../shared/core/utils';
import { useTable } from '../../../components/partials/table';

const Styles = styled.div`
  .active-vote-table {
    .col-1 {
      width: 40%;
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
  }
  .complete-vote-table {
    .col-1 {
      width: 55%;
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

  const goToActiveVoteDetail = id => {
    router.push(`/dashboard/votes/active/${id}`);
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
          <Table.HeaderCell>
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell sortKey="time_end">
            <p>Time Remaining</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Votes</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Current Split</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Date</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((row, ind) => (
            <Table.BodyRow
              className="py-6"
              key={ind}
              selectRowHandler={() => goToActiveVoteDetail(row.id)}
            >
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
    router.push(`/dashboard/votes/complete/${id}`);
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
          <Table.HeaderCell>
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Votes</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Results</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Date</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {completeVotes.map((row, ind) => (
            <Table.BodyRow
              className="py-6"
              key={ind}
              selectRowHandler={() => goToFinishedVoteDetail(row.id)}
            >
              <Table.BodyCell>
                <p className="truncate">{row.title}</p>
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
                <p>{formatDate(new Date(row?.time_end))}</p>
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
    id: 'active_votes',
    title: 'Active Votes',
  },
  {
    content: Tab2,
    id: 'finished',
    title: 'Finished',
  },
];

const DashboardVote = () => (
  <LayoutDashboard>
    <Card className="h-full lg:pl-24 lg:py-20 lg:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <Tab className="w-full h-full pt-12 lg:pt-0 lg:-mt-7" data={tabsData} />
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(DashboardVote, 'final-all');
