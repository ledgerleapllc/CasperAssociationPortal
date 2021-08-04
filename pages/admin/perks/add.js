import React, { useState } from 'react';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../components/partials';
import { PerkCard } from '../../../components/admin/perks/components/perk-card';
import { PerkPage } from '../../../components/admin/perks/components/perk-page';
import { PerkForm } from '../../../components/admin/perks/components/perk-form';

const AdminAddPerk = () => {
  const [value, setValue] = useState();

  const getValue = React.useCallback(val => {
    setValue(val);
  }, []);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-18 border-primary border-b-2">
            <BackButton href="/admin/perks" text="Cancel" force />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
              Add New Perk
            </h3>
          </div>
          <div className="card-body pt-5 pb-28 overflow-y-auto lg:h-100%-18 -ml-5 pl-5">
            <div className="lg:pr-24">
              <PerkForm onChange={getValue} />
              <div className="pt-10">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                  Card Preview
                </h3>
                <div className="border-primary border-b-2" />
                <div className="mt-4 w-120 max-w-full">
                  <PerkCard perk={value} preview />
                </div>
              </div>
              <div className="pt-10">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                  Page Preview
                </h3>
                <div className="border-primary border-b-2" />
                <div className="mt-4">
                  <PerkPage perk={value} preview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminAddPerk, 'final-all');
