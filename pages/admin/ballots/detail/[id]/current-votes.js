import router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import {
  Card,
  ClockBar,
  BackButton,
  ForAgainst,
  Table,
  StatusText,
} from '../../../../../components/partials';
import VerifiedIcon from '../../../../../public/images/ic_check_mark.svg';
import {
  getBallotDetail,
  getBallotVotes,
} from '../../../../../shared/redux-saga/admin/actions';
import { formatDate } from '../../../../../shared/core/utils';

const Styles = styled.div`
  .active-ballot-table {
    width: 100%;
    & > tr {
      td {
        vertical-align: top;
        padding-bottom: 30px;
      }
      td:nth-child(1) {
        width: 25%;
      }
      td:nth-child(2) {
        width: 75%;
      }
    }
  }
`;

const StylesVotes = styled.div`
  .active-votes-table {
    .col-1 {
      width: 30%;
    }
    .col-2 {
      width: 30%;
    }
    .col-3 {
      width: 30%;
    }
    .col-4 {
      width: 10%;
    }
  }
`;

const AdminActiveBallotCurrentVotes = () => {
  const [ballot, setBallot] = useState();
  const [votes, setVotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { id } = router.query;
  const dispatch = useDispatch();

  const fetchBallotVotes = () => {
    dispatch(
      getBallotVotes(
        {
          id,
          page,
        },
        (data, isHasMore) => {
          setHasMore(isHasMore);
          setVotes(prevVotes => [...prevVotes, ...data]);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    dispatch(
      getBallotDetail(id, res => {
        setBallot(res);
      })
    );
    fetchBallotVotes();
  }, [id]);

  const renderTimer = () => {
    if (
      ballot?.start_date &&
      ballot?.start_time &&
      ballot?.end_date &&
      ballot?.end_time
    ) {
      return (
        <ClockBar
          className="w-40"
          endTime={new Date(`${ballot?.end_date} ${ballot?.end_time}`)}
          startTime={new Date(`${ballot?.start_date} ${ballot?.start_time}`)}
        />
      );
    }
    return (
      <ClockBar
        className="w-40"
        endTime={new Date(ballot?.time_end)}
        startTime={new Date(ballot?.created_at)}
      />
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mt-4 mb-3">
              <BackButton
                href={`/admin/ballots/detail/${id}`}
                text="Back"
                force
              />
              <h3 className="text-dark2 text-lg font-medium">Current Votes</h3>
            </div>
          </div>
          <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
            <Styles className="lg:pr-card">
              <table className="active-ballot-table border-0">
                <tbody>
                  <tr>
                    <td valign="top">
                      <span>Ballot Title:</span>
                    </td>
                    <td valign="top">
                      <span>{ballot?.title}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <span>Start Time:</span>
                    </td>
                    <td valign="top">
                      <span>
                        {formatDate(
                          ballot?.created_at,
                          'dd/MM/yyyy - hh:mm aaa'
                        )}
                        {' EST'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <span>Time Remaining:</span>
                    </td>
                    <td valign="top">{ballot && renderTimer()}</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <span>Total Votes:</span>
                    </td>
                    <td valign="top">
                      <span>{ballot?.vote?.result_count}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <span>Split:</span>
                    </td>
                    <td valign="top">
                      <ForAgainst
                        splitFor={ballot?.vote?.for_value}
                        splitAgainst={ballot?.vote?.against_value}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <span>Final Result:</span>
                    </td>
                    <td valign="top">
                      {ballot?.status !== 'active' && (
                        <StatusText
                          content={ballot?.status}
                          className="uppercase"
                        />
                      )}
                      {ballot?.status === 'active' && '-'}
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </Styles>
            <StylesVotes className="lg:pr-card max-h-96">
              <Table
                className="active-votes-table pt-3 max-h-96"
                onLoadMore={fetchBallotVotes}
                hasMore={hasMore}
                dataLength={votes?.length}
              >
                <Table.Header>
                  <Table.HeaderCell key="header1">
                    <p className="py-2">User ID</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="header2">
                    <p className="py-2">Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="header3">
                    <p className="py-2">Time of Vote</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="header4">
                    <p className="py-2">Direction</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body className="padding-tracker">
                  {votes.map((row, ind) => (
                    <Table.BodyRow key={ind}>
                      <Table.BodyCell key="body1">
                        <p>{row.user_id}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body2">
                        <p className="flex gap-1 items-center">
                          {row?.user?.email}
                          {row?.user?.profile?.status === 'approved' && (
                            <VerifiedIcon className="text-primary" />
                          )}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body3">
                        <p>{`${formatDate(row.created_at, 'hh:mmaaa')}`}</p>
                        <p>{`${formatDate(row.created_at, 'dd/MM/yyyy')}`}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body4">
                        <StatusText className="capitalize" content={row.type} />
                      </Table.BodyCell>
                    </Table.BodyRow>
                  ))}
                </Table.Body>
              </Table>
            </StylesVotes>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  AdminActiveBallotCurrentVotes,
  'final-all',
  'ballots'
);
