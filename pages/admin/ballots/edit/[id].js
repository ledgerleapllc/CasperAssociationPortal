import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useState, useEffect } from 'react';
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
  time: yup.number().typeError('Time is required').required('Time is required'),
  time_unit: yup.string().required('Time unit is required'),
});

const AdminEditBallot = () => {
  const [ballot, setBallot] = useState();
  const [files, setFiles] = useState();
  const { id } = router.query;
  const dispatch = useDispatch();

  const [isSubmit, setIsSubmit] = useState(false);
  const { register, reset, watch, control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(ballotSchema),
  });
  const watchUnit = watch('time_unit');
  const watchFiles = watch('files');
  const watchRemovedFiles = watch('file_ids_remove');

  useEffect(() => {
    dispatch(
      getBallotDetail(id, res => {
        setBallot(res);
        setFiles(res.files);
        reset({
          id: res.id,
          title: res.title,
          description: res.description,
          time: res.time,
          time_unit: res.time_unit,
          files: [],
          file_ids_remove: [],
        });
      })
    );
  }, [id]);

  const onSubmit = data => {
    setIsSubmit(true);
    dispatch(
      updateBallot(
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
                <p className="py-4 text-sm text-gray">
                  Choose a duration for your ballot:
                </p>
                <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row items-center justify-between">
                  <div className="flex">
                    <div
                      className="mr-4 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md"
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
                    <div
                      className="border border-gray1 c-select flex items-center relative focus:outline-none shadow-md"
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
                  </div>
                  <Button
                    primary
                    type="submit"
                    disabled={isSubmit}
                    isLoading={isSubmit}
                    sizeSpinner={20}
                  >
                    Edit & Begin Voting
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
