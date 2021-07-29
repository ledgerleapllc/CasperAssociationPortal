import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { getListNotifications } from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Button, StatusText, Table } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';

const Notifications = styled.div`
  .notifications-table {
    .col-1 {
      width: 5%;
    }
    .col-2 {
      width: 10%;
    }
    .col-3 {
      width: 25%;
    }
    .col-4 {
      width: 10%;
    }
    .col-5 {
      width: 7%;
    }
    .col-6 {
      width: 8%;
    }
    .col-7 {
      width: 5%;
    }
    .col-8 {
      width: 10%;
    }
    .col-9 {
      width: 10%;
    }
    .col-10 {
      width: 10%;
    }
  }
`;

export const NotificationsTable = ({ hideOff, onChangeValue }) => {
  const dispatch = useDispatch();
  const {
    data,
    setParams,
    params,
    register,
    resetData,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage,
  } = useTable();
  const [totalMembers, setTotalMembers] = useState(null);

  const fetchNotification = (pageValue = page, paramsValue = params) => {
    dispatch(
      getListNotifications(
        { page: pageValue, ...paramsValue },
        (results, isHasMore, ids, total) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
          onChangeValue(ids);
          setTotalMembers(total);
        }
      )
    );
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    if (hideOff === 0 || hideOff === 1) {
      const newParams =
        hideOff === 1
          ? {
              setting: 1,
            }
          : {};
      setParams(newParams);
      resetData();
      fetchNotification(1, newParams);
    }
  }, [hideOff]);

  return (
    <Notifications className="h-full">
      <Table
        {...register}
        className="notifications-table pt-5 h-full"
        onLoadMore={fetchNotification}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell>
            <p>Alert ID</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Type</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Created</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Status</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Visibility</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>View %</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Auto Start <br /> Date
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Auto End <br /> Date
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="lg:-mr-24 lg:pr-24">
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell>
                <p>{row.id}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.type}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>
                  {row.created_at
                    ? formatDate(row.created_at, 'MM/dd/yyyy')
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell>
                <StatusText content={row.status} />
              </Table.BodyCell>
              <Table.BodyCell>
                <p className="capitalize">{row.visibility}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>
                  {!totalMembers || !row?.total_views
                    ? 0
                    : Math.round((row?.total_views / totalMembers) * 100)}
                </p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>
                  {row.start_date
                    ? formatDate(row.start_date, 'MM/dd/yyyy')
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>
                  {row.end_date ? formatDate(row.end_date, 'MM/dd/yyyy') : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell>
                <Link href={`notifications/detail/${row.id}`}>
                  <a>
                    <Button className="w-full" primary size="small">
                      Edit
                    </Button>
                  </a>
                </Link>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Notifications>
  );
};
