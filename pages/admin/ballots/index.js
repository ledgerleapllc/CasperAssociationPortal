import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { getBallots } from '../../../shared/redux-saga/admin/actions';

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

const Tab1 = () => {
  const [activeBallots, setActiveBallots] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBallots('active', res => {
        setActiveBallots(res);
      })
    );
  }, []);

  return (
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
            {activeBallots.map((ballot, ind) => (
              <div
                key={`active-${ind}`}
                className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray"
              >
                <p className="col-1 text-sm truncate pr-4">{ballot.title}</p>
                <div className="col-2 text-sm">
                  <ClockBar
                    endTime={new Date(ballot.time_end)}
                    startTime={new Date(ballot.created_at)}
                  />
                </div>
                <p className="col-3 text-sm">{ballot.vote.result_count}</p>
                <div className="col-4 text-sm">
                  <ForAgainst
                    splitFor={ballot.vote.for_value}
                    splitAgainst={ballot.vote.against_value}
                  />
                </div>
                <p className="col-5 text-sm">{formatDate(ballot.created_at)}</p>
                <div className="col-6 text-sm">
                  <Link href={`/admin/ballots/active/${ballot.id}`}>
                    <button
                      type="button"
                      className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    >
                      Manage
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Styles>
  );
};

const Tab2 = () => {
  const [completeBallots, setCompleteBallots] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBallots('complete', res => {
        setCompleteBallots(res);
      })
    );
  }, []);

  return (
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
            {completeBallots.map((ballot, ind) => (
              <div
                key={`complete-${ind}`}
                className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray"
              >
                <p className="col-1 text-sm truncate pr-4">{ballot.title}</p>
                <p className="col-2 text-sm">
                  <StatusText className="capitalize" content="pass" />
                </p>
                <p className="col-3 text-sm">{ballot.vote.result_count}</p>
                <div className="col-4 text-sm">
                  <ForAgainst
                    splitFor={ballot.vote.for_value}
                    splitAgainst={ballot.vote.against_value}
                  />
                </div>
                <p className="col-5 text-sm">
                  {formatDate(ballot.created_at, 'hh:mm aaa dd/MM/yyyy')}
                </p>
                <p className="col-6 text-sm">
                  {formatDate(ballot.time_end, 'hh:mm aaa dd/MM/yyyy')}
                </p>
                <div className="col-7 text-sm">
                  <Link href={`/admin/ballots/complete/${ballot.id}`}>
                    <button
                      type="button"
                      className="text-lg text-white w-full h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                    >
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Styles>
  );
};

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
