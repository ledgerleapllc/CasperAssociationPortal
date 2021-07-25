import React, { useState, useEffect } from 'react';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../../components/partials';
import { PerkCard } from '../../../../../components/admin/perks/components/perk-card';
import { PerkPage } from '../../../../../components/admin/perks/components/perk-page';
import { PerkForm } from '../../../../../components/admin/perks/components/perk-form';
import { getPerkDetail } from '../../../../../shared/redux-saga/admin/actions';
import { PerksEngagement } from '../../../../../components/admin/perks/tables/perk-engagement';

const AdminEditPerk = () => {
  const [value, setValue] = useState();
  const [editing, setEditing] = useState();
  const [currentPerk, setCurrentPerk] = useState();
  const { id } = router.query;
  const dispatch = useDispatch();

  const getValue = React.useCallback(val => {
    setValue(val);
  }, []);

  const handleEditing = React.useCallback(val => {
    setEditing(val);
  }, []);

  useEffect(() => {
    dispatch(
      getPerkDetail(
        { id },
        res => {
          setCurrentPerk(res);
        },
        () => {}
      )
    );
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton href="/admin/perks" text="Cancel" force />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              {editing ? 'Editing Perk' : 'Edit Perk'}
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-5 pb-28 overflow-y-auto lg:h-100%-70px -ml-5 pl-5">
            <div className="lg:pr-24">
              <PerkForm
                onChange={getValue}
                value={currentPerk}
                editMode
                onEditing={handleEditing}
              />
              <div className="pt-10">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                  Card Preview
                </h3>
                <div className="border-primary border-b-2" />
                <div
                  className="mt-4"
                  style={{ width: '400px', maxWidth: '100%' }}
                >
                  <PerkCard perk={value} />
                </div>
              </div>
              <div className="pt-10">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                  Page Preview
                </h3>
                <div className="border-primary border-b-2" />
                <div className="mt-4">
                  <PerkPage perk={value} />
                </div>
              </div>
              <div className="pt-10">
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                  Engagement
                </h3>
                <div className="border-primary border-b-2" />
                <div className="mt-4">
                  <p>
                    Views: <b>{currentPerk?.total_views}</b>
                  </p>
                  <p>
                    Clicks: <b>{currentPerk?.total_clicks}</b>
                  </p>
                </div>
                <div className="mt-4 h-72">
                  <PerksEngagement id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminEditPerk, 'final-all');
