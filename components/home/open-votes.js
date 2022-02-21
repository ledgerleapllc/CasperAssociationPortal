import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getVotes } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { ClockBar, Table } from '../partials';
import { useTable } from '../partials/table';

const Styles = styled.div`
  .active-vote-table {
    display: flex;
    flex-direction: column;
    .infinite-scroll-component__outerdiv {
      margin-right: 0;
    }
    .col-1 {
      width: 55%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 45%;
      padding-right: 0 !important;
    }
    .custom-row {
      border: 0;
      padding: 10px 0;
    }
  }
`;

const OpenVotes = ({ toggleOpenVotes }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, hasMore, appendData, setHasMore, page, setPage, params } =
    useTable();

  const fetchActiveVotes = (pageValue = page, paramsValue = params) => {
    dispatch(
      getVotes(
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
    fetchActiveVotes();
  }, []);

  useEffect(() => {
    toggleOpenVotes(!!data.length);
  }, [JSON.stringify(data)]);

  const goToVoteDetail = id => {
    router.push(`/dashboard/votes/${id}`);
  };

  const renderTimer = row => {
    if (row.start_date && row.start_time && row.end_date && row.end_time) {
      return (
        <ClockBar
          endTime={new Date(`${row.end_date} ${row.end_time}`)}
          startTime={new Date(`${row.start_date} ${row.start_time}`)}
          hideProgressBar
        />
      );
    }
    return (
      <ClockBar
        endTime={new Date(row.time_end)}
        startTime={new Date(row.created_at)}
        hideProgressBar
      />
    );
  };

  return (
    <div className="flex flex-col pl-8 py-7 h-full">
      <p className="text-lg font-medium">Open Votes</p>
      <div className="flex flex-col lg:pt-6 h-8.5/10">
        <Styles className="h-full w-full">
          <Table
            className="active-vote-table w-full h-full min-w-full"
            onLoadMore={fetchActiveVotes}
            hasMore={hasMore}
            dataLength={data.length}
          >
            <Table.Header>
              <Table.HeaderCell key="title">
                <p className="font-medium">Title</p>
              </Table.HeaderCell>
              <Table.HeaderCell key="time-left">
                <p className="font-medium">Time Left</p>
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data.map((row, ind) => (
                <Table.BodyRow
                  key={ind}
                  selectRowHandler={() => goToVoteDetail(row.id)}
                  className="custom-row"
                >
                  <Table.BodyCell key="title">
                    <p className="truncate">{row.title}</p>
                  </Table.BodyCell>
                  <Table.BodyCell key="time">{renderTimer(row)}</Table.BodyCell>
                </Table.BodyRow>
              ))}
            </Table.Body>
          </Table>
        </Styles>
      </div>
    </div>
  );
};

export default OpenVotes;
