import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import InfoRightAdminHome from '../../components/admin/info-right-admin-home';
import ContentAdminHome from '../../components/admin/content-admin-home';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { getAdminDashboard } from '../../shared/redux-saga/admin/actions';
import { AppContext } from '../../pages/_app';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState();
  const { setLoading } = useContext(AppContext);

  const fetchStats = timeframe => {
    setLoading(true);
    dispatch(
      getAdminDashboard(
        timeframe,
        res => {
          setLoading(false);
          setStats(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <>
      <Head>
        <title>Dashboard - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="w-full h-auto 2xl:h-full flex flex-col 2xl:flex-row gap-5">
          <div className="w-full 2xl:w-4/5 h-auto 2xl:h-full">
            <ContentAdminHome stats={stats} changeFrame={fetchStats} />
          </div>
          <div className="w-full 2xl:w-1/5 h-auto 2xl:h-full">
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
