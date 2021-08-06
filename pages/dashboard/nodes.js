import { Card } from '../../components/partials';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import InfoRightNode from '../../components/dashboard/info-right-node';
import ContentNode from '../../components/dashboard/content-node';
import { LoadingScreen } from '../../components/hoc/loading-screen';

const DashboardNode = () => (
  <LayoutDashboard>
    <div className="flex h:auto lg:h-full">
      <ContentNode />
      <Card className="hidden lg:block h-full">
        <div className="py-5 pl-5 h-full">
          <InfoRightNode />
        </div>
      </Card>
    </div>
  </LayoutDashboard>
);

export default LoadingScreen(DashboardNode, 'final-all');
