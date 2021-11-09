import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { formatDate } from '../../../../shared/core/utils';
import { getLogUsersViewdDoc } from '../../../../shared/redux-saga/admin/actions';
import { Table } from '../../../partials';
import VerifiedIcon from '../../../../public/images/ic_check_mark.svg';
import { useTable } from '../../../partials/table';

const Styles = styled.div`
  padding: 50px 5.3rem 20px 5.3rem;
  .ip-table {
    min-width: auto;
    .col {
      text-align: left;
    }
    .col-1 {
      width: 50%;
    }
    .col-2 {
      width: 25%;
    }
    .col-3 {
      width: 25%;
    }
  }
`;

export const LogViewedDocsDialog = ({ id }) => {
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

  const fetchLogs = (pageValue = page, paramsValue = params) => {
    dispatch(
      getLogUsersViewdDoc(
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
    fetchLogs();
  }, []);

  return (
    <div className="pt-12 text-center mx-auto">
      <h3 className="text-xl text-center font-medium mb-2.5">
        Document View Log
      </h3>
      <Styles>
        <Table
          className="ip-table h-300px w-full"
          {...register}
          onLoadMore={fetchLogs}
          hasMore={hasMore}
          dataLength={data?.length}
        >
          <Table.Header>
            <Table.HeaderCell>
              <p>User</p>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <p>Date</p>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <p>Time</p>
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body className="lg:-mr-8 lg:pr-8">
            {data.map(row => (
              <Table.BodyRow className="py-4" key={`ip-${row.id}`}>
                <Table.BodyCell>
                  <p className="flex gap-1 items-center">
                    {row?.user?.email}
                    {row?.user?.profile?.status === 'approved' && (
                      <VerifiedIcon className="text-primary" />
                    )}
                  </p>
                </Table.BodyCell>
                <Table.BodyCell>
                  <p>{`${formatDate(row.created_at)} EST`}</p>
                </Table.BodyCell>
                <Table.BodyCell>
                  <p>{`${formatDate(row.created_at, 'HH:mm aa')} EST`}</p>
                </Table.BodyCell>
              </Table.BodyRow>
            ))}
          </Table.Body>
        </Table>
      </Styles>
    </div>
  );
};
