import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import InfoRightHome from '../../components/dashboard/info-right-home';
import ContentHome from '../../components/dashboard/content-home';
import { LoadingScreen } from '../../components/hoc/loading-screen';

const Dashboard = () => (
  <LayoutDashboard>
    <div id="landing-page__dashboardInner3">
      <div id="landing-page__dashboardInner3_left">
        <ContentHome />
      </div>
      <div id="landing-page__dashboardInner3_right">
        <Card className="w-full h-full">
          <div className="overflow-y-scroll w-full h-full">
            <InfoRightHome />
          </div>
        </Card>
      </div>
    </div>
  </LayoutDashboard>
);

export default LoadingScreen(Dashboard, 'final-member');
