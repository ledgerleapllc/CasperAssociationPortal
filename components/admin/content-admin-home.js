import { useState } from 'react';

import { Card } from '../partials';
import OpenVotes from '../home/open-votes';
import TrendingDiscussion from '../home/trending-discussion';

const ContentAdminHome = () => {
  const [showOpenVotes, setShowOpenVotes] = useState(false);

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="w-full">
          <Card className="lg:flex-grow bg-primary">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-bold text-white">New Alert</span>
              <span className="text-base text-white">
                There are new comments to be read!
              </span>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex flex-1 gap-5 flex-col-reverse lg:flex-col lg:justify-between min-h-0">
        <div className="flex gap-5 flex-col lg:flex-row h-auto lg:h-1/3">
          <div className="gap-5 flex-grow w-full mt-0 lg:w-2/3 h-full">
            <div className="gap-5 flex lg:flex-row flex-col justify-between h-full">
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <p className="text-lg font-medium">KYC for Review</p>
                  <p className="text-5xl py-4 font-thin">4</p>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-11 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Review
                  </button>
                </div>
              </Card>
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <p className="text-lg font-medium">Failing Nodes</p>
                  <p className="text-5xl py-4 font-thin">2</p>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-11 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Review
                  </button>
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
              showOpenVotes
                ? 'flex-grow w-full lg:w-1/3 h-full'
                : 'w-0 h-0 opacity-0'
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
