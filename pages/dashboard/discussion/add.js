import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Router from 'next/router';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton, Button } from '../../../components/partials';
import { createDiscussion } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';

const DashboardAddDiscusion = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, formState, register, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      createDiscussion(
        data,
        () => {
          Router.push('/dashboard/discussion');
          setIsSubmitting(false);
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mb-3">
              <BackButton href="/dashboard/discussion" text="Cancel" force />
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                Create a Discusion
              </h3>
            </div>
          </div>
          <div className="card-body flex-1 min-h-0 pt-8 overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:pr-card">
                <p className="text-sm">
                  Posting as: <a className="text-primary">{userInfo?.email}</a>
                </p>
                <input
                  type="text"
                  className="border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
                  placeholder="Title"
                  name="title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                />
                {formState.errors?.title && (
                  <p className="pl-7 mt-2 text-primary">
                    {formState.errors.title?.message}
                  </p>
                )}
                <div className="mt-4 shadow-md">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Editor value={value} onChange={onChange} />
                    )}
                    rules={{
                      required: 'Description is required',
                    }}
                  />
                </div>
                {formState.errors?.description && (
                  <p className="pl-7 mt-2 text-primary">
                    {formState.errors.description?.message}
                  </p>
                )}
                <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row pt-8 justify-end">
                  <button
                    type="button"
                    className="lg:mr-5 my-1 h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Save Draft
                  </button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    sizeSpinner={20}
                    primary
                    className="my-1 text-lg"
                  >
                    Post
                  </Button>
                </div>
                <div className="pt-8 border-primary border-b lg:border-b-2" />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  withPageRestricted(DashboardAddDiscusion, 'discussions'),
  'final-all'
);
