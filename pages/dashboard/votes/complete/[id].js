import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ReactLoading from 'react-loading';

import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, ProgressBar } from '../../../../components/partials';
import { getVoteDetail } from '../../../../shared/redux-saga/dashboard/dashboard-actions';

const CompleteVoteDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data } = useSelector(state => state?.voteDetailReducer);

  useEffect(() => {
    if (id) {
      dispatch(getVoteDetail(id));
    }
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="mb-5 w-full flex items-center justify-between">
              <button
                type="button"
                className="flex items-center w-max focus:outline-none"
                onClick={() => router.push('/dashboard/votes/#finished')}
              >
                <img
                  src="/images/ic_prev_circle.svg"
                  alt="prev"
                  width="18"
                  height="18"
                  className="mr-2"
                />
                <span className="text-sm">Back</span>
              </button>
              <p className="text-primary">Closed</p>
            </div>
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
                <div className="w-2/5 mb-10">
                  <div className="mb-6">
                    <div className="flex">
                      <span className="text-xl">For</span>
                      <button
                        type="button"
                        className="focus:outline-none ml-2 pb-2"
                      >
                        <img
                          src="/images/ic_info.svg"
                          alt="prev"
                          width="10"
                          height="10"
                          className="mr-2"
                        />
                      </button>
                    </div>
                    <ProgressBar
                      counts={data.vote?.for_value}
                      totalCounts={data.vote?.result_count}
                    />
                  </div>
                  <div>
                    <div className="flex">
                      <span className="text-xl">Against</span>
                      <button
                        type="button"
                        className="focus:outline-none ml-2 pb-2"
                      >
                        <img
                          src="/images/ic_info.svg"
                          alt="prev"
                          width="10"
                          height="10"
                          className="mr-2"
                        />
                      </button>
                    </div>
                    <ProgressBar
                      counts={data.vote?.against_value}
                      totalCounts={data.vote?.result_count}
                    />
                  </div>
                </div>
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

export default CompleteVoteDetail;
