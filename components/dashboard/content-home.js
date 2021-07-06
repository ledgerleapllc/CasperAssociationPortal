import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { ApiService } from '../../helpers/api/api.service';
import { Card } from '../partials';
import InfoRightHome from './info-right-home';
import OpenVotes from '../home/open-votes';
import { getTrendingDiscussions } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../shared/core/utils';

const http = new ApiService();

const ContentHome = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [trendingList, setTrendingList] = useState([]);
  const [showOpenVotes, setShowOpenVotes] = useState(false);
  const dispatch = useDispatch();
  const getTrendingList = () => {
    dispatch(getTrendingDiscussions(
      res => {
        setTrendingList(res.trendings);
      })
    );
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(255,71,62, 0.7)',
        borderColor: '#FF473E',
        data: [1400, 1600, 1500, 2000, 1800, 1600, 1850],
        fill: true,
        fillOpacity: 0.3,
        pointRadius: 0,
      },
    ],
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thrs', 'Fri', 'Sat'],
  };
  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col lg:justify-between w-full h-full lg:pr-6">
      <div className="flex flex-wrap lg:flex-nowrap lg:h-1/10 -mx-3">
        <div className="w-full lg:w-3/5 px-3 mb-3">
          <Card className="lg:flex-grow bg-primary">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-bold text-white">New Alert</span>
              <span className="text-base text-white">
                There are new comments to be read!
              </span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/5 px-3 mb-3">
          <Card className="lg:flex-none">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-medium text-black1">Pinned</span>
              <span className="text-base text-black1 font-thin">{userInfo.pinned}</span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/5 px-3 mb-3">
          <Card className="lg:flex-none">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-medium text-black1">New</span>
              <span className="text-base text-black1 font-thin">{userInfo.new_threads}</span>
            </div>
          </Card>
        </div>
      </div>
      <Card className="block lg:hidden h-auto w-full">
        <div className="h-auto">
          <InfoRightHome />
        </div>
      </Card>
      <div className="flex flex-col-reverse lg:flex-col lg:h-8.5/10 lg:justify-between">
        <div className="flex my-10 lg:mt-0 h-auto lg:h-1/3">
          <Card className="w-full px-9 py-5">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <p className="text-lg lg:text-2xl">Validator Rewards</p>
                <div>
                  <ul className="mt-4 lg:mt-0 flex items-center">
                    <li className="text-sm lg:mx-4">
                      <a>Day</a>
                    </li>
                    <li className="px-4">
                      <a className="rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink">
                        Week
                      </a>
                    </li>
                    <li className="text-sm mx-4">
                      <a>Month</a>
                    </li>
                    <li className="text-sm mx-4">
                      <a>Year</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-full py-4">
                <Line data={data} options={lineOptions} />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col-reverse lg:flex-row h-3/5">
          <Card className="flex-grow w-full mt-10 lg:mt-0 lg:w-2/3 lg:mr-3 h-full">
            <div className="flex flex-col px-8 py-7 h-full">
              <p className="text-2.5xl text-black1">Trending Discussions</p>
              <div className="flex flex-col pt-6 h-8.5/10">
                <div className="hidden lg:flex w-full h-1/5">
                  <p className="w-3/6 pb-2 text-lg underline text-left font-normal">
                    Title
                  </p>
                  <div className="flex w-3/6">
                    <p className="w-3/5 pl-12 pb-2 text-lg underline text-left font-normal">
                      Comments
                    </p>
                    <p className="w-3/5 pl-12 pb-2 text-lg underline text-left font-normal">
                      Date
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full lg:mt-5 overflow-y-scroll">
                  {trendingList.map(discussion =>
                    <div className="flex flex-col lg:flex-row w-full py-2.5">
                      <p className="w-full lg:w-3/6 pb-2 text-sm">
                        {discussion.title}
                      </p>
                      <div className="flex w-full lg:w-3/6">
                        <div className="flex items-center lg:items-start lg:w-3/5 lg:pl-12 pb-2">
                          <div className="pr-3">
                            <img
                              src="/images/ic_material_mode_comment.svg"
                              alt="Comment"
                            />
                          </div>
                          <span className="text-sm">{discussion.comments}</span>
                        </div>
                        <div className="flex items-center lg:items-start lg:w-3/5 pl-12 pb-2">
                          <div className="pr-3">
                            <img
                              src="/images/ic_awesome_calendar.svg"
                              alt="Calendar"
                            />
                          </div>
                          <span className="text-sm">
                            {formatDate(discussion.created_at, 'd/M/yy')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
          <Card
            className={`${showOpenVotes
              ? 'flex-grow w-full lg:w-1/3 mt-10 lg:mt-0 lg:ml-3 h-full'
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

export default ContentHome;
