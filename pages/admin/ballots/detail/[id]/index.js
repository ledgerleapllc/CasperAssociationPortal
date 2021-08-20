import router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { BackButton, Button, Card } from '../../../../../components/partials';
import { getBallotDetail } from '../../../../../shared/redux-saga/admin/actions';
import ActiveBallot from '../../../../../components/dashboard/ballots/detail/active-ballot';
import CompleteBallot from '../../../../../components/dashboard/ballots/detail/complete-ballot';
import { useDialog } from '../../../../../components/partials/dialog';
import { AppContext } from '../../../../_app';
import { cancelBallot } from '../../../../../shared/redux-saga/admin/middlewares';

const AdminActiveBallot = ({ ballot }) => {
  const dispatch = useDispatch();
  const { setDialog } = useDialog();
  const { setLoading } = useContext(AppContext);

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
          setLoading(true);
          dispatch(
            cancelBallot(
              ballot?.id,
              () => {
                router.push('/admin/ballots');
                setLoading(false);
              },
              () => {
                setLoading(false);
              }
            )
          );
        }
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="card-header lg:mr-card border-primary border-b-2">
        <div className="flex justify-between items-center mb-3">
          <div className="h-11 mt-4">
            <BackButton href="/admin/ballots" text="Back" force />
            <h3 className="text-dark2 text-lg lg:pr-32 font-medium">
              Manage Active Ballot
            </h3>
          </div>
          <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end">
            <Link href={`/admin/ballots/detail/${ballot?.id}/current-votes`}>
              <button
                type="button"
                className="lg:mr-5 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              >
                View Current Votes
              </button>
            </Link>
            <button
              type="button"
              className="h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              onClick={doCancelBallot}
            >
              Cancel Ballot
            </button>
          </div>
        </div>
      </div>
      <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
        <ActiveBallot ballot={ballot} />
      </div>
    </div>
  );
};

const AdminCompleteBallot = ({ ballot }) => (
  <div className="h-full flex flex-col">
    <div className="card-header lg:mr-card border-primary border-b-2">
      <div className="flex justify-between items-center mb-3">
        <div className="h-11 mt-4">
          <BackButton href="/admin/ballots" text="Back" force />
          <h3 className="text-dark2 text-lg lg:pr-32 font-medium">
            Completed Ballot
          </h3>
        </div>
        <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end">
          <Link href={`/admin/ballots/detail/${ballot?.id}/current-votes`}>
            <Button primary>View Voting Records</Button>
          </Link>
        </div>
      </div>
    </div>
    <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
      <CompleteBallot ballot={ballot} />
    </div>
  </div>
);

const AdminBallotDetail = () => {
  const [ballot, setBallot] = useState();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBallotDetail(id, res => {
        setBallot(res);
      })
    );
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          {ballot && ballot.status === 'active' && (
            <AdminActiveBallot ballot={ballot} />
          )}
          {ballot && ballot.status !== 'active' && (
            <AdminCompleteBallot ballot={ballot} />
          )}
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminBallotDetail, 'final-all');
