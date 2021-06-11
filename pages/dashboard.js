import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutDashboard from '../components/layouts/layout-dashboard';
import { Card } from '../components/partials';
import InfoRightHome from '../components/dashboard/info-right-home';
import ContentHome from '../components/dashboard/content-home';
import { getDashboardDataDemo } from '../shared/redux-saga/dashboard/dashboard-actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  // const dataDemo = useSelector(state => state.demoDataReducer.data);
  useEffect(() => {
    dispatch(getDashboardDataDemo());
  }, []);

  return (
    <LayoutDashboard>
      <div className="flex h:auto lg:h-full">
        <ContentHome />
        <Card className="hidden lg:block h-full">
          <div className="overflow-y-scroll h-full w-80">
            <InfoRightHome />
          </div>
        </Card>
      </div>
    </LayoutDashboard>
  );
};

export default Dashboard;
