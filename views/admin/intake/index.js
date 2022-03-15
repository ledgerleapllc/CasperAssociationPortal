import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';
import { GeneralIntakes } from '../../../components/admin/intake/tables/general-intakes';
import { IDverifications } from '../../../components/admin/intake/tables/id-verifications';

const AdminIntake = () => (
  <LayoutDashboard>
    <Card className="h-full px-card py-5">
      <div className="flex flex-col bg-transparent h-1/2 xl:pb-5">
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-col justify-between h-11 mt-4 mb-3">
            <h3 className="text-dark2 text-lg font-medium">General Intake</h3>
            <p className="text-sm text-gray">New members needing approval</p>
          </div>
          <div className="border-primary border-b-2" />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <GeneralIntakes />
        </div>
      </div>
      <div className="flex flex-col bg-transparent h-1/2">
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-col justify-between h-11 mb-3">
            <h3 className="text-dark2 text-lg font-medium">ID verification</h3>
            <p className="text-sm text-gray">Members wanting to get verified</p>
          </div>
          <div className="border-primary border-b-2" />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <IDverifications />
        </div>
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(AdminIntake, 'final-admin', 'intake');
