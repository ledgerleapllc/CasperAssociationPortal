import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/partials';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import InfoRightNode from '../../components/dashboard/info-right-node';
import ContentNode from '../../components/dashboard/content-node';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { withPageRestricted } from '../../components/hoc/with-page-restricted';
import {
  getAdminNodesInfo,
  getUserNodesInfo,
} from '../../shared/redux-saga/dashboard/dashboard-actions';

const DashboardNode = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(null);
  const [currentNode, setCurrentNode] = useState();
  const [nodesInfo, setNodesInfo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
      setIsAdmin(isAdminTemp);
      if (isAdminTemp) {
        dispatch(
          getAdminNodesInfo(
            res => {
              setNodesInfo(res);
            },
            () => {}
          )
        );
      } else {
        dispatch(
          getUserNodesInfo(
            res => {
              setNodesInfo(res);
            },
            () => {}
          )
        );
      }
    }
  }, [userInfo]);

  return (
    <>
      <Head>
        <title>Nodes - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="w-full h-full flex flex-col 2xl:flex-row gap-5 layout-dashboard-inner">
          <div className="w-full 2xl:w-4/5 h-full relative">
            <ContentNode
              nodesInfo={nodesInfo}
              sendHightlightNode={node => setCurrentNode(node)}
              isAdmin={isAdmin}
            />
          </div>
          <div className="w-full 2xl:w-1/5 h-auto lg:h-full relative">
            <Card className="py-5 w-full h-full">
              <div className="overflow-y-scroll w-full h-full">
                <InfoRightNode
                  nodesInfo={nodesInfo}
                  currentNode={currentNode}
                  isAdmin={isAdmin}
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
