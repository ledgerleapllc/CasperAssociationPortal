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
import { getBallotDetail } from '../../../../../shared/redux-saga/admin/actions';
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
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBallotDetail(id, res => {
        setBallot(res);
        setVotes(res.vote_results);
      })
    );
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton
              href={`/admin/ballots/detail/${id}`}
              text="Back"
              force
            />
            <div className="flex justify-between items-center mb-3.5">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                Current Votes
              </h3>
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <Styles className="lg:pr-24">
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
                        splitFor={ballot?.split_for}
                        splitAgainst={ballot?.split_against}
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
            <StylesVotes className="lg:pr-24">
              <Table
                className="active-votes-table pt-3"
                onLoadMore={() => {}}
                hasMore={false}
                dataLength={votes.length}
                height={300}
              >
                <Table.Header>
                  <Table.HeaderCell>
                    <p>User ID</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Time of Vote</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Direction</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body>
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
