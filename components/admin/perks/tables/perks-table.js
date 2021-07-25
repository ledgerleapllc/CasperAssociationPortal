import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { getListPerks } from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Button, StatusText, Table } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';

const Perks = styled.div`
  .perks-table {
    .col-1 {
      width: 10%;
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
      width: 10%;
    }
    .col-6 {
      width: 10%;
    }
    .col-7 {
      width: 10%;
    }
    .col-8 {
      width: 5%;
    }
    .col-9 {
      width: 10%;
    }
  }
`;

export const PerksTable = ({ hideOff }) => {
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

  const fetchPerks = (pageValue = page, paramsValue = params) => {
    dispatch(
      getListPerks(
        { page: pageValue, ...paramsValue },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchPerks();
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
      fetchPerks(1, newParams);
    }
  }, [hideOff]);

  return (
    <Perks className="h-full">
      <Table
        {...register}
        className="perks-table pt-5 h-full"
        onLoadMore={fetchPerks}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell>
            <p>Perk ID</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Created</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Start Perk</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Auto End Perk</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Status</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Visibility</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>CT#</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="lg:-mr-24 lg:pr-24">
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell>
                <p>{row.id}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{formatDate(row.created_at, 'MM/dd/yyyy')}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.title}</p>
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
                <StatusText content={row.status} />
              </Table.BodyCell>
              <Table.BodyCell>
                <p className="capitalize">{row.visibility}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row.total_clicks}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <Link href={`perks/detail/${row.id}`}>
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
    </Perks>
  );
};
