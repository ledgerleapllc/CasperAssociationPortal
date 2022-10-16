import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import InfoRightAdminHome from '../../components/admin/info-right-admin-home';
import ContentAdminHome from '../../components/admin/content-admin-home';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { getAdminDashboard } from '../../shared/redux-saga/admin/actions';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState();

  const fetchStats = timeframe => {
    dispatch(
      getAdminDashboard(
        timeframe,
        res => {
          res.avgBlockHeightAverage =
            res.avgBlockHeightAverage <= 100 ? res.avgBlockHeightAverage : 100;
          res.avgUpdateResponsiveness =
            res.avgUpdateResponsiveness <= 100
              ? res.avgUpdateResponsiveness
              : 100;
          res.avgUptime = res.avgUptime <= 100 ? res.avgUptime : 100;
          setStats(res);
        },
        () => {}
      )
    );
  };

  return (
    <>
      <Head>
        <title>Dashboard - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="w-full h-full flex gap-5 layout-dashboard-inner">
          <div className="w-4/5 h-full">
            <ContentAdminHome stats={stats} changeFrame={fetchStats} />
          </div>
          <div className="w-1/5 h-full">
            <Card className="w-full h-full">
              <div className="w-full overflow-y-scroll h-full">
                <InfoRightAdminHome stats={stats} />
              </div>
            </Card>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(AdminDashboard, 'final-admin');
