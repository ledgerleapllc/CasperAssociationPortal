import SettingMetricForm from './setting-metric-form';

const MonitoringCriteria = ({ metrics, fetchWarningMetrics }) => (
  <>
    <SettingMetricForm
      metrics={metrics?.uptime}
      title="Uptime"
      type="uptime"
      doReloadData={fetchWarningMetrics}
      warningTooltip="Sets the level that the node operator will be alerted at."
      probationTooltip="Sets the level that the node operator will be placed on probation."
    />
    <SettingMetricForm
      metrics={metrics?.['block-height']}
      title="Block Height"
      type="block-height"
      doReloadData={fetchWarningMetrics}
      warningTooltip="Sets the level that the node operator will be alerted at."
      probationTooltip="Sets the level that the node operator will be placed on probation."
    />
    <SettingMetricForm
      metrics={metrics?.['update-responsiveness']}
      title="Update Responsiveness"
      type="update-responsiveness"
      doReloadData={fetchWarningMetrics}
      warningTooltip="Sets the level that the node operator will be alerted at."
      probationTooltip="Sets the level that the node operator will be placed on probation."
    />
  </>
);

export default MonitoringCriteria;
