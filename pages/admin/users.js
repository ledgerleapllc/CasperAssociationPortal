import router from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Table } from '../../components/partials';
import { getListMembers } from '../../shared/redux-saga/admin/actions';
import { formatDate, getShortNodeAddress } from '../../shared/core/utils';

const Styles = styled.div`
  .members-table {
    .col-1 {
      width: 8%;
    }
    .col-2 {
      width: 9%;
    }
    .col-3 {
      width: 20%;
    }
    .col-4 {
      width: 10%;
    }
    .col-5 {
      width: 10%;
    }
    .col-6 {
      width: 13%;
    }
    .col-7 {
      width: 8%;
    }
    .col-8 {
      width: 10%;
    }
    .col-9 {
      width: 12%;
    }
  }
`;

const AdminUserList = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getMembers = () => {
    dispatch(
      getListMembers(
        {
          page,
        },
        (data, isHasMore) => {
          setHasMore(isHasMore);
          setMembers(prevMembers => [...prevMembers, ...data]);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14 overflow-auto">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                User List
              </h3>
              <p className="text-sm text-gray pb-3.5">
                Click any user for more details
              </p>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col h-5/6">
            <Styles className="h-full">
              <Table
                className="members-table pt-3 h-full"
                onLoadMore={getMembers}
                hasMore={hasMore}
                dataLength={members?.length}
              >
                <Table.Header>
                  <Table.HeaderCell>
                    <p>User ID</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>
                      Membership <br /> Status
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>User Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Entity Name</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>First/Last Name</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Node Address</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>
                      CSPR
                      <br /> Delegated
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>
                      Registration
                      <br /> Date
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Further Details</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {members.map((row, ind) => (
                    <Table.BodyRow key={ind}>
                      <Table.BodyCell>
                        <p>{row?.id}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>{row?.member_status}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="truncate">{row?.email}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="truncate">
                          {row?.entity_name ? row?.entity_name : '-'}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="truncate">
                          {row?.first_name} {row?.last_name}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>{getShortNodeAddress(row?.public_address_node)}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>2,000,250</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>{formatDate(row?.created_at)}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <button
                          type="button"
                          onClick={() => router.push(`/admin/users/${row?.id}`)}
                          className="px-4 py-1 text-sm text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                        >
                          View/Manage
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

export default AdminUserList;
