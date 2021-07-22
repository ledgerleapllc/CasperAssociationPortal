import { useEffect, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, ProgressBar, BackButton } from '../../../../components/partials';
import { getVoteDetail } from '../../../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../../_app';

const CompleteVoteDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { setLoading } = useContext(AppContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        getVoteDetail(
          id,
          res => {
            setLoading(false);
            setData(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="mb-5 w-full flex items-center justify-between">
              <BackButton href="/dashboard/votes/#finished" text="Back" force />
              <p className="text-primary text-xl">Closed</p>
            </div>
            <div className="border-primary border-b-2" />
          </div>
          <div className="py-14 h-5/6">
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
