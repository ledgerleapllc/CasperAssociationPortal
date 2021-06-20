import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import InfoRightHome from '../../components/dashboard/info-right-home';
import ContentHome from '../../components/dashboard/content-home';
import AppLoading from '../../components/layouts/app-loading';
import { LoadingScreen } from '../../components/hoc/loading-screen';

const Dashboard = () => (
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

export default LoadingScreen(Dashboard, 'final-member');
