import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import InfoRightHome from '../../components/dashboard/info-right-home';
import ContentHome from '../../components/dashboard/content-home';
import { LoadingScreen } from '../../components/hoc/loading-screen';

const Dashboard = () => (
  <LayoutDashboard>
    <div className="flex gap-5 h:auto lg:h-full">
      <div className="w-4/5">
        <ContentHome />
      </div>
      <Card className="hidden lg:block h-full w-1/5">
        <div className="overflow-y-scroll h-full">
          <InfoRightHome />
        </div>
      </Card>
    </div>
  </LayoutDashboard>
);

export default LoadingScreen(Dashboard, 'final-member');
