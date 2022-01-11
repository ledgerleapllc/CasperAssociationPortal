import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  getListIntake,
  resetUser,
  banUser,
  approveUser,
  removeIntake,
} from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Table } from '../../../partials';
import { LetterReviewDialog } from '../dialogs/letter-review';
import { RemoveIntakeDialog } from '../dialogs/remove-intake';
import { useDialog } from '../../../partials/dialog';
import { formatDate } from '../../../../shared/core/utils';
import IconCheck from '../../../../public/images/ic-feather-check.svg';
import { AppContext } from '../../../../pages/_app';

const StylesIntake = styled.div`
  .intake-table {
    .col-1 {
      width: 25%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 35%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 15%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 10%;
      padding-right: 0 !important;
    }
  }
`;

export const GeneralIntakes = () => {
  const { setDialog, onClosed } = useDialog();
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const {
    data,
    setData,
    register,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage,
  } = useTable();

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

  const doBanUser = (id, index) => {
    setLoading(true);
    dispatch(
      banUser(
        { id },
        () => {
          data.splice(index, 1);
          setData([...data]);
          onClosed();
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const doApproveUser = (id, index) => {
    setLoading(true);
    dispatch(
      approveUser(
        { id },
        () => {
          data[index].letter_verified_at = true;
          setData([...data]);
          onClosed();
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const doResetUser = (id, message, index) => {
    setLoading(true);
    dispatch(
      resetUser(
        { id, message },
        () => {
          data[index].letter_file = null;
          setData([...data]);
          onClosed();
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const reviewIntake = (row, ind) => {
    window.open(`${row.letter_file_url}`, '_blank');
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <LetterReviewDialog
            onResetUser={message => doResetUser(row.id, message, ind)}
            onBanUser={() => doBanUser(row.id, ind)}
            onApproveUser={() => doApproveUser(row.id, ind)}
          />
        ),
      },
    });
  };

  const doRemoveIntake = (row, index) => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <RemoveIntakeDialog
            email={row?.email}
            removeIntake={() => {
              setLoading(true);
              dispatch(
                removeIntake(
                  { id: row.id },
                  () => {
                    data.splice(index, 1);
                    setData([...data]);
                    onClosed();
                    setLoading(false);
                  },
                  () => {
                    setLoading(false);
                  }
                )
              );
            }}
            cancel={() => {
              onClosed();
            }}
          />
        ),
      },
    });
  };

  return (
    <StylesIntake className="h-full">
      <Table
        {...register}
        className="intake-table pt-8 h-full"
        onLoadMore={fetchIntakes}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell key="registrationDate">
            <p>Registration Date</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="usersEmail">
            <p>Users Email</p>
          </Table.HeaderCell>
          <Table.HeaderCell key="esignatureComplete">
            <p>
              E-signature <br /> Complete
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="nodeVerificationComplete">
            <p>
              Node Verification <br /> Complete
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell key="letterMotivation">
            <p>Letter of Motivation</p>
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body className="padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow key={ind}>
              <Table.BodyCell key="createdData">
                <p>{formatDate(new Date(row?.created_at))}</p>
              </Table.BodyCell>
              <Table.BodyCell key="email">
                <p className="truncate">{row.email}</p>
              </Table.BodyCell>
              <Table.BodyCell key="signatureRequest">
                {!!row.signature_request_id && (
                  <IconCheck className="text-primary" />
                )}
              </Table.BodyCell>
              <Table.BodyCell key="verifiedAt">
                {!!row.node_verified_at && (
                  <IconCheck className="text-primary" />
                )}
              </Table.BodyCell>
              <Table.BodyCell key="letterAt">
                {row.letter_verified_at ? (
                  <IconCheck className="text-primary" />
                ) : (
                  <div className="flex gap-5">
                    <button
                      type="button"
                      onClick={() => reviewIntake(row, ind)}
                      className="text-primary cursor-pointer underline disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={!row.letter_file}
                    >
                      Review
                    </button>
                    <button
                      type="button"
                      onClick={() => doRemoveIntake(row, ind)}
                      className="text-primary cursor-pointer underline disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </StylesIntake>
  );
};
