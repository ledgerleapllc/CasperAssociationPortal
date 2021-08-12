import { PerksPreview } from '../../../components/admin/perks/tables/perks-previews';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';

const DashboardMemberPerks = () => (
  <LayoutDashboard>
    <Card className="h-full px-card py-7 lg:shadow-2xl" noShadow>
      <div className="flex flex-col h-full w-full">
        <div className="lg:mr-card lg:h-40px flex flex-col justify-center">
          <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-2">
            Member Perks
          </h3>
          <div className="border-primary border-b-2" />
        </div>
        <div className="flex flex-col lg:h-100%-40px">
          <p className="py-4">
            Welcome Casper Association member. The following perks are available
            to you. Click any to learn more. Thanks for being a member in good
            standing with the association.
          </p>
          <div className="flex-1 min-h-0 lg:pr-card flex">
            <PerksPreview />
          </div>
        </div>
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(
  withPageRestricted(DashboardMemberPerks, 'perks'),
  'final-all'
);
