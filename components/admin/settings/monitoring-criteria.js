import SettingMetricForm from './setting-metric-form';

const MonitoringCriteria = ({ metrics, fetchWarningMetrics }) => (
  <>
    <SettingMetricForm
      metrics={metrics?.uptime}
      title="Uptime"
      type="uptime"
      doReloadData={fetchWarningMetrics}
    />
    <SettingMetricForm
      metrics={metrics?.['block-height']}
      title="Block Height"
      type="block-height"
      doReloadData={fetchWarningMetrics}
    />
    <SettingMetricForm
      metrics={metrics?.['update-responsiveness']}
      title="Update Responsiveness"
      type="update-responsiveness"
      doReloadData={fetchWarningMetrics}
    />
  </>
);

export default MonitoringCriteria;
