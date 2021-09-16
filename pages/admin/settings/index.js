/* eslint-disable no-use-before-define */
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Tooltips } from '../../../components/partials';
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
      <Card className="h-full pl-card py-5">
        <div className="flex flex-col bg-transparent h-full">
          <div className="w-full pr-card">
            <h3 className="text-dark2 text-lg font-medium h-11 flex items-end mb-3">
              Global settings
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            <section className="pt-8">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Mailer Settings
                <Tooltips
                  placement="top"
                  title="Adjust settings for the automatic email system."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </h4>
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
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Notification Settings
                <Tooltips
                  placement="top"
                  title="Adjust settings for the notifications to node operators."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
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
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Monitoring Criteria
                <Tooltips
                  placement="top"
                  title="Allows admin to adjust the settings for Uptime, Block Height, and Update Responsiveness."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </h4>
              <MonitoringCriteria
                metrics={metrics}
                fetchWarningMetrics={fetchWarningMetrics}
              />
            </section>
            <section className="my-20">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Status page lock rules
                <Tooltips
                  placement="top"
                  title="Locks users out of specified areas of the dashboard."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
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
