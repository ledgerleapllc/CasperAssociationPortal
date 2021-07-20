import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import Link from 'next/link';
import { getTrendingDiscussions } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../shared/core/utils';
import { useTable } from '../partials/table';
import { Table } from '../partials';

const Styles = styled.div`
  .trending-table {
    .col-1 {
      width: 60%;
    }
    .col-2 {
      width: 30%;
    }
    .col-3 {
      width: 30%;
    }
    .custom-row {
      border: 0;
      padding: 10px 0;
    }
  }
`;

const TrendingDiscussion = () => {
  const dispatch = useDispatch();

  const { data, hasMore, appendData, setHasMore, page, setPage } = useTable();

  const getTrendingList = (pageValue = page) => {
    dispatch(
      getTrendingDiscussions({ page: pageValue }, (result, isHasMore) => {
        console.log(result);
        setHasMore(isHasMore);
        appendData(result);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  return (
    <div className="flex flex-col pl-8 py-7 h-full">
      <p className="text-2.5xl text-black1">Trending Discussions</p>
      <div className="flex flex-col pt-6 h-8.5/10">
        <Styles className="h-full w-full">
          <Table
            className="trending-table w-full h-full min-w-full"
            onLoadMore={getTrendingList}
            hasMore={hasMore}
            dataLength={data.length}
          >
            <Table.Header>
              <Table.HeaderCell>
                <p className="underline font-normal">Title</p>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <p className="underline font-normal">Comments</p>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <p className="underline font-normal">Date</p>
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data.map((row, ind) => (
                <Table.BodyRow key={ind} className="custom-row">
                  <Table.BodyCell>
                    <Link href={`/dashboard/discussion/${row.id}`}>
                      <p className="truncate cursor-pointer">{row.title}</p>
                    </Link>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <Link href={`/dashboard/discussion/${row.id}`}>
                      <div className="cursor-pointer flex items-center lg:items-start">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">{row.comments}</span>
                      </div>
                    </Link>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <Link href={`/dashboard/discussion/${row.id}`}>
                      <div className="cursor-pointer flex items-center lg:items-start">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">
                          {formatDate(row.created_at, 'd/M/yy')}
                        </span>
                      </div>
                    </Link>
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

export default TrendingDiscussion;
