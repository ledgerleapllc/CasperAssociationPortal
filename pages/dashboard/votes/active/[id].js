import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../components/partials';
import {
  getVoteDetail,
  recordVote,
} from '../../../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../../_app';

const ActiveVoteDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector(state => state.authReducer.userInfo);
  const { setLoading } = useContext(AppContext);

  const [userVote, setUserVote] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        getVoteDetail(
          id,
          res => {
            setData(res);
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, [id]);

  useEffect(() => {
    setUserVote(data?.user_vote?.type);
  }, [data?.user_vote?.type]);

  const doRecordVote = vote => {
    setLoading(true);
    dispatch(
      recordVote(
        { id, vote },
        () => {
          setLoading(false);
          setUserVote(vote);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full px-card py-5">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <BackButton href="/dashboard/votes" text="Back" force />
            <div className="border-primary border-b-2" />
          </div>
          <div className="py-14 h-5/6">
            {data && (
              <>
                {['admin', 'sub-admin'].includes(user?.role) && (
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
