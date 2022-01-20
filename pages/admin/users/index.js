import router from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Table } from '../../../components/partials';
import { getListMembers } from '../../../shared/redux-saga/admin/actions';
import {
  formatDate,
  getShortNodeAddress,
  numberWithCommas,
} from '../../../shared/core/utils';
import { useTable } from '../../../components/partials/table';
import { LoadingScreen } from '../../../components/hoc/loading-screen';

const Styles = styled.div`
  .users-table {
    .col-1 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 9%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 7%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 16%;
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
      width: 13%;
      padding-right: 0 !important;
    }
    .col-8 {
      width: 8%;
      padding-right: 0 !important;
    }
    .col-9 {
      width: 10%;
      padding-right: 0 !important;
    }
    .col-10 {
      width: 12%;
      padding-right: 0 !important;
    }
  }
`;

const AdminUserList = () => {
  const {
    data,
    register,
    hasMore,
    appendData,
    resetData,
    setHasMore,
    page,
    setPage,
    params,
    setParams,
  } = useTable();
  const dispatch = useDispatch();

  const getMembers = (pageValue = page, paramsValue = params) => {
    dispatch(
      getListMembers(
        {
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
    getMembers();
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    getMembers(1, newParams);
  };

  return (
    <LayoutDashboard>
      <Card className="h-full px-card py-5">
        <div className="flex flex-col bg-transparent h-full">
          <div className="w-full flex flex-col justify-center">
            <div className="flex flex-col justify-between mt-4 h-11 mb-3">
              <h3 className="text-dark2 text-lg font-medium">User List</h3>
              <p className="text-sm text-gray">
                Click any user for more details
              </p>
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div
            className="pt-8 flex flex-col flex-1 min-h-0"
            style={{ overflowY: 'auto' }}
          >
            <Styles className="h-full">
              <Table
                {...register}
                className="users-table h-full"
                onLoadMore={getMembers}
                hasMore={hasMore}
                dataLength={data?.length}
                onSort={handleSort}
              >
                <Table.Header>
                  <Table.HeaderCell key="id" sortKey="id">
                    <p>User ID</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    key="membership_status"
                    sortKey="membership_status"
                  >
                    <p>
                      Membership
                      <br />
                      Status
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="node_status" sortKey="node_status">
                    <p>
                      Node
                      <br />
                      Status
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="email" sortKey="email">
                    <p>User Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="entity_name" sortKey="entity_name">
                    <p>Entity Name</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="full_name" sortKey="full_name">
                    <p>First/Last Name</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="node_address">
                    <p>Node Address</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    key="self_staked_amount"
                    sortKey="self_staked_amount"
                  >
                    <p>
                      CSPR
                      <br /> Delegated
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="created_at" sortKey="created_at">
                    <p>
                      Registration
                      <br /> Date
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="details">
                    <p>Further Details</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body className="custom-padding-tracker">
                  {data.map((row, ind) => (
                    <Table.BodyRow key={ind}>
                      <Table.BodyCell key="id">
                        <p>{row?.id}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="membership_status">
                        <p>{row?.membership_status}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="node_status">
                        <p>{row?.node_status}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="email">
                        <p className="truncate">{row?.email}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="entity_name">
                        <p className="truncate">
                          {row?.entity_name ? row?.entity_name : '-'}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell key="last_name">
                        <p className="truncate">
                          {row?.first_name} {row?.last_name}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell key="public_address">
                        <p>{getShortNodeAddress(row?.public_address_node)}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="self_staked_amount">
                        <p>{numberWithCommas(row.self_staked_amount)}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="created_at">
                        <p>{`${formatDate(row?.created_at)}`}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="action_button">
                        <button
                          type="button"
                          onClick={() => router.push(`/admin/users/${row?.id}`)}
                          className="px-4 py-1 text-sm text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                        >
                          View / Manage
                        </button>
                      </Table.BodyCell>
                    </Table.BodyRow>
                  ))}
                </Table.Body>
              </Table>
            </Styles>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminUserList, 'final-admin', 'users');
