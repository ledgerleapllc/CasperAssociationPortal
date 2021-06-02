import { Line } from 'react-chartjs-2';
import { Card } from '../partials';

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
    <div className="flex flex-col justify-between w-full mx-3">
      <div className="flex">
        <Card className="flex-grow w-3/5 mx-3 bg-primary">
          <div className="flex flex-col py-4 px-9">
            <span className="text-lg font-medium text-white">New Alert</span>
            <span className="text-base text-white">
              There are new comments to be read!
            </span>
          </div>
        </Card>
        <Card className="flex-none w-1/5 mx-3">
          <div className="flex flex-col py-4 px-9">
            <span className="text-lg font-medium text-black1">Pinned</span>
            <span className="text-base text-black1">11</span>
          </div>
        </Card>
        <Card className="flex-none w-1/5 mx-3">
          <div className="flex flex-col py-4 px-9">
            <span className="text-lg font-medium text-black1">New</span>
            <span className="text-base text-black1">5</span>
          </div>
        </Card>
      </div>
      <div className="flex mx-3 mt-3">
        <Card className="w-full px-9 py-5">
          <div style={{ height: '220px' }}>
            <div className="flex justify-between pb-4">
              <p className="text-lg">Validator Rewards</p>
              <div>
                <ul className="flex items-center">
                  <li className="text-sm mx-4">
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
            <div style={{ height: '180px' }}>
              <Line data={data} options={lineOptions} />
            </div>
          </div>
        </Card>
      </div>
      <div className="flex pt-5">
        <Card className="flex-grow w-2/3 mx-3">
          <div className="flex flex-col px-8 py-7">
            <p className="text-2.5xl text-black1">Trending Discussions</p>
            <div className="pt-6">
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th className="w-2/5 pb-2 text-lg underline text-left font-normal">
                      Title
                    </th>
                    <th className="w-1/5 pl-12 pb-2 text-lg underline text-left font-normal">
                      Comments
                    </th>
                    <th className="w-1/5 pl-12 pb-2 text-lg underline text-left font-normal">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm w-2/5 py-2.5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_material_mode_comment.svg"
                          alt="Comment"
                        />
                        <span className="text-sm">26</span>
                      </div>
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_awesome_calendar.svg"
                          alt="Calendar"
                        />
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm w-2/5 py-2.5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_material_mode_comment.svg"
                          alt="Comment"
                        />
                        <span className="text-sm">26</span>
                      </div>
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_awesome_calendar.svg"
                          alt="Calendar"
                        />
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm w-2/5 py-2.5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_material_mode_comment.svg"
                          alt="Comment"
                        />
                        <span className="text-sm">26</span>
                      </div>
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_awesome_calendar.svg"
                          alt="Calendar"
                        />
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm w-2/5 py-2.5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_material_mode_comment.svg"
                          alt="Comment"
                        />
                        <span className="text-sm">26</span>
                      </div>
                    </td>
                    <td className="relative w-1/5 pl-12 py-2.5">
                      <div className="flex absolute top-2.5">
                        <img
                          className="pr-3"
                          src="/images/ic_awesome_calendar.svg"
                          alt="Calendar"
                        />
                        <span className="text-sm">5/6/21</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
        <Card className="flex-grow w-1/3 mx-3">
          <div className="flex flex-col px-8 py-7">
            <p className="text-2.5xl text-black1">Open Votes</p>
            <div className="pt-6">
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th className="w-2/3 pb-2 text-lg underline text-left font-normal">
                      Title
                    </th>
                    <th className="w-1/3 pb-2 text-lg underline text-left font-normal">
                      Time Left
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm w-2/3 py-2.5">
                      Nam tincidunt, augue sit amet dignissim
                    </td>
                    <td className="relative w-1/3 py-2.5">
                      <span className="absolute top-2.5 text-sm">
                        1d:21h:05m
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm w-2/3 py-2.5">
                      Nam tincidunt, augue sit amet dignissim
                    </td>
                    <td className="relative w-1/3 py-2.5">
                      <span className="absolute top-2.5 text-sm">
                        1d:21h:05m
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm w-2/3 py-2.5">
                      Nam tincidunt, augue sit amet dignissim
                    </td>
                    <td className="relative w-1/3 py-2.5">
                      <span className="absolute top-2.5 text-sm">
                        1d:21h:05m
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm w-2/3 py-2.5">
                      Nam tincidunt, augue sit amet dignissim
                    </td>
                    <td className="relative w-1/3 py-2.5">
                      <span className="absolute top-2.5 text-sm">
                        1d:21h:05m
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentHome;
