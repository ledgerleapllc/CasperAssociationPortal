import Switch from 'react-switch';
import Link from 'next/link';
import { useState } from 'react';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';
import { PerksTable } from '../../../components/admin/perks/tables/perks-table';
import { PerksPreview } from '../../../components/admin/perks/tables/perks-previews';

const AdminPerks = () => {
  const [hideOff, setHideOff] = useState(false);

  return (
    <LayoutDashboard>
      <Card className="h-full px-card py-5">
        <div className="bg-transparent h-3/5 2xl:pb-5">
          <div className="w-full h-70px">
            <div className="h-70px flex flex-col justify-center">
              <div className="flex justify-between pb-3">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-2.5">
                  Perks
                </h3>
                <Link href="/admin/perks/add">
                  <button
                    type="button"
                    className="transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    + New Perk
                  </button>
                </Link>
              </div>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="h-30px flex justify-between items-center">
            <h4 className="text-dark2 text-lg font-medium">Manage Perks</h4>
            <div className="flex items-center gap-4">
              <span>Hide OFF</span>
              <Switch
                onChange={check => setHideOff(check ? 1 : 0)}
                checked={hideOff}
                checkedIcon={null}
                uncheckedIcon={null}
                offColor="#bbb"
                onColor="#ff474e"
                height={18}
                width={40}
              />
            </div>
          </div>
          <div className="flex flex-col h-100%-100px">
            <PerksTable hideOff={hideOff} />
          </div>
        </div>
        <div className="bg-transparent h-2/5 xl:pt-2 2xl:pt-5">
          <div className="w-full h-40px flex flex-col justify-end">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-2.5">
              Preview
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="flex flex-col h-100%-40px">
            <PerksPreview />
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminPerks, 'final-admin');
