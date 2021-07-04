import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Table } from '../../components/partials';
import { getListIntake } from '../../shared/redux-saga/admin/actions';
import { formatDate } from '../../shared/core/utils';
import { useTable } from '../../components/partials/table';

const Styles = styled.div`
  .intake-table {
    .col-1 {
      width: 13%;
    }
    .col-2 {
      width: 25%;
    }
    .col-3 {
      width: 10%;
    }
    .col-4 {
      width: 16%;
    }
    .col-5 {
      width: 16%;
    }
    .col-6 {
      width: 13%;
    }
    .col-7 {
      width: 7%;
    }
  }
`;

const AdminIntake = () => {
  const dispatch = useDispatch();
  const { data, register, hasMore, appendData, setHasMore, page, setPage } = useTable();

  const fetchIntakes = () => {
    dispatch(
      getListIntake({ page }, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchIntakes();
  }, []);

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                Intake
              </h3>
              <p className="text-sm text-gray pb-3.5">
                New members needing approval
              </p>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col h-5/6">
            <Styles className="h-full">
              <Table
                {...register}
                className="intake-table pt-10 h-full"
                onLoadMore={fetchIntakes}
                hasMore={hasMore}
                dataLength={data.length}
              >
                <Table.Header>
                  <Table.HeaderCell>
                    <p>Registration Date</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Users Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>
                      Letter of <br /> Motivation
                    </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Node Operator KYC</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Beneficial Owner KYC</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p># of Beneficial Owners</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>
                      Unopened <br /> Invites
                    </p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {data.map((row, ind) => (
                    <Table.BodyRow key={ind}>
                      <Table.BodyCell>
                        <p>{formatDate(new Date(row?.registration_date))}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="truncate">{row.email}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <a
                          href={`/${row.signed_file_url}`}
                          className="text-primary cursor-pointer underline"
                        >
                          View
                        </a>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <button
                          type="button"
                          className="text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                        >
                          Review
                        </button>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <button
                          type="button"
                          className="text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                        >
                          Review
                        </button>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>{row.beneficial_owners}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>{row.unopened_invites}</p>
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

export default LoadingScreen(AdminIntake, 'final-admin');
