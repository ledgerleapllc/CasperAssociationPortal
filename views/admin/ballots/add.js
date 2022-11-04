import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Head from 'next/head';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Editor, BackButton, Button } from '../../../components/partials';
import { submitBallot } from '../../../shared/redux-saga/admin/actions';
import IconFeatureUpLoad from '../../../public/images/ic_feature_upload.svg';
import IconX from '../../../public/images/ic_x.svg';

const ballotSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const AdminAddBallot = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const router = useHistory();

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleStartTimeChange = date => {
    setStartTime(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleEndTimeChange = date => {
    setEndTime(date);
  };

  const dispatch = useDispatch();
  const { register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(ballotSchema),
  });
  const user = useSelector(state => state.authReducer.userInfo);
  const watchFiles = watch('files');

  const onSubmit = data => {
    let startDateStr = '';
    let startTimeStr = '';
    let endDateStr = '';
    let endTimeStr = '';

    if (startDate) startDateStr = format(startDate, 'yyyy-MM-dd');
    if (startTime) startTimeStr = format(startTime, 'HH:mm:ss');
    if (endDate) endDateStr = format(endDate, 'yyyy-MM-dd');
    if (endTime) endTimeStr = format(endTime, 'HH:mm:ss');

    const start = new Date(`${startDateStr} ${startTimeStr}`).getTime();
    const end = new Date(`${endDateStr} ${endTimeStr}`).getTime();

    if (start >= end) return;

    const params = {
      ...data,
      startDate: startDateStr,
      startTime: startTimeStr,
      endDate: endDateStr,
      endTime: endTimeStr,
    };

    setIsSubmit(true);
    dispatch(
      submitBallot(
        params,
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
    <>
      <Head>
        <title>New Ballot - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
          <div className="flex flex-col w-full h-full">
            <div className="card-header lg:mr-card border-primary border-b-2">
              <div className="h-11 mb-3">
                <BackButton href="/admin/ballots" text="Cancel" force />
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                  New Ballot
                </h3>
              </div>
            </div>
            <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
              <div className="lg:pr-card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-sm">
                    Posting as:{' '}
                    <a className="text-primary">{user?.fullInfo?.email}</a>
                  </p>
                  <div className="mt-4 pb-8 relative flex flex-wrap items-center">
                    <input
                      type="text"
                      className="border border-gray1 flex-1 h-14 px-7 shadow-md focus:outline-none"
                      placeholder="Enter Ballot Title"
                      {...register('title')}
                    />
                    <label
                      htmlFor="ballotFile"
                      className="px-5 py-3 flex justify-center items-center cursor-pointer ml-5 text-lg text-primary rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                    >
                      <IconFeatureUpLoad className="text-primary mr-2" />
                      Upload Files
                    </label>
                    <div
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        textAlign: 'right',
                      }}
                    >
                      <small>
                        ( Accept pdf, doc, docx, txt, rtf - Max File Size: 2MB )
                      </small>
                    </div>
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
                    <div
                      style={{ marginTop: '67px' }}
                      className="absolute top-0 right-0 flex"
                    >
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
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '20px' }}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          label="Start Date"
                          value={startDate}
                          onChange={handleStartDateChange}
                          required
                        />
                      </div>
                      <div>
                        <KeyboardTimePicker
                          margin="normal"
                          label="Start Time"
                          value={startTime}
                          onChange={handleStartTimeChange}
                          required
                        />
                      </div>
                      <p style={{ marginLeft: '15px', marginTop: '22px' }}>
                        EST
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '20px' }}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          label="End Date"
                          value={endDate}
                          onChange={handleEndDateChange}
                          required
                        />
                      </div>
                      <div>
                        <KeyboardTimePicker
                          margin="normal"
                          label="End Time"
                          value={endTime}
                          onChange={handleEndTimeChange}
                          required
                        />
                      </div>
                      <p style={{ marginLeft: '15px', marginTop: '22px' }}>
                        EST
                      </p>
                    </div>
                  </MuiPickersUtilsProvider>
                  <div
                    style={{ marginTop: '20px' }}
                    className="flex flex-col-reverse lg:flex-wrap lg:flex-row items-center justify-between"
                  >
                    <Button
                      primary
                      type="submit"
                      disabled={isSubmit}
                      isLoading={isSubmit}
                      sizeSpinner={20}
                      className="px-5 py-2"
                    >
                      Submit &amp; Begin Voting
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(AdminAddBallot, 'final-all', 'ballots');
