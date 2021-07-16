import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getTrendingDiscussions } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { formatDate } from '../../shared/core/utils';

const TrendingDiscussion = () => {
  const [trendingList, setTrendingList] = useState([]);
  const dispatch = useDispatch();

  const getTrendingList = () => {
    dispatch(
      getTrendingDiscussions(res => {
        setTrendingList(res.trendings);
      })
    );
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  return (
    <div className="flex flex-col px-8 py-7 h-full">
      <p className="text-2.5xl text-black1">Trending Discussions</p>
      <div className="flex flex-col pt-6 h-8.5/10">
        <div className="hidden lg:flex w-full h-1/5">
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
        <div className="flex flex-col w-full lg:mt-5 overflow-y-scroll">
          {trendingList.map(discussion => (
            <div className="flex flex-col lg:flex-row w-full py-2.5">
              <p className="w-full lg:w-3/6 pb-2 text-sm">{discussion.title}</p>
              <div className="flex w-full lg:w-3/6">
                <div className="flex items-center lg:items-start lg:w-3/5 lg:pl-12 pb-2">
                  <div className="pr-3">
                    <img
                      src="/images/ic_material_mode_comment.svg"
                      alt="Comment"
                    />
                  </div>
                  <span className="text-sm">{discussion.comments}</span>
                </div>
                <div className="flex items-center lg:items-start lg:w-3/5 pl-12 pb-2">
                  <div className="pr-3">
                    <img src="/images/ic_awesome_calendar.svg" alt="Calendar" />
                  </div>
                  <span className="text-sm">
                    {formatDate(discussion.created_at, 'd/M/yy')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingDiscussion;
