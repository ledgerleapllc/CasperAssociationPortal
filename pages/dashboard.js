import LayoutDashboard from '../components/layouts/layout-dashboard';
import { Card } from '../components/partials';
import InfoRight from '../components/dashboard/info-right';
import ContentHome from '../components/dashboard/content-home';

const Dashboard = () => (
  <LayoutDashboard>
    <div className="flex">
      <ContentHome />
      <Card>
        <div style={{ width: '310px' }}>
          <InfoRight />
        </div>
      </Card>
    </div>
  </LayoutDashboard>
);

export default Dashboard;
