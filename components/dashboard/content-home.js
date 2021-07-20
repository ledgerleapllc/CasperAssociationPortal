import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import { Line } from 'react-chartjs-2';
import { Card } from '../partials';
import InfoRightHome from './info-right-home';
import OpenVotes from '../home/open-votes';
import TrendingDiscussion from '../home/trending-discussion';
import Alert from '../home/alert';

const ContentHome = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [showOpenVotes, setShowOpenVotes] = useState(false);
  const [isAlertLoading, setIsAlertLoading] = useState(true);
  const [alerts, setAlerts] = useState();

  useEffect(() => {
    if (alerts) {
      setIsAlertLoading(false);
    }
  }, [alerts]);

  useEffect(() => {
    if (userInfo) {
      const alertsTemp = [
        {
          id: 'dummy-1',
          title: 'New Alert',
          content: 'There are new comments to be read!',
        },
        {
          id: 'dummy-2',
          title: 'New Alert',
          content: 'There are new comments to be read!',
        },
      ];

      if (!userInfo?.profile?.status && userInfo?.role !== 'admin') {
        setAlerts([
          {
            id: 'verification',
            title: 'Get IDverified with Casper’s red checkmark!',
            content:
              'Verify ownership of your node to earn a trusted status in the network and host a verified public page. IDverified nodes have more trust leading to more delegations.',
            handler: () => {
              router.push('/dashboard/verification');
            },
          },
          ...alertsTemp,
        ]);
      } else {
        setAlerts(alertsTemp);
      }
    }
  }, [userInfo]);

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
      <div className="flex flex-wrap lg:flex-nowrap lg:h-1.5/10 -mx-3 pb-5">
        <div className="w-full px-3 mb-3 lg:w-3/5 lg:mb-0">
          <Alert isLoading={isAlertLoading} alerts={alerts} />
        </div>
        <div className="w-2/4 lg:w-1/5 h-full px-3">
          <Card className="lg:flex-none h-full py-3">
            <div className="flex flex-col px-9 justify-center">
              <span className="text-lg font-medium text-black1">Pinned</span>
              <span className="text-base text-black1 font-thin">
                {userInfo.pinned}
              </span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/5 h-full px-3">
          <Card className="lg:flex-none h-full py-3">
            <div className="flex flex-col px-9 justify-center">
              <span className="text-lg font-medium text-black1">New</span>
              <span className="text-base text-black1 font-thin">
                {userInfo.new_threads}
              </span>
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
        <div className="z-50 lg:z-20 my-5 lg:my-0 flex h-auto lg:h-1/3">
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
        <div className="flex pt-5 flex-col-reverse lg:flex-row h-2/3">
          <Card className="z-40 flex-grow w-full mt-5 lg:mt-0 lg:w-2/3 lg:mr-3 h-full">
            <TrendingDiscussion />
          </Card>
          <Card
            className={`${
              showOpenVotes
                ? 'z-30 flex-grow w-full lg:w-1/3 lg:mt-0 lg:ml-3 h-full'
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
