import React, { useState, useEffect } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, BackButton, Button } from '../../../components/partials';
import { PerkPage } from '../../../components/admin/perks/components/perk-page';
import { getActivePerkDetail } from '../../../shared/redux-saga/admin/actions';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';

const PerkDetail = () => {
  const [currentPerk, setCurrentPerk] = useState();
  const { id } = router.query;
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo?.fullInfo);

  useEffect(() => {
    dispatch(
      getActivePerkDetail(
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
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-card lg:h-40px">
            <div className="mb-2 flex justify-between items-center">
              <BackButton
                href={
                  user.role === 'member' ? `/dashboard/perks` : `/admin/perks`
                }
                text="Back"
                force
              />
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pb-10 overflow-y-auto lg:h-100%-40px">
            <div className="lg:pr-card">
              <PerkPage perk={currentPerk} hideTime />
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  withPageRestricted(PerkDetail, 'perks'),
  'final-all'
);
