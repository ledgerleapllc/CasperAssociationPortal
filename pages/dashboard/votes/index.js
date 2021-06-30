import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ReactLoading from 'react-loading';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  Tab,
  ForAgainst,
  TimeRemaining,
} from '../../../components/partials';
import { getVotes } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../../shared/core/utils';

const Tab1 = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, data } = useSelector(state => state?.votesReducer);

  useEffect(() => {
    dispatch(getVotes({ status: 'active', page: 1, limit: 999 }));
  }, []);

  const goToActiveVoteDetail = id => {
    router.push(`/dashboard/votes/active/${id}`);
  };

  return (
    <div className="flex flex-col w-full h-auto lg:h-full mt-5">
      <div className="w-full hidden lg:flex flex-row pb-4">
        <p className="w-2/6 text-base font-medium">Title</p>
        <p className="w-1/6 text-base font-medium">Time Remainning</p>
        <p className="w-1/6 text-base font-medium">Votes</p>
        <p className="w-1/6 text-base font-medium">Current Split</p>
        <p className="w-1/6 text-base font-medium">Date</p>
      </div>
      <div className="flex flex-col w-full h-full lg:overflow-y-scroll">
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <ReactLoading
              type="spinningBubbles"
              color="#FF473E"
              width={137}
              height={141}
            />
          </div>
        )}
        {data?.data?.length &&
          data?.data?.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              className="flex flex-col lg:flex-row w-full py-7 border-b border-gray"
              key={index}
              role="button"
              tabIndex="0"
              onClick={() => goToActiveVoteDetail(item.id)}
            >
              <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
                <span className="font-medium pr-3">Started:</span>
                {formatDate(item?.created_at)}
              </p>
              <p className="w-full lg:w-2/6 text-sm">{item.title}</p>
              <p className="flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0">
                <span className="lg:hidden font-medium pr-3">
                  Time Remaining:
                </span>
                <TimeRemaining endTime={new Date(item?.time_end)} />
              </p>
              <p className="flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0">
                <span className="lg:hidden font-medium pr-3">Votes:</span>
                {item?.vote?.result_count}
              </p>
              <div className="flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0">
                <span className="lg:hidden font-medium pr-3">
                  Current Split:
                </span>
                <ForAgainst
                  splitFor={item.vote.for_value}
                  splitAgainst={item.vote.against_value}
                />
              </div>
              <p className="hidden lg:block w-full lg:w-1/6 text-sm">
                {formatDate(item.created_at)}
              </p>
              <button
                type="button"
                className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                onClick={() => goToActiveVoteDetail(item.id)}
              >
                Vote Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

const Tab2 = () => (
  <div className="flex flex-col w-full h-full mt-5">
    <div className="w-full hidden lg:flex flex-row pb-4">
      <p className="w-2/5 text-base font-medium">Title</p>
      <p className="w-1/5 text-base font-medium">Votes</p>
      <p className="w-1/5 text-base font-medium">Results</p>
      <p className="w-1/5 text-base font-medium">Date</p>
    </div>
    <div className="flex flex-col w-full h-full lg:overflow-y-scroll">
      <div className="flex flex-col lg:flex-row w-full py-7 border-b border-gray">
        <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
          <span className="font-medium pr-3">Ended:</span>
          6/15/2021
        </p>
        <p className="w-full lg:w-2/5 text-sm">
          In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit
          ametiaculis mi erat vitae elit.
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Votes:</span>
          199
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Results:</span>
          168/<span className="text-primary">31</span>
        </p>
        <p className="hidden lg:block w-full lg:w-1/5 text-sm">6/15/2021</p>
        <button
          type="button"
          className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        >
          View Result
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full py-7 border-b border-gray">
        <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
          <span className="font-medium pr-3">Ended:</span>
          6/15/2021
        </p>
        <p className="w-full lg:w-2/5 text-sm">
          In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit
          ametiaculis mi erat vitae elit.
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Votes:</span>
          199
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Results:</span>
          168/<span className="text-primary">31</span>
        </p>
        <p className="hidden lg:block w-full lg:w-1/5 text-sm">6/15/2021</p>
        <button
          type="button"
          className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        >
          View Result
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full py-7 border-b border-gray">
        <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
          <span className="font-medium pr-3">Ended:</span>
          6/15/2021
        </p>
        <p className="w-full lg:w-2/5 text-sm">
          In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit
          ametiaculis mi erat vitae elit.
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Votes:</span>
          199
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Results:</span>
          168/<span className="text-primary">31</span>
        </p>
        <p className="hidden lg:block w-full lg:w-1/5 text-sm">6/15/2021</p>
        <button
          type="button"
          className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        >
          View Result
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full py-7 border-b border-gray">
        <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
          <span className="font-medium pr-3">Ended:</span>
          6/15/2021
        </p>
        <p className="w-full lg:w-2/5 text-sm">
          In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit
          ametiaculis mi erat vitae elit.
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Votes:</span>
          199
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Results:</span>
          168/<span className="text-primary">31</span>
        </p>
        <p className="hidden lg:block w-full lg:w-1/5 text-sm">6/15/2021</p>
        <button
          type="button"
          className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        >
          View Result
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full py-7 border-b border-gray">
        <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
          <span className="font-medium pr-3">Ended:</span>
          6/15/2021
        </p>
        <p className="w-full lg:w-2/5 text-sm">
          In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit
          ametiaculis mi erat vitae elit.
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Votes:</span>
          199
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Results:</span>
          168/<span className="text-primary">31</span>
        </p>
        <p className="hidden lg:block w-full lg:w-1/5 text-sm">6/15/2021</p>
        <button
          type="button"
          className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        >
          View Result
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full py-7">
        <p className="block lg:hidden w-full text-sm py-2.5 lg:py-0">
          <span className="font-medium pr-3">Ended:</span>
          6/15/2021
        </p>
        <p className="w-full lg:w-2/5 text-sm">
          In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit
          ametiaculis mi erat vitae elit.
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Votes:</span>
          199
        </p>
        <p className="flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0">
          <span className="lg:hidden font-medium pr-3">Results:</span>
          168/<span className="text-primary">31</span>
        </p>
        <p className="hidden lg:block w-full lg:w-1/5 text-sm">6/15/2021</p>
        <button
          type="button"
          className="block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        >
          View Result
        </button>
      </div>
    </div>
  </div>
);

const tabsData = [
  {
    content: Tab1,
    id: 'active_votes',
    title: 'Active Votes',
  },
  {
    content: Tab2,
    id: 'finished',
    title: 'Finished',
  },
];

const DashboardVote = () => (
  <LayoutDashboard>
    <Card className="h-full lg:pl-24 lg:py-20 lg:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <Tab className="w-full h-full pt-12 lg:pt-0 lg:-mt-7" data={tabsData} />
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(DashboardVote, 'final-all');
