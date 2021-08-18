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
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mt-4 mb-3">
              <BackButton href="/admin/perks" text="Cancel" force />
              <h3 className="text-dark2 text-lg font-medium">Add New Perk</h3>
            </div>
          </div>
          <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0 -ml-5 pl-5">
            <div className="lg:pr-card">
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
