import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getListNotifications } from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Button, StatusText, Table } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';

const Notifications = styled.div`
  .notifications-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 25%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 7%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 8%;
      padding-right: 0 !important;
    }
    .col-7 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-8 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-9 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-10 {
      width: 10%;
      padding-right: 0 !important;
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
                {row.created_at ? (
                  <p className="truncate">
                    {formatDate(row.created_at, 'dd/MM/yyyy')}
                    <br />
                    {formatDate(row.created_at, 'HH:mm aa')}
                  </p>
                ) : null}
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
                <p className="truncate">
                  {row.start_date
                    ? `${formatDate(row.start_date, 'dd/MM/yyyy')}`
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="end_date">
                <p className="truncate">
                  {row.end_date
                    ? `${formatDate(row.end_date, 'dd/MM/yyyy')}`
                    : ''}
                </p>
              </Table.BodyCell>
              <Table.BodyCell key="edit">
                <Link to={`/admin/settings/notifications/detail/${row.id}`}>
                  <span>
                    <Button className="w-full" primary size="small">
                      Edit
                    </Button>
                  </span>
                </Link>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Notifications>
  );
};
