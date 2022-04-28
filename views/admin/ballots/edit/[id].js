import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import IconFeatureUpLoad from '../../../../public/images/ic_feature_upload.svg';
import IconX from '../../../../public/images/ic_x.svg';
import {
  Card,
  Editor,
  BackButton,
  Button,
} from '../../../../components/partials';
import {
  getBallotDetail,
  updateBallot,
} from '../../../../shared/redux-saga/admin/actions';

const ballotSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const AdminEditBallot = () => {
  const [ballot, setBallot] = useState();
  const [files, setFiles] = useState();
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const router = useHistory();
  const routerParams = useParams();
  const { id } = routerParams;
  const dispatch = useDispatch();

  const [isSubmit, setIsSubmit] = useState(false);
  const { register, reset, watch, control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(ballotSchema),
  });

  const watchFiles = watch('files');
  const watchRemovedFiles = watch('file_ids_remove');

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

  useEffect(() => {
    dispatch(
      getBallotDetail(id, res => {
        if (res.start_date && res.start_time && res.end_date && res.end_time) {
          const start = new Date(`${res.start_date} ${res.start_time}`);
          const end = new Date(`${res.end_date} ${res.end_time}`);
          setStartDate(start);
          setStartTime(start);
          setEndDate(end);
          setEndTime(end);
        } else if (res.time_end) {
          const start = new Date(res.created_at);
          const end = new Date(res.time_end);
          setStartDate(start);
          setStartTime(start);
          setEndDate(end);
          setEndTime(end);
        }
        setBallot(res);
        setFiles(res.files);
        reset({
          id: res.id,
          title: res.title,
          description: res.description,
          files: [],
          file_ids_remove: [],
        });
      })
    );
  }, [id]);

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
      updateBallot(
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

  const removeFile = (file, index) => {
    if (file?.id) {
      const temp = watchRemovedFiles || [];
      temp.push(file?.id);
      setValue('file_ids_remove', temp);
    } else {
      const temp = watchFiles || [];
      temp.splice(index, 1);
      setValue('files', temp);
    }
    files.splice(index, 1);
    setFiles([...files]);
  };

  const appendFiles = e => {
    const fileArr = Array.from(e.target.files);
    const temp = watchFiles || [];
    temp.push(...fileArr);
    setValue('files', temp);
    setFiles([...files, ...fileArr]);
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mb-3">
              <BackButton href="/admin/ballots" text="Cancel" force />
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                Edit Ballot {ballot?.title}
              </h3>
            </div>
          </div>
          <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
            <div className="lg:pr-card">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <input {...register('file_ids_remove')} hidden />
                  <div className="absolute bottom-1 right-0 flex">
                    {files &&
                      Array.from(files).map((file, index) => (
                        <div
                          key={index}
                          className="flex mt-5 items-center text-dark3 ml-5"
                        >
                          <IconX
                            className="mr-2.5 cursor-pointer"
                            style={{ fontSize: '10px' }}
                            onClick={() => removeFile(file, index)}
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
                  >
                    Edit &amp; Begin Voting
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

export default LoadingScreen(AdminEditBallot, 'final-admin', 'ballots');
