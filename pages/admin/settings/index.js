import Link from 'next/link';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';

const Settings = () => (
  <LayoutDashboard>
    <Card className="h-full px-24 py-7">
      <div className="bg-transparent h-full">
        <div className="w-full h-70px">
          <div className="lg:h-70px flex flex-col justify-center">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-6">
              Admin settings
            </h3>
            <div className="border-primary border-b-2" />
          </div>
        </div>
        <div className="flex flex-col h-100%-70px">
          <p>Settings</p>
          <Link href="/admin/settings/emailer">
            <button
              type="button"
              className="mt-5 transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            >
              Access mailer
            </button>
          </Link>
        </div>
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(Settings, 'final-admin');
