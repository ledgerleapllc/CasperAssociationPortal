import Link from 'next/link';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Tab, ClockBar } from '../../components/partials';
import { formatDate } from '../../shared/core/utils';

const ballots = [
  {
    title: 'Title of ballot - There is room for a long title',
    time_remaining: new Date('2021-06-30T16:55:06.439Z'),
    total_votes: '199',
    split_for: '100',
    split_against: '99',
    start_date: new Date('2021-06-25T16:55:06.439Z'),
  },
  {
    title: 'Title of ballot - There is room for a long long long long',
    time_remaining: new Date('2021-06-28T16:55:06.439Z'),
    total_votes: '199',
    split_for: '100',
    split_against: '99',
    start_date: new Date('2021-06-25T16:55:06.439Z'),
  },
];

const Tab1 = () => (
  <div className="flex flex-col pt-4 h-full">
    <div className="flex flex-col lg:pt-6 h-full min-w-250">
      <div className="flex w-full">
        <p className="w-3/12 text-base font-medium">Title</p>
        <p className="w-2/12 text-base font-medium">Time Remaining</p>
        <p className="w-2/12 text-base font-medium">
          Total <br />
          Votes
        </p>
        <p className="w-2/12 text-base font-medium">
          Split <br />
          For/Against
        </p>
        <p className="w-2/12 text-base font-medium">Start Date</p>
        <p className="w-1/12 text-base font-medium">Admin Action</p>
      </div>
      <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
        {ballots.map(ballot => (
          <div className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray">
            <p className="text-sm w-3/12 truncate pr-4">{ballot.title}</p>
            <p className="text-sm w-2/12">
              <ClockBar
                endTime={ballot.time_remaining}
                startTime={ballot.start_date}
              />
            </p>
            <p className="text-sm w-2/12">{ballot.total_votes}</p>
            <p className="text-sm w-2/12">
              {ballot.split_for}/{ballot.split_against}
            </p>
            <p className="text-sm w-2/12">{formatDate(ballot.start_date)}</p>
            <p className="text-sm w-1/12">
              <button
                type="button"
                className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
              >
                Manage
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Tab2 = () => (
  <ul className="pb-20">
    {/* <DashboardDiscusionContext.Consumer>
      {({ pinnedList }) =>
        pinnedList.map((data, index) => (
          <li key={index}>
            <ChatBox data={data} />
          </li>
        ))
      }
    </DashboardDiscusionContext.Consumer> */}
  </ul>
);

const tabsData = [
  {
    content: Tab1,
    id: 'discuss',
    title: 'Active',
  },
  {
    content: Tab2,
    id: 'pinned',
    title: 'Complete',
  },
];

const Ballots = () => (
  <LayoutDashboard>
    <Card className="h-full md:pl-24 md:py-10 md:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <div className="flex justify-between md:mr-24">
          <h3 className="text-dark2 text-xl lg:pr-32 font-medium">Ballots</h3>
          <Link href="/dashboard/discussion/add">
            <button
              type="button"
              className="transition text-lg text-white w-36 md:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            >
              New Ballots
            </button>
          </Link>
        </div>
        <Tab
          className="w-full h-full pt-12 md:pt-0 ballot-tabs"
          data={tabsData}
        />
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(Ballots, 'final-admin');
