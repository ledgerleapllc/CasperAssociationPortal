import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { formatDate } from '../../shared/core/utils';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Button, Card } from '../../components/partials';
import { completeUpgrade } from '../../shared/redux-saga/dashboard/dashboard-actions';
import IconCheck from '../../public/images/ic_check_circle.svg';
import { AppContext } from '../../pages/_app';

const Upgrades = () => {
  const { setLoading } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState();
  const [lastUpgrade, setLastUpgrade] = useState(null);
  const [lastOwnUpgrade, setLastOwnUpgrade] = useState(null);
  const [lastUpgradeReply, setLastUpgradeReply] = useState(null);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setLastUpgrade(userInfo.lastUpgrade || null);
      setLastOwnUpgrade(userInfo.lastOwnUpgrade || null);
      setLastUpgradeReply(userInfo.lastUpgradeReply || null);
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const onComplete = upgrade_id => {
    setLoading(true);
    setIsSubmitting(true);
    dispatch(
      completeUpgrade(
        { upgrade_id },
        () => {
          window.location.reload();
        },
        () => {
          setLoading(false);
          setIsSubmitting(false);
        }
      )
    );
  };

  const renderUpgradeContent = upgrade => (
    <>
      <p>
        <b>Version: {upgrade.version}</b>
      </p>
      <p className="mt-1">
        <b>
          Must be installed by{' '}
          {formatDate(upgrade.activation_date, 'dd/MM/yyyy')}
        </b>
      </p>
      <p className="mt-1">
        <b>Goes live in ERA #{upgrade.activation_era}</b>
      </p>
      <p className="mt-1">
        <b>
          Software link:{' '}
          <a
            className="underline"
            href={upgrade.link}
            target="_blank"
            rel="noreferrer"
          >
            {upgrade.link}
          </a>
        </b>
      </p>
      <p className="mt-5 mb-5">
        <b>Notes:</b>
        <br />
        {upgrade.notes}
      </p>
    </>
  );

  const renderContent = () => {
    if (!lastUpgrade || !lastUpgrade.id) {
      return (
        <h2 className="text-primary text-xxl font-medium">
          There are no pending updates at this time.
        </h2>
      );
    }
    if (!lastUpgrade.time_passed) {
      if (!lastUpgradeReply || !lastUpgradeReply.id) {
        return (
          <>
            <h2 className="text-primary text-xxl font-medium mb-2">
              An upgrade is available!
            </h2>
            {renderUpgradeContent(lastUpgrade)}
            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              sizeSpinner={20}
              primary
              className="text-lg"
              onClick={() => onComplete(lastUpgrade.id)}
            >
              Mark as complete
            </Button>
          </>
        );
      }
      return (
        <div>
          <h2 className="text-primary text-xxl font-medium mb-2">
            Well done! You have upgraded prior to the activation date.
          </h2>
          {renderUpgradeContent(lastUpgrade)}
          <div className="flex justify-center">
            <IconCheck className="text-green" style={{ fontSize: '50px' }} />
          </div>
        </div>
      );
    }
    return (
      <>
        <h2 className="text-primary text-xxl font-medium mb-2">
          There are no pending updates at this time.
        </h2>
        {lastOwnUpgrade ? (
          <>
            <p className="mb-1">
              <b>Last Update</b>
            </p>
            {renderUpgradeContent(lastOwnUpgrade)}
          </>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Upgrades - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="h-full px-card py-5 lg:shadow-2xl" noShadow>
          <div className="max-w-3xl flex flex-col w-full h-full items-start justify-start">
            {renderContent()}
          </div>
        </Card>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(Upgrades, 'final-all');
