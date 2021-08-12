/* eslint-disable no-use-before-define */
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';
import { AppContext } from '../../_app';
import MonitoringCriteria from '../../../components/admin/settings/monitoring-criteria';
import SettingLockPage from '../../../components/admin/settings/setting-lock-page';
import {
  getWarningMetrics,
  getLockPageRules,
} from '../../../shared/redux-saga/admin/actions';

const Settings = () => {
  const [metrics, setMetrics] = useState(null);
  const [rules, setRules] = useState(null);
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    fetchWarningMetrics();
    fetchLockPageRules();
  }, []);

  const fetchWarningMetrics = () => {
    dispatch(
      getWarningMetrics(
        res => {
          const obj = res?.reduce((result, item) => {
            // eslint-disable-next-line no-param-reassign
            result[item.type] = item;
            return result;
          }, {});
          console.log(obj);
          setLoading(false);
          setMetrics(obj);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const fetchLockPageRules = () => {
    dispatch(
      getLockPageRules(
        res => {
          if (res) {
            res.kyc_not_verify = res.kyc_not_verify?.reduce((result, item) => {
              // eslint-disable-next-line no-param-reassign
              result[item.screen] = item;
              return result;
            }, {});
            res.status_is_poor = res.status_is_poor?.reduce((result, item) => {
              // eslint-disable-next-line no-param-reassign
              result[item.screen] = item;
              return result;
            }, {});
            console.log('CONVERT RES', res);
            setRules(res);
          }
        },
        () => {}
      )
    );
  };
  return (
    <LayoutDashboard>
      <Card className="h-full pl-card py-7">
        <div className="bg-transparent h-full">
          <div className="w-full h-70px pr-card">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-6">
                Admin settings
              </h3>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col h-100%-70px overflow-y-auto">
            <section className="mt-5">
              <h4 className="mb-7 text-lg font-medium">Mailer Settings</h4>
              <Link href="/admin/settings/emailer">
                <button
                  type="button"
                  className="mr-5 transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Access Mailer
                </button>
              </Link>
            </section>
            <section className="mt-20">
              <h4 className="mb-7 text-lg font-medium">
                Notification Settings
              </h4>
              <Link href="settings/notifications">
                <button
                  type="button"
                  className="transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Access Notifications
                </button>
              </Link>
            </section>
            <section className="mt-20">
              <h4 className="mb-7 text-lg font-medium">Monitoring Criteria</h4>
              <MonitoringCriteria
                metrics={metrics}
                fetchWarningMetrics={fetchWarningMetrics}
              />
            </section>
            <section className="mt-20">
              <h4 className="mb-7 text-lg font-medium">
                Status page lock rules
              </h4>
              <SettingLockPage rules={rules} fetchRules={fetchLockPageRules} />
            </section>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(Settings, 'final-admin');
