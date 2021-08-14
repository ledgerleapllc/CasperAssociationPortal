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

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mb-3">
              <BackButton
                href={`/admin/ballots/detail/${id}`}
                text="Back"
                force
              />
              <h3 className="text-dark2 text-xl font-medium">Current Votes</h3>
            </div>
          </div>
          <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
            <Styles className="lg:pr-card">
              <table className="active-ballot-table border-0">
                <tr>
                  <td>
                    <span>Ballot Title:</span>
                  </td>
                  <td>
                    <span>{ballot?.title}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Start Time:</span>
                  </td>
                  <td>
                    <span>
                      {formatDate(ballot?.created_at, 'dd/MM/yyyy - hh:mm aaa')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Time Remaining:</span>
                  </td>
                  <td>
                    {ballot && (
                      <ClockBar
                        className="w-40"
                        endTime={new Date(ballot?.time_end)}
                        startTime={new Date(ballot?.created_at)}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Total Votes:</span>
                  </td>
                  <td>
                    <span>{ballot?.vote?.result_count}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Split:</span>
                  </td>
                  <td>
                    <p>
                      <ForAgainst
                        splitFor={ballot?.vote?.for_value}
                        splitAgainst={ballot?.vote?.against_value}
                      />
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Final Result:</span>
                  </td>
                  <td>
                    {ballot?.status !== 'active' && (
                      <StatusText
                        content={ballot?.status}
                        className="uppercase"
                      />
                    )}
                    {ballot?.status === 'active' && '-'}
                  </td>
                </tr>
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
                  <Table.HeaderCell>
                    <p className="py-2">User ID</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p className="py-2">Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p className="py-2">Time of Vote</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p className="py-2">Direction</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body className="padding-tracker">
                  {votes.map((row, ind) => (
                    <Table.BodyRow key={ind}>
                      <Table.BodyCell>
                        <p>{row.user_id}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="truncate">{row.user.email}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p>{formatDate(row.created_at, 'hh:mmaaa')}</p>
                        <p>{formatDate(row.created_at, 'dd/MM/yyyy')}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
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

export default LoadingScreen(AdminActiveBallotCurrentVotes, 'final-all');
