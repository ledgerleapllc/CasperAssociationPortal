import Link from 'next/link';
import styled from 'styled-components';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  Tab,
  ClockBar,
  StatusText,
  ForAgainst,
} from '../../../components/partials';
import { formatDate } from '../../../shared/core/utils';

const ballots = [
  {
    id: 1,
    title: 'Title of ballot - There is room for a long title',
    final_result: 'pass',
    time_remaining: new Date('2021-06-30T16:55:06.439Z'),
    total_votes: '199',
    split_for: '100',
    split_against: '99',
    start_date: new Date('2021-06-25T16:55:06.439Z'),
    end_date: new Date('2021-06-27T16:55:06.439Z'),
  },
  {
    id: 2,
    title: 'Title of ballot - There is room for a long long long long',
    time_remaining: new Date('2021-06-28T16:55:06.439Z'),
    total_votes: '199',
    final_result: 'cancelled',
    split_for: '4',
    split_against: '22',
    start_date: new Date('2021-06-25T16:55:06.439Z'),
    end_date: new Date('2021-06-27T16:55:06.439Z'),
  },
  {
    id: 3,
    title: 'Title of ballot - There is room for a long long long long',
    time_remaining: new Date('2021-06-28T16:55:06.439Z'),
    total_votes: '199',
    final_result: 'fail',
    split_for: '8',
    split_against: '9',
    start_date: new Date('2021-06-25T16:55:06.439Z'),
    end_date: new Date('2021-06-27T16:55:06.439Z'),
  },
];

const Styles = styled.div`
  .active-ballot-table {
    .col-1 {
      width: 30%;
    }
    .col-2 {
      width: 15%;
    }
    .col-3 {
      width: 15%;
    }
    .col-4 {
      width: 15%;
    }
    .col-5 {
      width: 15%;
    }
    .col-6 {
      width: 10%;
    }
  }
  .complete-ballot-table {
    .col-1 {
      width: 30%;
    }
    .col-2 {
      width: 15%;
    }
    .col-3 {
      width: 12%;
    }
    .col-4 {
      width: 12%;
    }
    .col-5 {
      width: 10%;
    }
    .col-6 {
      width: 10%;
    }
    .col-7 {
      width: 10%;
    }
  }
`;

const Tab1 = () => (
  <Styles>
    <div className="active-ballot-table flex flex-col pt-4 h-full">
      <div className="flex flex-col lg:pt-6 h-full min-w-250">
        <div className="flex w-full">
          <p className="col-1 text-base font-medium">Title</p>
          <p className="col-2 text-base font-medium">Time Remaining</p>
          <p className="col-3 text-base font-medium">
            Total <br />
            Votes
          </p>
          <p className="col-4 text-base font-medium">
            Split <br />
            For/Against
          </p>
          <p className="col-5 text-base font-medium">Start Date</p>
          <p className="col-6 text-base font-medium">Admin Action</p>
        </div>
        <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
          {ballots.map(ballot => (
            <div className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray">
              <p className="col-1 text-sm truncate pr-4">{ballot.title}</p>
              <p className="col-2 text-sm">
                <ClockBar
                  endTime={ballot.time_remaining}
                  startTime={ballot.start_date}
                />
              </p>
              <p className="col-3 text-sm">{ballot.total_votes}</p>
              <p className="col-4 text-sm">
                <ForAgainst
                  splitFor={ballot.split_for}
                  splitAgainst={ballot.split_against}
                />
              </p>
              <p className="col-5 text-sm">{formatDate(ballot.start_date)}</p>
              <p className="col-6 text-sm">
                <Link href={`/admin/ballots/active/${ballot.id}`}>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Manage
                  </button>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Styles>
);

const Tab2 = () => (
  <Styles>
    <div className="complete-ballot-table flex flex-col pt-4 h-full">
      <div className="flex flex-col lg:pt-6 h-full min-w-250">
        <div className="flex w-full">
          <p className="col-1 text-base font-medium">Title</p>
          <p className="col-2 text-base font-medium">Final Result</p>
          <p className="col-3 text-base font-medium">
            Total <br />
            Votes
          </p>
          <p className="col-4 text-base font-medium">
            Split <br />
            For/Against
          </p>
          <p className="col-5 text-base font-medium">Start Date</p>
          <p className="col-6 text-base font-medium">End Date</p>
          <p className="col-7 text-base font-medium">Admin Action</p>
        </div>
        <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
          {ballots.map(ballot => (
            <div className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray">
              <p className="col-1 text-sm truncate pr-4">{ballot.title}</p>
              <p className="col-2 text-sm">
                <StatusText
                  className="capitalize"
                  content={ballot.final_result}
                />
              </p>
              <p className="col-3 text-sm">{ballot.total_votes}</p>
              <p className="col-4 text-sm">
                <ForAgainst
                  splitFor={ballot.split_for}
                  splitAgainst={ballot.split_against}
                />
              </p>
              <p className="col-5 text-sm">
                {formatDate(ballot.start_date, 'hh:mm aaa dd/MM/yyyy')}
              </p>
              <p className="col-6 text-sm">
                {formatDate(ballot.end_date, 'hh:mm aaa dd/MM/yyyy')}
              </p>
              <p className="col-7 text-sm">
                <Link href={`/admin/ballots/complete/${ballot.id}`}>
                  <button
                    type="button"
                    className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    View
                  </button>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Styles>
);

const tabsData = [
  {
    content: Tab1,
    id: 'active',
    title: 'Active',
  },
  {
    content: Tab2,
    id: 'complete',
    title: 'Complete',
  },
];

const Ballots = () => (
  <LayoutDashboard>
    <Card className="h-full md:pl-24 md:py-10 md:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <div className="flex justify-between md:mr-24">
          <h3 className="text-dark2 text-xl lg:pr-32 font-medium">Ballots</h3>
          <Link href="/admin/ballots/add">
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
