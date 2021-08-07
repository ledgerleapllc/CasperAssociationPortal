import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';
import { GeneralIntakes } from '../../../components/admin/intake/tables/general-intakes';
import { IDverifications } from '../../../components/admin/intake/tables/id-verifications';

const AdminIntake = () => (
  <LayoutDashboard>
    <Card className="h-full px-card py-7">
      <div className="bg-transparent h-1/2 xl:pb-2 2xl:pb-5">
        <div className="w-full h-70px">
          <div className="lg:h-70px flex flex-col justify-center">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-2.5">
              General Intake
            </h3>
            <p className="text-sm text-gray pb-3.5">
              New members needing approval
            </p>
            <div className="border-primary border-b-2" />
          </div>
        </div>
        <div className="flex flex-col h-100%-70px">
          <GeneralIntakes />
        </div>
      </div>
      <div className="bg-transparent h-1/2 xl:pt-2 2xl:pt-5">
        <div className="w-full h-70px">
          <div className="lg:h-70px flex flex-col justify-center">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-2.5">
              IDverification
            </h3>
            <p className="text-sm text-gray pb-3.5">
              Members wanting to get verified
            </p>
            <div className="border-primary border-b-2" />
          </div>
        </div>
        <div className="flex flex-col h-100%-70px">
          <IDverifications />
        </div>
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(AdminIntake, 'final-admin');
