import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { getVotes } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { ClockBar, Table } from '../partials';
import { useTable } from '../partials/table';

const Styles = styled.div`
  .active-vote-table {
    .col-1 {
      width: 55%;
    }
    .col-2 {
      width: 45%;
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

  const goToActiveVoteDetail = id => {
    router.push(`/dashboard/votes/active/${id}`);
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
              <Table.HeaderCell>
                <p className="underline font-normal">Title</p>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <p className="underline font-normal">Time Left</p>
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data.map((row, ind) => (
                <Table.BodyRow
                  key={ind}
                  selectRowHandler={() => goToActiveVoteDetail(row.id)}
                  className="custom-row"
                >
                  <Table.BodyCell>
                    <p className="truncate">{row.title}</p>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <ClockBar
                      endTime={new Date(row.time_end)}
                      startTime={new Date(row.created_at)}
                      hideProgressBar
                    />
                  </Table.BodyCell>
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
