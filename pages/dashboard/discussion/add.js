import { useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton } from '../../../components/partials';
import { ApiService } from '../../../helpers/api/api.service';

const http = new ApiService();

const DashboardAddDiscusion = () => {

  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const postDiscussion = () => {
    http.doPost(['discussions/new'], {
      title, description
    }).then(res => {
      const discussion = res.data.data.discussion;
      Router.push('/dashboard/discussion');
    })
      .catch(err => console.log(err))
  }

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton href="/dashboard/discussion" text="Cancel" />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              Create a Discusion
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <p className="text-sm">
                Posting as: <a className="text-primary">{userInfo?.pseudonym}</a>
              </p>
              <input
                type="text"
                className="border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <div className="mt-4 shadow-md">
                <Editor
                  value={description}
                  onChange={(data) => setDescription(data)}
                />
              </div>
              <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row pt-8 justify-end">
                <button
                  type="button"
                  className="lg:mr-5 my-1 h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={postDiscussion}
                  className="my-1 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Post
                </button>
              </div>
              <div className="pt-8 border-primary border-b lg:border-b-2" />
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardAddDiscusion, 'final-all');
