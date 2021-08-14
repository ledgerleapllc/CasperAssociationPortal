import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { getListVerifications } from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Table } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';

const Styles = styled.div`
  .id-verfication-table {
    .col-1 {
      width: 20%;
    }
    .col-2 {
      width: 25%;
    }
    .col-3 {
      width: 15%;
    }
    .col-4 {
      width: 15%;
    }
    .col-5 {
      width: 15%;
    }
    .col-6 {
      width: 10%;
    }
  }
`;

export const IDverifications = () => {
  const dispatch = useDispatch();
  const { data, register, hasMore, appendData, setHasMore, page, setPage } =
    useTable();

  const fetchVerifications = () => {
    dispatch(
      getListVerifications({ page }, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="id-verfication-table pt-8 h-full"
        onLoadMore={fetchVerifications}
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
            <p>Type</p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              AML API <br /> Response
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              KYC API <br /> Response
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Action</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell>
                <p>{formatDate(new Date(row?.created_at))}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p className="truncate">{row.email}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p className="capitalize">{row?.type}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row?.background_checks_result ? 'OK' : 'Needs Review'}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p>{row?.kyc_status === 'approved' ? 'OK' : 'Needs Review'}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <Link href={`/admin/intake/verification/${row.user_id}`}>
                  <a className="text-primary cursor-pointer underline">
                    Review
                  </a>
                </Link>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};
