import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { Card } from '../../components/partials';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import InfoRightNode from '../../components/dashboard/info-right-node';
import ContentNode from '../../components/dashboard/content-node';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { withPageRestricted } from '../../components/hoc/with-page-restricted';
import { getUserNodesInfo } from '../../shared/redux-saga/dashboard/dashboard-actions';

const DashboardNode = () => {
  const [currentNode, setCurrentNode] = useState();
  const [nodesInfo, setNodesInfo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserNodesInfo(
        res => {
          setNodesInfo(res);
        },
        () => {}
      )
    );
  }, []);

  return (
    <>
      <Head>
        <title>Nodes - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="w-full flex gap-5 layout-dashboard-inner">
          <div className="w-4/5 h-full relative">
            <ContentNode
              nodesInfo={nodesInfo}
              sendHightlightNode={node => setCurrentNode(node)}
            />
          </div>
          <div className="w-1/5 h-full relative">
            <Card className="py-5 w-full h-full">
              <div className="overflow-y-scroll w-full h-full">
                <InfoRightNode
                  nodesInfo={nodesInfo}
                  currentNode={currentNode}
                />
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
