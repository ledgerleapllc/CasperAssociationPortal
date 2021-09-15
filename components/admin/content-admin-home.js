/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Dropdown, Tooltips } from '../partials';
import OpenVotes from '../home/open-votes';
import TrendingDiscussion from '../home/trending-discussion';

const durations = [
  {
    label: 'Last 24 hours',
    key: 'last_24hs',
  },
  {
    label: 'Last 7 days',
    key: 'last_7days',
  },
  {
    label: 'Last 30 days',
    key: 'last_30days',
  },
  {
    label: 'Last year',
    key: 'last_year',
  },
];

const ContentAdminHome = ({ stats, changeFrame }) => {
  const [showOpenVotes, setShowOpenVotes] = useState(false);
  const [timeframe, setTimeframe] = useState({
    timeframe_perk: 'last_24hs',
    timeframe_comments: 'last_24hs',
    timeframe_discussions: 'last_24hs',
  });

  const appendTimeframe = (key, value) => {
    const temp = {
      ...timeframe,
      [key]: value,
    };
    setTimeframe(temp);
    changeFrame(temp);
  };

  useEffect(() => {
    changeFrame(timeframe);
  }, []);

  const getLabel = key => durations.find(x => x.key === timeframe[key])?.label;

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full">
      <div className="flex flex-1 gap-5 flex-col-reverse lg:flex-col lg:justify-between min-h-0">
        <div className="flex gap-5 flex-col lg:flex-row h-auto lg:h-1/3">
          <div className="gap-5 flex-grow w-full mt-0 lg:w-2/3 h-full">
            <div className="gap-5 flex lg:flex-row flex-col justify-between h-full">
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <Tooltips
                    placement="top"
                    title="Users that are new to the platform or existing users that wish to be verified. usually requires admin approval."
                    arrow
                  >
                    <p className="text-lg font-medium">KYC for Review</p>
                  </Tooltips>
                  <p className="text-3xl font-thin">
                    {stats?.totalNewUserReady}
                  </p>
                  <p className="text-base font-thin">new user ready</p>
                  <p className="text-3xl font-thin">
                    {stats?.totalUserVerification}
                  </p>
                  <p className="text-base font-thin">
                    IDverification to Review
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
                  <Tooltips
                    placement="top"
                    title="Nodes that fall outside the minimum requirements set by the administrator appear here."
                    arrow
                  >
                    <p className="text-lg font-medium">Failing Nodes</p>
                  </Tooltips>
                  <p className="text-5xl font-thin">{stats?.totalFailNode}</p>
                  {!!stats?.totalFailNode && (
                    <Link href="/dashboard/nodes?node_failing=1">
                      <a className="text-lg text-white w-full h-12 flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40">
                        Review
                      </a>
                    </Link>
                  )}
                  {!stats?.totalFailNode && <p className="h-12" />}
                </div>
              </Card>
              <Card className="h-full lg:w-full">
                <div className="flex flex-col justify-between p-6 h-full text-center">
                  <Tooltips
                    placement="top"
                    title="Tracks the number of perks that have been activated in the selected range."
                    arrow
                  >
                    <p className="text-lg font-medium">Perks Activated</p>
                  </Tooltips>
                  <p className="text-5xl font-thin">
                    {stats?.totalPerksActive}
                  </p>
                  <Dropdown
                    className="w-full"
                    trigger={
                      <p className="flex justify-center items-center w-full relative h-12">
                        ( {getLabel('timeframe_perk')} )
                      </p>
                    }
                  >
                    <ul>
                      {durations.map(duration => (
                        <li
                          className="p-2 hover:text-primary cursor-pointer"
                          onClick={() =>
                            appendTimeframe('timeframe_perk', duration.key)
                          }
                        >
                          <p className="w-full relative h-6">
                            {duration.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
              </Card>
            </div>
          </div>
          <Card className="flex-grow p-6 gap-5 flex flex-row w-full lg:w-1/3 h-full">
            <div className="flex w-1/2 flex-col">
              <div className="flex flex-col justify-between h-full text-center">
                <Tooltips
                  placement="top"
                  title="Tracks the forum activity based on the selected range."
                  arrow
                >
                  <p className="text-lg font-medium">Forum Activity</p>
                </Tooltips>
                <p className="text-5xl font-thin">{stats?.totalNewComments}</p>
                <Dropdown
                  className="w-full"
                  trigger={
                    <div className="h-12">
                      <p className="w-full">New Comments</p>
                      <p className="w-full">
                        ( {getLabel('timeframe_comments')} )
                      </p>
                    </div>
                  }
                >
                  <ul>
                    {durations.map(duration => (
                      <li
                        className="p-2 hover:text-primary cursor-pointer"
                        onClick={() =>
                          appendTimeframe('timeframe_comments', duration.key)
                        }
                      >
                        <p className="w-full relative h-6">{duration.label}</p>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="flex w-1/2 flex-col">
              <div className="flex flex-col justify-between h-full text-center">
                <p className="text-lg font-medium invisible">Forum Activity</p>
                <p className="text-5xl font-thin">
                  {stats?.totalNewDiscussions}
                </p>
                <Dropdown
                  className="w-full"
                  trigger={
                    <div className="h-12">
                      <p className="w-full">New Threads</p>
                      <p className="w-full">
                        ( {getLabel('timeframe_discussions')} )
                      </p>
                    </div>
                  }
                >
                  <ul>
                    {durations.map(duration => (
                      <li
                        className="p-2 hover:text-primary cursor-pointer"
                        onClick={() =>
                          appendTimeframe('timeframe_discussions', duration.key)
                        }
                      >
                        <p className="w-full relative h-6">{duration.label}</p>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
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
