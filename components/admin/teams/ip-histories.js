import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { formatDate } from '../../../shared/core/utils';
import { getIPHistories } from '../../../shared/redux-saga/admin/actions';
import { Table } from '../../partials';
import { useTable } from '../../partials/table';

const Styles = styled.div`
  padding: 50px 5.3rem 20px 5.3rem;
  .ip-table {
    min-width: auto;
    .col {
      text-align: left;
    }
    .col-1 {
      width: 33%;
    }
    .col-2 {
      width: 33%;
    }
    .col-3 {
      width: 34%;
    }
  }
`;

export const IPHistoriesDialog = ({ id }) => {
  const {
    data,
    register,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage,
    params,
  } = useTable();
  const dispatch = useDispatch();

  const fetchHistories = (pageValue = page, paramsValue = params) => {
    dispatch(
      getIPHistories(
        {
          id,
          page: pageValue,
          ...paramsValue,
        },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  return (
    <div className="pt-12 text-center mx-auto">
      <h3 className="text-xl text-center font-medium mb-2.5">IP History</h3>
      <Styles>
        <Table
          className="ip-table h-300px w-full"
          {...register}
          onLoadMore={fetchHistories}
          hasMore={hasMore}
          dataLength={data?.length}
        >
          <Table.Header>
            <Table.HeaderCell key="header1">
              <p>Date</p>
            </Table.HeaderCell>
            <Table.HeaderCell key="header2">
              <p>Time</p>
            </Table.HeaderCell>
            <Table.HeaderCell key="header3">
              <p>IP</p>
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body className="lg:-mr-8 lg:pr-8">
            {data.map(row => (
              <Table.BodyRow className="py-4" key={`ip-${row.id}`}>
                <Table.BodyCell key="body1">
                  <p>{formatDate(row.created_at)}</p>
                </Table.BodyCell>
                <Table.BodyCell key="body2">
                  <p>{formatDate(row.created_at, 'HH:mm aa')}</p>
                </Table.BodyCell>
                <Table.BodyCell key="body3">
                  <p>{row.ip_address}</p>
                </Table.BodyCell>
              </Table.BodyRow>
            ))}
          </Table.Body>
        </Table>
      </Styles>
    </div>
  );
};
