import VotingLockForm from './voting-lock-form';
import UptimeForm from './uptime-form';
import RedmarkForm from './redmark-form';
import ResponsivenessForm from './responsiveness-form';

const MonitoringCriteria = ({ isOverride, globalSettings }) => (
  <>
    <VotingLockForm isOverride={isOverride} globalSettings={globalSettings} />
    <UptimeForm isOverride={isOverride} globalSettings={globalSettings} />
    <RedmarkForm isOverride={isOverride} globalSettings={globalSettings} />
    <ResponsivenessForm
      isOverride={isOverride}
      globalSettings={globalSettings}
    />
  </>
);

export default MonitoringCriteria;
