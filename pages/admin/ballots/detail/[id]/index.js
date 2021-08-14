import router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { Card } from '../../../../../components/partials';
import { getBallotDetail } from '../../../../../shared/redux-saga/admin/actions';
import AdminActiveBallot from '../../../../../components/admin/ballots/detail/active-ballot';
import AdminCompleteBallot from '../../../../../components/admin/ballots/detail/complete-ballot';

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
