import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useState } from 'react';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton, Button } from '../../../components/partials';
import { submitBallot } from '../../../shared/redux-saga/admin/actions';
import IconFeatureUpLoad from '../../../public/images/ic_feature_upload.svg';
import IconX from '../../../public/images/ic_x.svg';

const ballotSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  time: yup.number().typeError('Time is required').required('Time is required'),
  time_unit: yup.string().required('Time unit is required'),
});

const AdminAddBallot = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(ballotSchema),
  });
  const user = useSelector(state => state.authReducer.userInfo);
  const watchFiles = watch('files');
  const watchUnit = watch('time_unit');

  const onSubmit = data => {
    setIsSubmit(true);
    dispatch(
      submitBallot(
        data,
        () => {
          router.push('/admin/ballots');
        },
        () => {
          setIsSubmit(false);
        }
      )
    );
  };

  const removeFile = index => {
    const temp = watchFiles || [];
    temp.splice(index, 1);
    setValue('files', temp);
  };

  const appendFiles = e => {
    const fileArr = Array.from(e.target.files);
    const temp = watchFiles || [];
    temp.push(...fileArr);
    setValue('files', temp);
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton href="/admin/ballots" text="Cancel" force />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              New Ballot
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-sm">
                  Posting as: <a className="text-primary">{user?.fullInfo?.email}</a>
                </p>
                <div className="mt-4 pb-8 relative flex items-center">
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
                    <IconFeatureUpLoad className="text-primary mr-2" />
                    Upload Files
                  </label>
                  <input
                    type="file"
                    multiple
                    id="ballotFile"
                    onClick={e => {
                      e.target.value = null;
                    }}
                    onChange={appendFiles}
                    hidden
                    accept=".pdf, .doc, .docx, .txt, .rtf"
                  />
                  <input {...register('files')} hidden />
                  <div className="absolute bottom-1 right-0 flex">
                    {watchFiles &&
                      Array.from(watchFiles).map((file, index) => (
                        <div
                          key={index}
                          className="flex mt-5 items-center text-dark3 ml-5"
                        >
                          <IconX
                            className="mr-2.5 cursor-pointer"
                            style={{ fontSize: '10px' }}
                            onClick={() => removeFile(index)}
                          />
                          <span
                            className="truncate text-sm"
                            style={{ maxWidth: '10rem' }}
                          >
                            {file.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="shadow-md">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Editor value={value} onChange={onChange} />
                    )}
                  />
                </div>
                <p className="py-4 text-sm text-gray">
                  Choose a duration for your ballot:
                </p>
                <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row items-center justify-between">
                  <div className="flex">
                    <div
                      className="border border-gray1 mr-4 c-select flex items-center relative focus:outline-none shadow-md"
                      style={{ width: '214px', height: '60px' }}
                    >
                      <select
                        className="w-full h-full px-5 cursor-pointer"
                        required
                        {...register('time')}
                      >
                        <option selected value="" disabled>
                          Select
                        </option>
                        {watchUnit === 'days' &&
                          new Array(30).fill(1).map((x, ind) => (
                            <option key={ind} value={ind + 1}>
                              {ind + 1}
                            </option>
                          ))}
                        {watchUnit === 'hours' &&
                          new Array(24).fill(1).map((x, ind) => (
                            <option key={ind} value={ind + 1}>
                              {ind + 1}
                            </option>
                          ))}
                        {watchUnit === 'minutes' &&
                          new Array(60).fill(1).map((x, ind) => (
                            <option key={ind} value={ind + 1}>
                              {ind + 1}
                            </option>
                          ))}
                      </select>
                      <div className="arrow ml-2" />
                    </div>
                    <div
                      className="border border-gray1 c-select flex items-center relative focus:outline-none shadow-md"
                      style={{ width: '214px', height: '60px' }}
                    >
                      <select
                        className="px-5 w-full h-full cursor-pointer"
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
                  <Button
                    primary
                    type="submit"
                    disabled={isSubmit}
                    isLoading={isSubmit}
                    sizeSpinner={20}
                  >
                    Submit & Begin Voting
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminAddBallot, 'final-all');
