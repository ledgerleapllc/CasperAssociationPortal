import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Router from 'next/router';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton } from '../../../components/partials';
import { Button } from '../../../components/partials/button';
import { createDiscussion } from '../../../shared/redux-saga/dashboard/dashboard-actions';

const DashboardAddDiscusion = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    formState,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      createDiscussion(
        data,
        () => {
          Router.push('/dashboard/discussion');
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
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
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="lg:pr-24">
                <p className="text-sm">
                  Posting as: <a className="text-primary">{userInfo?.pseudonym}</a>
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
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    title="Post"
                    className="my-1 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
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

export default LoadingScreen(DashboardAddDiscusion, 'final-all');
