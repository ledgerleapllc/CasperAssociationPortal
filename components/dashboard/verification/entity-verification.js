/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import IconX from '../../../public/images/ic_x.svg';
import IconFeatureUpLoad from '../../../public/images/ic_feature_upload.svg';
import ArrowIcon from '../../../public/images/ic_arrow_down.svg';
import { DateTimePicker, LoadingButton } from '../../partials';
import { NAME_PATTERN } from '../../../helpers/form-validation';
import Countries from '../../../public/json/country.json';
import {
  uploadVerificationDocs,
  submitDetail,
} from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { Shuftipro } from '../../onboard/submit-kyc/shuftipro';
import { updateUser } from '../../../shared/redux-saga/auth/actions';
import { useDialog } from '../../partials/dialog';

export const EntityVerification = ({ goNext }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const user = useSelector(state => state.authReducer.userInfo);
  const [isReadOnlyFirstName, setIsReadOnlyFirstName] = useState(true);
  const [isReadOnlyLastName, setIsReadOnlyLastName] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { setDialog } = useDialog();
  const uploadFileRef = useRef(null);

  const {
    control,
    formState,
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const watchRegisterCountry = watch('entity_register_country');
  const watchPageIsRepresentative = watch('page_is_representative');

  const handleUpload = action => {
    if (action === 'open') {
      const content = document.getElementById('custom-content');
      content.classList.add('remove-animation');
      setShowUploadModal(true);
    } else if (action === 'close') {
      setShowUploadModal(false);
    }
  };

  const doClickOutside = e => {
    const { target } = e;
    if (!uploadFileRef?.current?.contains(target)) {
      handleUpload('close');
    }
  };

  useEffect(() => {
    // Close upload dialog when click outside
    document.addEventListener('click', doClickOutside, true);
    return () => {
      document.removeEventListener('click', doClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (uploadedDocuments.length) {
      setValue('first_name', user?.fullInfo?.first_name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('last_name', user?.fullInfo?.last_name, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [user, uploadedDocuments]);

  const onDrop = acceptedFiles => {
    const newFiles = [];
    acceptedFiles?.forEach(file => {
      if (uploadedDocuments?.length) {
        const index = uploadedDocuments?.findIndex(
          item => item.name === file.name
        );

        if (index === -1) {
          newFiles.push(file);
        }
      } else {
        newFiles.push(file);
      }
    });

    setUploadedDocuments(pre => [...pre, ...newFiles]);
    handleUpload('close');
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop,
    accept: '.pdf, .doc, .docx, .txt, .rtf',
  });

  const removeFile = (_uploadFiles, index) => {
    _uploadFiles.splice(index, 1);
    setUploadedDocuments(() => [..._uploadFiles]);
    if (!_uploadFiles.length) {
      reset({ page_is_representative: '' });
    }
  };

  const handleBeginKYC = () => {
    setDialog({
      type: 'Dialog',
      settings: {
        style: {
          height: '90vh',
          width: '90%',
          maxWidth: '800px',
          overflow: 'scroll',
        },
        hideButton: true,
      },
      data: {
        title: 'ID Verification',
        content: <Shuftipro />,
      },
      afterClosed: value => {
        if (value) {
          dispatch(
            updateUser({
              status: 'pending',
            })
          );
          goNext();
        }
      },
    });
  };

  const onSubmit = data => {
    setIsSubmitting(true);
    data.type = 'entity';

    dispatch(
      uploadVerificationDocs(
        uploadedDocuments,
        res => {
          // setUploadedDocuments(res);
          const document = res.find(
            item => item.name === data.page_is_representative
          );
          data.page_is_representative = document.id;
          dispatch(
            submitDetail(
              data,
              () => {
                setIsSubmitting(false);
                handleBeginKYC();
              },
              () => {
                setIsSubmitting(false);
              }
            )
          );
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <div
      id="custom-content"
      className="animate__animated animate__fadeInLeft animate__delay-8s"
    >
      <p className="text-lg mt-2 text-dark1">You registered as an entity</p>
      <p className="text-medium mt-2 text-dark1 font-light">
        Please upload the entity's operating documents. Example of operating{' '}
        documents include: certification of incorporation, business license,{' '}
        government issued business registration document etc.
        <br />
        <br />
        <b>NOTE:</b> The document you upload must contain the name of one of the{' '}
        owners, executives or directors of the company. In the next step, you'll{' '}
        be required to upload this person's government issued photo ID (such as{' '}
        a passport) to complete the verification process. You can upload{' '}
        multiple documents if necessary.
      </p>
      <div className="mt-10">
        <button
          className="text-lg text-white w-full lg:w-64 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md flex items-center justify-center"
          type="button"
          onClick={() => handleUpload('open')}
          disabled={isSubmitting}
        >
          <IconFeatureUpLoad className="mr-2" />
          <span>Upload Docs</span>
        </button>
        {!!uploadedDocuments?.length && (
          <>
            {uploadedDocuments.map((item, index) => (
              <div className="flex mt-5 items-center" key={item.name}>
                <button
                  className="pr-3 w-7 focus:outline-none"
                  onClick={() => removeFile(uploadedDocuments, index)}
                  type="button"
                >
                  <IconX className="text-primary" />
                </button>
                <span className="text-sm text-primary">{item.name}</span>
              </div>
            ))}
            <div className="animate__animated animate__fadeInUp animate__delay-1s">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full lg:w-10/12 lg:justify-between lg:flex mt-5 lg:space-x-5">
                  <div className="w-full lg:w-5/12 mb-10">
                    <label>
                      On what document is the representative listed?
                    </label>
                    <div className="relative w-10/12 lg:flex-1 flex items-center justify-between px-7 mt-2 h-14 rounded-full shadow-md">
                      <select
                        className={`max-w-60 cursor-pointer focus:outline-none ${
                          watchPageIsRepresentative ? 'text-black' : 'text-gray'
                        }`}
                        placeholder="Select..."
                        {...register('page_is_representative', {
                          required:
                            'Please choose the page is the representative listed',
                        })}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {uploadedDocuments.map((file, index) => (
                          <option value={file.name} key={index}>
                            {file.name}
                          </option>
                        ))}
                      </select>
                      <ArrowIcon className="absolute right-7" />
                    </div>
                    {formState.errors?.page_is_representative && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.page_is_representative?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-5/12 mb-10">
                    <label>On what page is the representative listed?</label>
                    <div className="relative w-full lg:flex-1 flex items-center justify-between mt-2">
                      <input
                        type="number"
                        className="w-5/12 h-14 px-7 rounded-full shadow-md focus:outline-none"
                        {...register('page_number', {
                          required: 'Page number is required',
                          validate: value => {
                            if (Number.isNaN(value))
                              return 'Page number is invalid';
                            if (parseFloat(value) !== parseInt(value, 10))
                              return 'Page number is invalid';
                            if (parseInt(value, 10) <= 0)
                              return 'Page number is invalid';
                            return true;
                          },
                        })}
                      />
                    </div>
                    {formState.errors?.page_number && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.page_number?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-10/12 lg:justify-between lg:flex mt-5 lg:space-x-5">
                  <div className="w-full lg:w-5/12 mb-10">
                    <label>First Name of Entity Representative</label>
                    <div className="w-full lg:flex-1 flex items-center justify-between">
                      <input
                        type="text"
                        className="w-10/12 h-14 px-7 rounded-full shadow-md focus:outline-none"
                        {...register('first_name', {
                          required: 'First name is required',
                          pattern: {
                            message: 'First name is invalid',
                            value: NAME_PATTERN,
                          },
                        })}
                        readOnly={isReadOnlyFirstName}
                      />
                      <button
                        type="button"
                        className="text-primary focus:outline-none"
                        onClick={() => {
                          setIsReadOnlyFirstName(false);
                          setFocus('first_name');
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    {formState.errors?.first_name && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.first_name?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-5/12 mb-10">
                    <label>Last Name of Entity Representative</label>
                    <div className="w-full lg:flex-1 flex items-center justify-between">
                      <input
                        type="text"
                        className="w-10/12 h-14 px-7 rounded-full shadow-md focus:outline-none"
                        {...register('last_name', {
                          required: 'Last name is required',
                          pattern: {
                            message: 'Last name is invalid',
                            value: NAME_PATTERN,
                          },
                        })}
                        readOnly={isReadOnlyLastName}
                      />
                      <button
                        type="button"
                        className="text-primary focus:outline-none"
                        onClick={() => {
                          setIsReadOnlyLastName(false);
                          setFocus('last_name');
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    {formState.errors?.last_name && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.last_name?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-10/12 lg:justify-between lg:flex mt-5 lg:space-x-5">
                  <div className="w-full lg:w-5/12 mb-10">
                    <label>Entity Registration Country</label>
                    <div className="relative w-10/12 lg:flex-1 flex items-center justify-between px-7 mt-2 h-14 rounded-full shadow-md">
                      <select
                        className={`max-w-60 cursor-pointer focus:outline-none ${
                          watchRegisterCountry ? 'text-black' : 'text-gray'
                        }`}
                        placeholder="Select..."
                        {...register('country_citizenship', {
                          required: 'Entity Registration Country is required',
                        })}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selected
                        </option>
                        {Countries.map((country, index) => (
                          <option value={country.code} key={index}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <ArrowIcon className="absolute right-7" />
                    </div>
                    {formState.errors?.country_citizenship && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.country_citizenship?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-5/12 mb-10">
                    <label>Representative Date of Birth</label>
                    <Controller
                      name="dob"
                      control={control}
                      rules={{
                        required: 'Representative Date of Birth is required',
                      }}
                      defaultValue=""
                      render={({ field: { onChange: onChangeDate } }) => (
                        <DateTimePicker
                          onChange={onChangeDate}
                          className="w-10/12"
                          placeholder="DOB (mm/dd/yyyy) *"
                        />
                      )}
                    />
                    {formState.errors?.dob && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.dob?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex mt-5 animate__animated animate__fadeInUp animate__delay-7s">
                  <button
                    type="button"
                    className="flex items-baseline focus:outline-none"
                    onClick={() => setConfirmed(pre => !pre)}
                  >
                    <img
                      src={`/images/${
                        confirmed ? 'ic_check.svg' : 'ic_uncheck.svg'
                      }`}
                      alt="understand checkbox"
                      width={18}
                      height={18}
                    />
                  </button>
                  <p className="flex-1 text-dark1 text-sm ml-4 break-words">
                    I affirm the above information is correct.
                  </p>
                </div>
                <LoadingButton
                  type="submit"
                  isDisabled={!formState.isValid || !confirmed || isSubmitting}
                  isLoading={isSubmitting}
                  title="Continue to ID Verification"
                  className="text-lg text-white w-full mt-10 lg:w-auto px-7 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                />
              </form>
            </div>
          </>
        )}
      </div>
      {showUploadModal && (
        <>
          <div className="backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0 z-50">
            <div
              className="w-full max-w-2xl shadow-2xl mx-4 relative bg-white"
              ref={uploadFileRef}
            >
              <div {...getRootProps()}>
                <div className="py-36 flex flex-col items-center justify-between border-2 border-dashed border-gray">
                  <div className="flex flex-col items-center justify-between">
                    <input {...getInputProps()} />
                    <img
                      src="/images/ic_upload.svg"
                      alt="upload"
                      className="align-middle mb-6"
                    />
                    <button
                      type="button"
                      className="mb-2.5 text-lg text-white w-full px-14 py-5 shadow-lg rounded-full bg-primary hover:opacity-40 focus:outline-none"
                    >
                      Upload Docs
                    </button>
                    <span className="hidden lg:block">Or Drop File Here</span>
                    <span className="hidden lg:block text-primary">
                      Accept jpeg, png, pdf, txt - Max File Size: 2MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </div>
  );
};
