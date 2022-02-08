import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import {
  getListPerks,
  deletePerk,
} from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Button, StatusText, Table } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';
import { useDialog } from '../../../partials/dialog';
import { AppContext } from '../../../../pages/_app';

const Perks = styled.div`
  .perks-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 8%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 22%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-7 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-8 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-9 {
      width: 15%;
      padding-right: 0 !important;
    }
  }
`;

export const PerksTable = ({ hideOff }) => {
  const { setLoading } = useContext(AppContext);
  const dispatch = useDispatch();
  const { setDialog, onClosed } = useDialog();
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

  // Render Start Date
  const renderStartDate = row => {
    if (row.start_date && row.start_time) {
      return (
        <>
          <p>{`${formatDate(
            `${row.start_date} ${row.start_time}`,
            'dd/MM/yyyy'
          )}`}</p>
          <p>{`${formatDate(
            `${row.start_date} ${row.start_time}`,
            'HH:mm aa'
          )} EST`}</p>
        </>
      );
    }
    if (row.start_date) {
      return `${formatDate(row.start_date, 'dd/MM/yyyy')}`;
    }
    return '';
  };

  // Render End Date
  const renderEndDate = row => {
    if (row.end_date && row.end_time) {
      return (
        <>
          <p>{`${formatDate(
            `${row.end_date} ${row.end_time}`,
            'dd/MM/yyyy'
          )}`}</p>
          <p>{`${formatDate(
            `${row.end_date} ${row.end_time}`,
            'HH:mm aa'
          )} EST`}</p>
        </>
      );
    }
    if (row.end_date) {
      return `${formatDate(row.end_date, 'dd/MM/yyyy')}`;
    }
    return '';
  };

  //
  const doConfirm = id => {
    setLoading(true);
    dispatch(
      deletePerk(
        { id },
        () => {
          setLoading(false);
          const newParams =
            hideOff === 1
              ? {
                  setting: 1,
                }
              : {};
          setParams(newParams);
          resetData();
          fetchPerks(1, newParams);
          onClosed();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  // Delete Perk
  const clickDeletePerk = id => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <div
            className="text-center mx-auto py-20"
            style={{ maxWidth: '26rem' }}
          >
            <h3 className="text-xl text-center mb-2.5">
              Are you sure you are going to delete perk?
            </h3>
            <div className="mt-8 flex justify-center gap-5 items-center">
              <button
                type="button"
                className="outline-none rounded-full h-24 w-24 font-normal border-transparent hover:opacity-40 text-white bg-primary"
                onClick={() => doConfirm(id)}
              >
                Confirm
              </button>
              <button
                type="button"
                className="px-5 outline-none rounded-full h-24 w-24 font-normal bg-transparent hover:opacity-40 text-primary border border-primary"
                onClick={() => onClosed()}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
      },
    });
  };

  return (
    <Perks className="h-full" style={{ overflowY: 'hidden' }}>
      <Table
        {...register}
        className="perks-table pt-5 h-full"
        onLoadMore={fetchPerks}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell key="header1">
            <p>Perk ID</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header2">
            <p>Created</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header3">
            <p>Title</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header4">
            <p>Start Perk</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header5">
            <p>Auto End Perk</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header6">
            <p>Status</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header7">
            <p>Visibility</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header8">
            <p>CT#</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="header9">
            <p>Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell key="body1">
                <p>{row.id}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body2">
                <p>{`${formatDate(row.created_at, 'dd/MM/yyyy')}`}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body3">
                <p>{row.title}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body4">
                <p>{renderStartDate(row)}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body5">
                <p>{renderEndDate(row)}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body6">
                <StatusText content={row.status} />
              </Table.BodyCell>
              <Table.BodyCell key="body7">
                <p className="capitalize">{row.visibility}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body8">
                <p>{row.total_clicks}</p>
              </Table.BodyCell>
              <Table.BodyCell key="body9">
                <div className="flex">
                  <Link href={`/admin/perks/detail/${row.id}`}>
                    <a>
                      <Button className="w-full" primary size="small">
                        Edit
                      </Button>
                    </a>
                  </Link>
                  <Button
                    style={{ marginLeft: '5px' }}
                    primary
                    size="small"
                    onClick={() => clickDeletePerk(row.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Perks>
  );
};
