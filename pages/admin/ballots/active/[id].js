import router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, ClockBar, BackButton } from '../../../../components/partials';
import {
  getBallotDetail,
  cancelBallot,
} from '../../../../shared/redux-saga/admin/actions';
import { useDialog } from '../../../../components/partials/dialog';

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

const AdminActiveBallot = () => {
  const [ballot, setBallot] = useState();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { setDialog } = useDialog();

  useEffect(() => {
    dispatch(
      getBallotDetail(id, res => {
        setBallot(res);
      })
    );
  }, [id]);

  const doCancelBallot = () => {
    setDialog({
      type: 'DialogConfirm',
      data: {
        title: 'Are you sure?',
        content:
          'Canceling this will close the vote and record this as a “canceled” ballot',
        ok: 'Yes, cancel this ballot',
        cancel: 'No, leave the vote open',
      },
      afterClosed: res => {
        if (res) {
          dispatch(
            cancelBallot(id, () => {
              router.push('/admin/ballots');
            })
          );
        }
      },
    });
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton href="/admin/ballots" text="Back" />
            <div className="flex justify-between items-center mb-3.5">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                Manage Active Ballot
              </h3>
              <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end">
                <button
                  type="button"
                  className="lg:mr-5 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  View Current Votes
                </button>
                <button
                  type="button"
                  className="h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  onClick={doCancelBallot}
                >
                  Cancel Ballot
                </button>
              </div>
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
                    <span>Time Remaining:</span>
                  </td>
                  <td>
                    {ballot && (
                      <ClockBar
                        className="w-40"
                        endTime={new Date(ballot.time_end)}
                        startTime={new Date(ballot.created_at)}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Ballot Text:</span>
                  </td>
                  <td>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ballot?.description,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Files Attached:</span>
                  </td>
                  <td>
                    <ul>
                      {ballot?.files?.map((file, ind) => (
                        <li className="flex pb-2" key={`file-${ind}`}>
                          <p className="w-52">{file.name}</p>
                          <a className="text-primary">View</a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </table>
            </Styles>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminActiveBallot, 'final-all');
