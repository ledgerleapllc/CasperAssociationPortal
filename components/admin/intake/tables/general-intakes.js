import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  getListIntake,
  resetUser,
  banUser,
  approveUser,
} from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Table } from '../../../partials';
import { LetterReviewDialog } from '../dialogs/letter-review';
import { useDialog } from '../../../partials/dialog';
import { formatDate } from '../../../../shared/core/utils';
import IconCheck from '../../../../public/images/ic-feather-check.svg';

const StylesIntake = styled.div`
  .intake-table {
    .col-1 {
      width: 25%;
    }
    .col-2 {
      width: 35%;
    }
    .col-3 {
      width: 15%;
    }
    .col-4 {
      width: 15%;
    }
    .col-5 {
      width: 10%;
    }
  }
`;

export const GeneralIntakes = () => {
  const { setDialog } = useDialog();
  const dispatch = useDispatch();
  const { data, register, hasMore, appendData, setHasMore, page, setPage } =
    useTable();

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

  const doBanUser = id => {
    dispatch(
      banUser(
        { id },
        () => {},
        () => {}
      )
    );
  };

  const doApproveUser = id => {
    dispatch(
      approveUser(
        { id },
        () => {},
        () => {}
      )
    );
  };

  const doResetUser = (id, message) => {
    dispatch(
      resetUser(
        { id, message },
        () => {},
        () => {}
      )
    );
  };

  const reviewIntake = row => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <LetterReviewDialog
            onResetUser={message => doResetUser(row.id, message)}
            onBanUser={() => doBanUser(row.id)}
            onApproveUser={() => doApproveUser(row.id)}
          />
        ),
      },
    });
  };

  return (
    <StylesIntake className="h-full">
      <Table
        {...register}
        className="intake-table pt-5 h-full"
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
              Signature <br /> Complete
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>
              Node Verification <br /> Complete
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <p>Letter of Motivation</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell>
                <p>{formatDate(new Date(row?.created_at))}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                <p className="truncate">{row.email}</p>
              </Table.BodyCell>
              <Table.BodyCell>
                {!!row.signature_request_id && (
                  <IconCheck className="text-primary" />
                )}
              </Table.BodyCell>
              <Table.BodyCell>
                {!!row.node_verified_at && (
                  <IconCheck className="text-primary" />
                )}
              </Table.BodyCell>
              <Table.BodyCell>
                <button
                  type="button"
                  onClick={() => reviewIntake(row)}
                  className="text-primary cursor-pointer underline disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!row.letter_file}
                >
                  Review
                </button>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </StylesIntake>
  );
};
