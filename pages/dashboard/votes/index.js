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
  TimeRemaining,
  Table,
} from '../../../components/partials';
import { getVotes } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../../shared/core/utils';

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
  const [activeVotes, setActiveVotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchActiveVotes = () => {
    dispatch(
      getVotes('active', (data, isHasMore) => {
        setHasMore(isHasMore);
        setActiveVotes(prevVotes => [...prevVotes, ...data]);
      })
    );
  };

  useEffect(() => {
    fetchActiveVotes();
  }, []);

  const goToActiveVoteDetail = id => {
    router.push(`/dashboard/votes/active/${id}`);
  };

  return (
    <Styles>
      <Table
        className="active-vote-table pt-10"
        onLoadMore={fetchActiveVotes}
        hasMore={hasMore}
        dataLength={activeVotes.length}
        height={300}
      >
        <Table.Header>
          <Table.HeaderCell>
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
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
          {activeVotes.map((row, ind) => (
            <Table.BodyRow
              key={ind}
              selectRowHandler={() => goToActiveVoteDetail(row.id)}
            >
              <Table.BodyCell>
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <TimeRemaining endTime={new Date(row?.time_end)} />
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.vote.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <ForAgainst
                  splitFor={item.vote?.for_value}
                  splitAgainst={item.vote?.against_value}
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
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchFinishVotes = () => {
    dispatch(
      getVotes('finish', (data, isHasMore) => {
        setHasMore(isHasMore);
        setCompleteVotes(prevVotes => [...prevVotes, ...data]);
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
    <Styles>
      <Table
        className="complete-vote-table pt-10"
        onLoadMore={fetchFinishVotes}
        hasMore={hasMore}
        dataLength={completeVotes.length}
        height={300}
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
              key={ind}
              selectRowHandler={() => goToFinishedVoteDetail(row.id)}
            >
              <Table.BodyCell>
                <p className="truncate">{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.vote.result_count}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <ForAgainst
                  splitFor={item.vote?.for_value}
                  splitAgainst={item.vote?.against_value}
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
