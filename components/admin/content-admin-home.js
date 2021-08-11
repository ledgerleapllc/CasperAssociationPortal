import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Card } from '../partials';
import OpenVotes from '../home/open-votes';
import TrendingDiscussion from '../home/trending-discussion';
import { getAdminDashboard } from '../../shared/redux-saga/admin/actions';

const ContentAdminHome = () => {
  const [showOpenVotes, setShowOpenVotes] = useState(false);
  const dispatch = useDispatch();
  const [stats, setStats] = useState();

  useEffect(() => {
    dispatch(
      getAdminDashboard(res => {
        setStats(res);
      })
    );
  }, []);

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full">
      <div className="flex flex-1 gap-5 flex-col-reverse lg:flex-col lg:justify-between min-h-0">
        <div className="flex gap-5 flex-col lg:flex-row h-auto lg:h-1/3">
          <div className="gap-5 flex-grow w-full mt-0 lg:w-2/3 h-full">
            <div className="gap-5 flex lg:flex-row flex-col justify-between h-full">
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <p className="text-lg font-medium">KYC for Review</p>
                  <p className="text-3xl font-thin">
                    {stats?.totalNewUserReady}
                  </p>
                  <p className="text-base font-thin">new user ready</p>
                  <p className="text-3xl font-thin">
                    {stats?.totalUserVerification}
                  </p>
                  <p className="text-base font-thin">
                    user verifications to review
                  </p>
                  <Link href="/admin/intake">
                    <a className="text-lg text-white w-full h-12 flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40">
                      Review
                    </a>
                  </Link>
                </div>
              </Card>
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <p className="text-lg font-medium">Failing Nodes</p>
                  <p className="text-5xl py-4 font-thin">
                    {stats?.totalFailNode}
                  </p>
                  <Link href="/dashboard/nodes?node_failing=1">
                    <a className="text-lg text-white w-full h-12 flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40">
                      Review
                    </a>
                  </Link>
                </div>
              </Card>
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <p className="text-lg font-medium">Perks Activated</p>
                  <p className="text-5xl py-4 font-thin">8</p>
                  <p className="flex items-center justify-center h-11 text-base">
                    ( Last 7 days )
                  </p>
                </div>
              </Card>
            </div>
          </div>
          <Card className="flex-grow flex flex-row w-full lg:w-1/3 h-full">
            <div className="flex flex-col p-6">
              <div className="flex flex-col justify-between h-full text-center">
                <p className="text-lg font-medium">Forum Activity</p>
                <p className="text-5xl py-4 font-thin">610</p>
                <p className="flex items-center justify-center h-11 text-base">
                  New Comments (7 Days)
                </p>
              </div>
            </div>
            <div className="flex flex-col p-6">
              <div className="flex flex-col justify-between h-full text-center">
                <p className="text-lg font-medium invisible">Forum Activity</p>
                <p className="text-5xl py-4 font-thin">15</p>
                <p className="flex items-center justify-center h-11 text-base">
                  New Threads (7 Days)
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-1 min-h-0 gap-5 flex-col-reverse lg:flex-row lg:h-2/3">
          <Card className="flex-grow w-full lg:w-2/3 h-full">
            <TrendingDiscussion />
          </Card>
          <Card
            className={`${
              showOpenVotes ? 'flex-grow w-full lg:w-1/3 h-full' : 'hidden'
            }`}
          >
            <OpenVotes toggleOpenVotes={setShowOpenVotes} />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ContentAdminHome;
