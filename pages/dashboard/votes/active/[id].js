import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ReactLoading from 'react-loading';

import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card } from '../../../../components/partials';
import {
  getVoteDetail,
  recordVote,
} from '../../../../shared/redux-saga/dashboard/dashboard-actions';

const ActiveVoteDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data } = useSelector(state => state?.voteDetailReducer);
  const user = useSelector(state => state.authReducer.userInfo);

  const [userVote, setUserVote] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getVoteDetail(id));
    }
  }, [id]);

  useEffect(() => {
    setUserVote(data?.user_vote?.type);
  }, [data?.user_vote?.type]);

  const doRecordVote = vote => {
    dispatch(
      recordVote({ id, vote }, () => {
        setUserVote(vote);
      })
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <button
              type="button"
              className="flex items-center w-max focus:outline-none mb-5"
              onClick={() => router.push('/dashboard/votes')}
            >
              <img
                src="/images/ic_prev_circle.svg"
                alt="prev"
                width="18"
                height="18"
                className="mr-2"
              />
              <span className="text-primary text-xl">Back</span>
            </button>
            <div className="border-primary border-b-2" />
          </div>
          <div className="py-14 h-5/6">
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
            {data && (
              <>
                {user?.role !== 'admin' && (
                  <div className="flex items-center mb-10">
                    <button
                      type="button"
                      disabled={userVote === 'for'}
                      className={`rounded-full h-28 w-28 font-semibold ${
                        userVote === 'for'
                          ? 'border-transparent text-white bg-primary'
                          : 'bg-transparent hover:bg-primary text-primary hover:text-white py-2 px-4 border border-primary hover:border-transparent focus:outline-none'
                      }`}
                      onClick={() => doRecordVote('for')}
                    >
                      Vote For
                    </button>
                    <button
                      type="button"
                      disabled={userVote === 'against'}
                      className={`rounded-full h-28 w-28 font-semibold  ml-6 ${
                        userVote === 'against'
                          ? 'border-transparent text-white bg-primary'
                          : 'bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent focus:outline-none ml-6'
                      }`}
                      onClick={() => doRecordVote('against')}
                    >
                      Vote Against
                    </button>
                  </div>
                )}
                <div className="w-full h-full overflow-y-scroll">
                  <h4 className="text-xl font-bold mb-7">{data.title}</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.description,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default ActiveVoteDetail;
