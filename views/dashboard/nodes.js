import { useState } from 'react';
import Head from 'next/head';
import { Card } from '../../components/partials';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import InfoRightNode from '../../components/dashboard/info-right-node';
import ContentNode from '../../components/dashboard/content-node';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { withPageRestricted } from '../../components/hoc/with-page-restricted';

const DashboardNode = () => {
  const [currentNode, setCurrentNode] = useState();
  return (
    <>
      <Head>
        <title>Nodes - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div id="landing-page__dashboardInner2">
          <div id="landing-page__dashboardInner2_left">
            <ContentNode sendHightlightNode={node => setCurrentNode(node)} />
          </div>
          <div id="landing-page__dashboardInner2_right">
            <Card className="py-5 w-full h-full">
              <div className="overflow-y-scroll w-full h-full">
                <InfoRightNode currentNode={currentNode} />
              </div>
            </Card>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(
  withPageRestricted(DashboardNode, 'nodes'),
  'final-all'
);
