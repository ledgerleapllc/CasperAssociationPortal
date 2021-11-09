import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import {
  Card,
  Editor,
  BackButton,
  Button,
} from '../../../../components/partials';
import { withPageRestricted } from '../../../../components/hoc/with-page-restricted';
import { AppContext } from '../../../_app';
import {
  getDiscussionDetail,
  updateDiscussion,
} from '../../../../shared/redux-saga/dashboard/dashboard-actions';

const DashboardEditDiscusion = () => {
  const [discussion, setDiscussion] = useState(null);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const { setLoading } = useContext(AppContext);
  const { control, formState, register, handleSubmit, setValue } = useForm({
    mode: 'onBlur',
  });

  const fetchDiscussionDetail = () => {
    setLoading(true);
    dispatch(
      getDiscussionDetail(
        id,
        res => {
          if (!res?.is_draft || res?.is_draft !== 1) {
            Router.push(`/dashboard/discussion/${res?.id}`);
          } else {
            setDiscussion(res);
            setLoading(false);
            setValue('title', res?.title);
            setValue('description', res?.description);
          }
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    if (id) {
      fetchDiscussionDetail();
    }
  }, [id]);

  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      updateDiscussion(
        {
          id: discussion.id,
          ...data,
        },
        () => {
          Router.push(`/dashboard/discussion/${discussion.id}`);
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
                Edit a Discussion
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
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    sizeSpinner={20}
                    primary
                    className="my-1 text-lg"
                  >
                    Save
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
  withPageRestricted(DashboardEditDiscusion, 'discussions'),
  'final-all'
);
