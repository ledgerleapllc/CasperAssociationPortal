import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton } from '../../../components/partials';
import { submitBallot } from '../../../shared/redux-saga/admin/actions';

const ballotSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  time: yup.number().typeError('Time is required').required('Time is required'),
  time_unit: yup.string().required('Time unit is required'),
});

const AdminAddBallot = () => {
  const dispatch = useDispatch();
  const { register, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(ballotSchema),
  });

  const watchFiles = watch('files');

  const onSubmit = data => {
    dispatch(
      submitBallot(data, res => {
        router.push('/admin/ballots');
      })
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton href="/admin/ballots" text="Cancel" />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              New Ballot
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-sm">
                  Posting as: <a className="text-primary">Usernameismine5859</a>
                </p>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    className="border border-gray1 w-full flex-1 h-14 px-7 shadow-md focus:outline-none"
                    placeholder="Enter Ballot Title"
                    {...register('title')}
                  />
                  <label
                    htmlFor="ballotFile"
                    className="flex justify-center items-center cursor-pointer ml-5 h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    {watchFiles && watchFiles.length > 0
                      ? `${watchFiles.length} file(s) selected`
                      : 'Upload Files'}
                  </label>
                  <input
                    type="file"
                    multiple
                    id="ballotFile"
                    {...register('files')}
                    hidden
                  />
                </div>
                <div className="mt-4 shadow-md">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Editor value={value} onChange={onChange} />
                    )}
                  />
                </div>
                <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row items-center pt-8 justify-between">
                  <div className="flex">
                    <div className="border border-gray1 mr-4 c-select flex items-center relative min-w-52 focus:outline-none shadow-md">
                      <select
                        className="py-6 px-5 w-full cursor-pointer"
                        required
                        {...register('time')}
                      >
                        <option selected value="" disabled>
                          Select
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <div className="arrow ml-2" />
                    </div>
                    <div className="border border-gray1 c-select flex items-center relative min-w-52 focus:outline-none shadow-md">
                      <select
                        className="px-5 py-6 w-full cursor-pointer"
                        required
                        {...register('time_unit')}
                      >
                        <option selected value="" disabled>
                          Time Unit
                        </option>
                        <option value="days">Days</option>
                        <option value="hours">Hours</option>
                        <option value="minutes">Minutes</option>
                      </select>
                      <div className="arrow ml-2" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="my-1 h-16 lg:h-11 text-lg w-full text-white lg:w-56 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Submit & Begin Voting
                  </button>
                </div>
                <div className="pt-8 border-primary border-b lg:border-b-2" />
              </form>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminAddBallot, 'final-all');
