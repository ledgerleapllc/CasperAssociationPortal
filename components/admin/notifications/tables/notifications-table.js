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
          <Table.HeaderCell key="id">
            <p>Alert ID</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="type">
            <p>Type</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="title">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="created">
            <p>Created</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="status">
            <p>Status</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="visibility">
            <p>Visibility</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="percentage">
            <p>View %</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="auto_start_date">
            <p>
              Auto Start <br /> Date
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="auto_end_date">
            <p>
              Auto End <br /> Date
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="action">
            <p>Admin Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell key="id">
                <p>{row.id}</p>
              </Table.BodyCell>
              <Table.BodyCell key="type">
                <p>{row.type}</p>
              </Table.BodyCell>
              <Table.BodyCell key="title">
                <p>{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="created_at">
                <p>
                  {row.created_at
                    ? `${formatDate(row.created_at, 'dd/MM/yyyy')} EST`
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="status">
                <StatusText content={row.status} />
              </Table.BodyCell>
              <Table.BodyCell key="visibility">
                <p className="capitalize">{row.visibility}</p>
              </Table.BodyCell>
              <Table.BodyCell key="total_views">
                <p>
                  {!totalMembers || !row?.total_views
                    ? 0
                    : Math.round((row?.total_views / totalMembers) * 100)}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="start_date">
                <p>
                  {row.start_date
                    ? `${formatDate(row.start_date, 'dd/MM/yyyy')} EST`
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="end_date">
                <p>
                  {row.end_date
                    ? `${formatDate(row.end_date, 'dd/MM/yyyy')} EST`
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="edit">
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
