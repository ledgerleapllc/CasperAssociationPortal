import NodeInfoHome from './node-info-home';

const InfoRightHome = ({ dashboardData }) => (
  <div className="flex flex-col px-8 py-5">
    <NodeInfoHome dashboardData={dashboardData} />
  </div>
);

export default InfoRightHome;
