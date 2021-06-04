import LayoutDashboard from '../components/layouts/layout-dashboard';
import { Card } from '../components/partials';
import InfoRight from '../components/dashboard/info-right';
import ContentHome from '../components/dashboard/content-home';

const Dashboard = () => (
  <LayoutDashboard>
    <div className="flex h:auto md:h-full">
      <ContentHome />
      <Card className="hidden md:block h-full">
        <div className="overflow-y-scroll h-full w-80">
          <InfoRight />
        </div>
      </Card>
    </div>
  </LayoutDashboard>
);

export default Dashboard;
