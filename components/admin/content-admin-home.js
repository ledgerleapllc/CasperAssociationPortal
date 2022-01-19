/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
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
    <div id="dashboard-content-admin-home">
      <div id="dashboard-content-admin-homeInner">
        <div id="custom-card-wrapper">
          <Card className="custom-card-box">
            <div className="flex flex-col justify-between p-6 h-full text-center">
              <Tooltips
                placement="top"
                title="Users that are new to the platform or existing users that wish to be verified. usually requires admin approval."
                arrow
              >
                <p className="text-lg font-medium">KYC for Review</p>
              </Tooltips>
              <p className="text-3xl font-thin">{stats?.totalNewUserReady}</p>
              <p className="text-base font-thin">new user ready</p>
              <p className="text-3xl font-thin">
                {stats?.totalUserVerification}
              </p>
              <p className="text-base font-thin">ID Verification to Review</p>
              <Link href="/admin/intake">
                <a
                  style={{
                    marginTop: '10px',
                  }}
                  className="text-lg text-white w-full h-12 flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                >
                  Review
                </a>
              </Link>
            </div>
          </Card>
          <Card className="custom-card-box">
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
          <Card className="custom-card-box">
            <div className="flex flex-col justify-between p-6 h-full text-center">
              <Tooltips
                placement="top"
                title="Tracks the number of perks that have been activated in the selected range."
                arrow
              >
                <p className="text-lg font-medium">Perks Activated</p>
              </Tooltips>
              <p className="text-5xl font-thin">{stats?.totalPerksActive}</p>
              <Dropdown
                trigger={
                  <div
                    style={{
                      position: 'relative',
                    }}
                    className="flex justify-center items-center w-full relative h-14"
                  >
                    <ArrowDropDown
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: 0,
                      }}
                    />
                    ( {getLabel('timeframe_perk')} )
                  </div>
                }
              >
                <ul>
                  {durations.map((duration, index) => (
                    <li
                      className="p-2 hover:text-primary cursor-pointer"
                      onClick={() =>
                        appendTimeframe('timeframe_perk', duration.key)
                      }
                      key={index}
                    >
                      <p className="w-full relative h-6">{duration.label}</p>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
          </Card>
          <Card className="custom-card-box">
            <div className="flex flex-col justify-between p-6 h-full text-center">
              <p className="text-lg font-medium">New Comments</p>
              <p className="text-5xl font-thin">{stats?.totalNewComments}</p>
              <Dropdown
                customInnerStyle={{ width: '180px' }}
                trigger={
                  <div
                    className="flex justify-center items-center w-full relative h-14"
                    style={{
                      position: 'relative',
                    }}
                  >
                    <ArrowDropDown
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: 0,
                      }}
                    />
                    ( {getLabel('timeframe_comments')} )
                  </div>
                }
              >
                <ul>
                  {durations.map((duration, index) => (
                    <li
                      className="p-2 hover:text-primary cursor-pointer"
                      onClick={() =>
                        appendTimeframe('timeframe_comments', duration.key)
                      }
                      key={index}
                    >
                      <p className="w-full relative h-6">{duration.label}</p>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
          </Card>
          <Card className="custom-card-box">
            <div className="flex flex-col justify-between p-6 h-full text-center">
              <p className="text-lg font-medium">New Threads</p>
              <p className="text-5xl font-thin">{stats?.totalNewDiscussions}</p>
              <Dropdown
                customInnerStyle={{ width: '180px' }}
                trigger={
                  <div
                    className="flex justify-center items-center w-full relative h-14"
                    style={{
                      position: 'relative',
                    }}
                  >
                    <ArrowDropDown
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: 0,
                      }}
                    />
                    ( {getLabel('timeframe_discussions')} )
                  </div>
                }
              >
                <ul>
                  {durations.map((duration, index) => (
                    <li
                      className="p-2 hover:text-primary cursor-pointer"
                      onClick={() =>
                        appendTimeframe('timeframe_discussions', duration.key)
                      }
                      key={index}
                    >
                      <p className="w-full relative h-6">{duration.label}</p>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
          </Card>
        </div>
        <div id="custom-card-wrapper2">
          <Card className="card-trending-discussion">
            <TrendingDiscussion />
          </Card>
          <Card className={`${showOpenVotes ? 'card-open-votes' : 'hidden'}`}>
            <OpenVotes toggleOpenVotes={setShowOpenVotes} />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ContentAdminHome;
