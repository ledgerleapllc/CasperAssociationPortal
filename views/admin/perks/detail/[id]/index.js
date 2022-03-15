import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../../components/partials';
import { PerkCard } from '../../../../../components/admin/perks/components/perk-card';
import { PerkPage } from '../../../../../components/admin/perks/components/perk-page';
import { PerkForm } from '../../../../../components/admin/perks/components/perk-form';
import { getPerkDetail } from '../../../../../shared/redux-saga/admin/actions';
import { PerksEngagement } from '../../../../../components/admin/perks/tables/perk-engagement';
import { AppContext } from '../../../../../pages/_app';

const AdminEditPerk = () => {
  const [value, setValue] = useState();
  const [editing, setEditing] = useState();
  const [currentPerk, setCurrentPerk] = useState();
  const routerParams = useParams();
  const { id } = routerParams;
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  const getValue = React.useCallback(val => {
    setValue(val);
  }, []);

  const handleEditing = React.useCallback(val => {
    setEditing(val);
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getPerkDetail(
        { id },
        res => {
          setLoading(false);
          setCurrentPerk(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mt-4 mb-3">
              <BackButton href="/admin/perks" text="Cancel" force />
              <h3 className="text-dark2 text-lg font-medium">
                {editing ? 'Editing Perk' : 'Edit Perk'}
              </h3>
            </div>
          </div>
          <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0 -ml-5 pl-5">
            <div className="lg:pr-card">
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
                <div className="mt-4 w-120 max-w-full">
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
                    Total Views: <b>{currentPerk?.total_views}</b>
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

export default LoadingScreen(AdminEditPerk, 'final-all', 'perks');
