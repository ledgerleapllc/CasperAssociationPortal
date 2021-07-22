/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Card, Table } from '../../components/partials';
import { useTable } from '../../components/partials/table';
import AppFooter from '../../components/layouts/app-footer';
import { formatDate, getShortNodeAddress } from '../../shared/core/utils';
import { getPublicMembers } from '../../shared/redux-saga/member-viewer/actions';

const Styles = styled.div`
  .members-table {
    .col-1 {
      width: 20%;
    }
    .col-2 {
      width: 20%;
    }
    .col-3 {
      width: 12%;
    }
    .col-4 {
      width: 12%;
    }
    .col-5 {
      width: 13%;
    }
    .col-6 {
      width: 13%;
    }
    .col-7 {
      width: 10%;
    }
  }
`;

const MembersViewer = () => {
  const { data, register, hasMore, appendData, setHasMore, page, setPage } =
    useTable();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchMembers = (pageValue = page) => {
    dispatch(
      getPublicMembers({ page: pageValue }, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div
        className="
          h-screen
          flex flex-col w-full
          p-4
          lg:max-w-380 lg:p-9
          xl:max-w-screen-xl xl:p-9
          2xl:max-w-screen-2xl"
      >
        <Card className="lg:py-10 lg:shadow-2xl my-10 h-9/10" noShadow>
          <div className="bg-transparent h-full px-24">
            <div className="w-full" style={{ height: '70px' }}>
              <div className="lg:h-70px flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-2.5">
                    Members
                  </h3>
                  <p className="text-sm text-gray pb-3.5">
                    Click on a user to see more details
                  </p>
                </div>
                <Link href="/register-type">
                  <button
                    type="button"
                    className="transition text-lg text-white px-5 mb-2.5 w-auto h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Become a Member
                  </button>
                </Link>
              </div>
              <div className="border-primary border-b-2" />
            </div>
            <div
              className="flex w-full"
              style={{ height: 'calc(100% - 70px)' }}
            >
              <Styles className="h-full w-full">
                <Table
                  {...register}
                  className="members-table pt-10 h-full w-full"
                  onLoadMore={fetchMembers}
                  hasMore={hasMore}
                  dataLength={data.length}
                >
                  <Table.Header>
                    <Table.HeaderCell>
                      <p>Registration Date</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>Users Name</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>Member Type</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>Verified Status</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>Node Address</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>CSPR Delegated</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>Uptime</p>
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body>
                    {data.map((row, ind) => (
                      <Table.BodyRow
                        key={`a-${ind}`}
                        selectRowHandler={() =>
                          router.push(`/member-viewer/${row.id}`)
                        }
                      >
                        <Table.BodyCell>
                          <p>{formatDate(row.created_at, 'dd/MM/yyyy')}</p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <p className="truncate">{row.full_name}</p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <p className="capitalize">{row.type}</p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <p
                            className={
                              row.kyc_verified_at ? 'text-primary' : ''
                            }
                          >
                            {row.kyc_verified_at ? 'Verified' : 'Not Verified'}
                          </p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <p>{getShortNodeAddress(row.public_address_node)}</p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <p>2,000,200</p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <p>50 %</p>
                        </Table.BodyCell>
                      </Table.BodyRow>
                    ))}
                  </Table.Body>
                </Table>
              </Styles>
            </div>
          </div>
        </Card>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default MembersViewer;
