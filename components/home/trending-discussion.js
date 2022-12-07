import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getTrendingDiscussions } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../shared/core/utils';
import { useTable } from '../partials/table';
import { Table } from '../partials';

const Styles = styled.div`
  .trending-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 30%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 17%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 17%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 36%;
      padding-right: 0 !important;
    }
    .custom-row {
      border: 0;
      padding: 10px 0;
    }
    .table-body {
      .col-1,
      .col-2,
      .col-3,
      .col-4 {
        padding-left: 5px;
      }
    }
  }
`;

const TrendingDiscussion = () => {
  const dispatch = useDispatch();
  const { data, hasMore, appendData, setHasMore, resetData } = useTable();

  const getTrendingList = () => {
    resetData();
    setHasMore(true);
    dispatch(
      getTrendingDiscussions(result => {
        setHasMore(false);
        appendData(result);
      })
    );
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  return (
    <div className="flex flex-col px-8 py-7 w-full h-full">
      <p className="text-lg font-medium mb-3">Trending Discussions</p>
      <div className="w-full h-full overflow-hidden">
        <Styles className="h-full">
          <Table
            className="trending-table h-full"
            onLoadMore={() => {}}
            hasMore={hasMore}
            dataLength={data.length}
          >
            <Table.Header>
              <Table.HeaderCell key="title">
                <p className="font-medium">Title</p>
              </Table.HeaderCell>
              <Table.HeaderCell key="comments">
                <p className="font-medium">Comments</p>
              </Table.HeaderCell>
              <Table.HeaderCell key="views">
                <p className="font-medium">Pinned</p>
              </Table.HeaderCell>
              <Table.HeaderCell key="date">
                <p className="font-medium">Date</p>
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data.map((row, ind) => (
                <Table.BodyRow key={ind} className="custom-row">
                  <Table.BodyCell key="bodycell-1">
                    <Link to={`/dashboard/discussion/${row.id}`}>
                      <p className="truncate cursor-pointer">{row.title}</p>
                    </Link>
                  </Table.BodyCell>
                  <Table.BodyCell key="bodycell-2">
                    <Link to={`/dashboard/discussion/${row.id}`}>
                      <div className="cursor-pointer flex items-center">
                        <div className="pr-2">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">{row.comments}</span>
                      </div>
                    </Link>
                  </Table.BodyCell>
                  <Table.BodyCell key="bodycell-3">
                    <span className="text-sm">{row.total_pinned}</span>
                  </Table.BodyCell>
                  <Table.BodyCell key="bodycell-4">
                    <Link to={`/dashboard/discussion/${row.id}`}>
                      <div className="cursor-pointer flex items-center lg:items-start">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">
                          {formatDate(row.created_at, 'd/M/yy HH:mm aa')}
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
