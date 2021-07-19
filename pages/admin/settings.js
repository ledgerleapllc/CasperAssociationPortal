/* eslint-disable arrow-body-style */
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';

const AdminDashboardSetting = () => {
  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <div className="flex justify-between items-end mb-3.5">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                Admin Settings
              </h3>
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pb-28 overflow-x-hidden overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <p>Settings</p>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminDashboardSetting, 'final-admin');
