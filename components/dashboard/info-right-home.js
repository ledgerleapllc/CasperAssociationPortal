import NodeInfoHome from './node-info-home';

const InfoRightHome = ({ dashboardData }) => (
  <div className="flex flex-col mx-9 my-3 bg-white">
    <NodeInfoHome dashboardData={dashboardData} />
  </div>
);

export default InfoRightHome;
