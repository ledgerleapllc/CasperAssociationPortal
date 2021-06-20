import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';

const AdminIntake = () => (
  <LayoutDashboard>
    <Card className="h-full px-24 py-14">
      <div className="bg-transparent h-full">
        <div className="w-full">
          <div className="lg:h-70px flex flex-col justify-center">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              Intake
            </h3>
            <p className="text-sm text-gray pb-3.5">
              New members needing approval
            </p>
            <div className="border-primary border-b-2" />
          </div>
        </div>
        <div className="flex flex-col pt-4 h-full">
          <div className="flex flex-col lg:pt-6 h-full">
            <div className="flex w-full">
              <p className="w-1/6 text-base font-medium">Registration Date</p>
              <p className="w-1/6 text-base font-medium">Users Email</p>
              <p className="w-1/6 text-base font-medium">Node Operator KYC</p>
              <p className="w-1/6 text-base font-medium">
                Beneficial Owner KYC
              </p>
              <p className="w-1/6 text-base font-medium">
                # of Beneficial Owners
              </p>
              <p className="w-1/6 text-base font-medium">Unopened Invites</p>
            </div>
            <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
              <div className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray">
                <p className="text-sm w-full lg:w-1/6">23/07/2021</p>
                <p className="text-sm w-full lg:w-1/6">jimjones321@gmail.com</p>
                <p className="text-sm w-full lg:w-1/6">Approved</p>
                <p className="text-sm w-full lg:w-1/6">
                  <button
                    type="button"
                    className="text-lg text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Review
                  </button>
                </p>
                <p className="text-sm w-full lg:w-1/6">10</p>
                <p className="text-sm w-full lg:w-1/6">0</p>
              </div>
              <div className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray">
                <p className="text-sm w-full lg:w-1/6">23/07/2021</p>
                <p className="text-sm w-full lg:w-1/6">tonysoap254@yahoo.com</p>
                <p className="text-sm w-full lg:w-1/6">Approved</p>
                <p className="text-sm w-full lg:w-1/6">
                  <button
                    type="button"
                    className="text-lg text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Review
                  </button>
                </p>
                <p className="flex flex-col text-sm w-full lg:w-1/6">
                  3
                  <span className="text-sm text-primary underline">
                    Send Reminders
                  </span>
                </p>
                <p className="text-sm w-full lg:w-1/6">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(AdminIntake, 'final-admin');
