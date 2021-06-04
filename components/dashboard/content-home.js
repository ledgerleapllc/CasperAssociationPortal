import { Line } from 'react-chartjs-2';
import { Card } from '../partials';
import InfoRight from './info-right';

const ContentHome = () => {
  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(255,71,62, 0.7)',
        borderColor: '#FF473E',
        data: [1400, 1600, 1500, 2000, 1800, 1600, 1850],
        fill: true,
        fillOpacity: 0.3,
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
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:justify-between w-full h-full md:pr-6">
      <div className="flex flex-wrap md:flex-nowrap md:h-1/10 -mx-3">
        <div className="w-full md:w-3/5 px-3 mb-3">
          <Card className="md:flex-grow bg-primary">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-bold text-white">New Alert</span>
              <span className="text-base text-white">
                There are new comments to be read!
              </span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 md:w-1/5 px-3 mb-3">
          <Card className="md:flex-none">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-medium text-black1">Pinned</span>
              <span className="text-base text-black1 font-thin">11</span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 md:w-1/5 px-3 mb-3">
          <Card className="md:flex-none">
            <div className="flex flex-col px-9 py-4">
              <span className="text-lg font-medium text-black1">New</span>
              <span className="text-base text-black1 font-thin">5</span>
            </div>
          </Card>
        </div>
      </div>
      <Card className="block md:hidden h-auto w-full">
        <div className="h-auto">
          <InfoRight />
        </div>
      </Card>
      <div className="flex flex-col-reverse md:flex-col md:h-8.5/10 md:justify-between">
        <div className="flex my-10 md:mt-0 h-auto md:h-1/3">
          <Card className="w-full px-9 py-5">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="text-lg">Validator Rewards</p>
                <div>
                  <ul className="mt-4 md:mt-0 flex items-center">
                    <li className="text-sm md:mx-4">
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
        <div className="flex flex-col-reverse md:flex-row h-3/5">
          <Card className="flex-grow w-full mt-10 md:mt-0 md:w-2/3 md:mr-3 h-full">
            <div className="flex flex-col px-8 py-7 h-full">
              <p className="text-2.5xl text-black1">Trending Discussions</p>
              <div className="flex flex-col pt-6 h-8.5/10">
                <div className="hidden md:flex w-full h-1/5">
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
                <div className="flex flex-col w-full md:mt-5 overflow-y-scroll">
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="w-full md:w-3/6 pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </p>
                    <div className="flex w-full md:w-3/6">
                      <div className="flex items-center md:items-start md:w-3/5 md:pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_material_mode_comment.svg"
                            alt="Comment"
                          />
                        </div>
                        <span className="text-sm">26</span>
                      </div>
                      <div className="flex items-center md:items-start md:w-3/5 pl-12 pb-2">
                        <div className="pr-3">
                          <img
                            src="/images/ic_awesome_calendar.svg"
                            alt="Calendar"
                          />
                        </div>
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="flex-grow w-full md:w-1/3 mt-10 md:mt-0 md:ml-3 h-full">
            <div className="flex flex-col px-8 py-7 h-full">
              <p className="text-2.5xl text-black1">Open Votes</p>
              <div className="flex flex-col md:pt-6 h-8.5/10">
                <div className="hidden md:flex w-full h-1/5">
                  <p className="w-4/6 text-lg underline text-left font-normal">
                    Title
                  </p>
                  <p className="w-3/6 text-lg pl-8 underline text-left font-normal text-left">
                    Time Left
                  </p>
                </div>
                <div className="flex flex-col w-full mt-5 overflow-y-scroll">
                  <div className="flex flex-col md:flex-row w-full py-2.5 border-b border-gray md:border-0">
                    <p className="text-sm w-full md:w-4/6">
                      Nam tincidunt, augue sit amet dignissim
                    </p>
                    <p className="flex text-sm md:pl-8 w-full py-2.5 md:py-0 md:w-3/6 text-left">
                      <span className="block md:hidden font-medium text-sm mr-2">
                        Time Left:
                      </span>
                      1d:21h:05m
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5 border-b border-gray md:border-0">
                    <p className="text-sm w-full md:w-4/6">
                      Nam tincidunt, augue sit amet dignissim
                    </p>
                    <p className="flex text-sm md:pl-8 w-full py-2.5 md:py-0 md:w-3/6 text-left">
                      <span className="block md:hidden font-medium text-sm mr-2">
                        Time Left:
                      </span>
                      1d:21h:05m
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5 border-b border-gray md:border-0">
                    <p className="text-sm w-full md:w-4/6">
                      Nam tincidunt, augue sit amet dignissim
                    </p>
                    <p className="flex text-sm md:pl-8 w-full py-2.5 md:py-0 md:w-3/6 text-left">
                      <span className="block md:hidden font-medium text-sm mr-2">
                        Time Left:
                      </span>
                      1d:21h:05m
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5 border-b border-gray md:border-0">
                    <p className="text-sm w-full md:w-4/6">
                      Nam tincidunt, augue sit amet dignissim
                    </p>
                    <p className="flex text-sm md:pl-8 w-full py-2.5 md:py-0 md:w-3/6 text-left">
                      <span className="block md:hidden font-medium text-sm mr-2">
                        Time Left:
                      </span>
                      1d:21h:05m
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5 border-b border-gray md:border-0">
                    <p className="text-sm w-full md:w-4/6">
                      Nam tincidunt, augue sit amet dignissim
                    </p>
                    <p className="flex text-sm md:pl-8 w-full py-2.5 md:py-0 md:w-3/6 text-left">
                      <span className="block md:hidden font-medium text-sm mr-2">
                        Time Left:
                      </span>
                      1d:21h:05m
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row w-full py-2.5">
                    <p className="text-sm w-full md:w-4/6">
                      Nam tincidunt, augue sit amet dignissim
                    </p>
                    <p className="flex text-sm md:pl-8 w-full py-2.5 md:py-0 md:w-3/6 text-left">
                      <span className="block md:hidden font-medium text-sm mr-2">
                        Time Left:
                      </span>
                      1d:21h:05m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentHome;
