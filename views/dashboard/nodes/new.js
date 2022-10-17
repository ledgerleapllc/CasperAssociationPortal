/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ReactLoading from 'react-loading';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import IconCheckCircle from '../../../public/images/ic_check_circle.svg';
import IconX from '../../../public/images/ic_x.svg';
import { Button, LoadingButton } from '../../../components/partials';
import {
  checkPublicAddress,
  downloadMessageContent,
  verifyFileCasperSigner2,
} from '../../../shared/redux-saga/onboard/actions';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const DashboardNodesNew = () => {
  const dispatch = useDispatch();
  const { formState, register, handleSubmit, watch } = useForm();
  const [signedFileUploaded, setSignedFileUploaded] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setPublicAddressVerified] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [seenguide, setSeenGuideState] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [publicAddress, setPublicAddress] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const uploadFileRef = useRef(null);
  const [status, setStatus] = useState('checking');
  const regex_ed22519 = /^01[0-9a-fA-F]{64}$/;
  const regex_secp256k1 = /^02[0-9a-fA-F]{66}$/;

  const check_validator_public_key_regex = pub_key => {
    if (regex_ed22519.test(pub_key)) {
      return 'valid_ed25519';
    }
    if (regex_secp256k1.test(pub_key)) {
      return 'valid_secp256k1';
    }
    return false;
  };

  const watchAddress = watch('publicAddress');

  const handleUpload = action => {
    if (action === 'open') {
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
    if (status === 'checking' && currentStep === 3) {
      if (!signedFileUploaded || !publicAddress) {
        return;
      }
      dispatch(
        verifyFileCasperSigner2(
          {
            newFile: signedFileUploaded,
            publicAddress,
          },
          () => {
            setStatus('succeed');
          },
          () => {
            setStatus('failed');
          }
        )
      );
    }
  }, [status, currentStep]);

  useEffect(() => {
    if (check_validator_public_key_regex(watchAddress) === false)
      setPublicAddressVerified(false);
  }, [watchAddress]);

  useEffect(() => {
    document.addEventListener('click', doClickOutside, true);
    return () => {
      document.removeEventListener('click', doClickOutside, true);
    };
  }, []);

  const clickNext = () => {
    if (!publicAddress || !isVerified) {
      return;
    }
    setCurrentStep(2);
  };

  const onSubmit = data => {
    const pubAddress = data.publicAddress;
    setIsVerifying(true);
    dispatch(
      checkPublicAddress(
        {
          pubAddress,
        },
        () => {
          setPublicAddressVerified(true);
          setPublicAddress(pubAddress);
        },
        () => {
          setIsVerifying(false);
        }
      )
    );
  };

  const setDoneDownload = () => {
    setIsDownload(true);
    dispatch(
      downloadMessageContent(
        res => {
          const url = URL.createObjectURL(new Blob([res]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'message.txt');
          document.body.appendChild(link);
          link.click();
          setDownloaded(true);
          setIsDownload(false);
        },
        () => {
          setIsDownload(false);
        }
      )
    );
  };

  const setSeenGuide = () => {
    window.open(
      'https://github.com/ledgerleapllc/caspersignerverifier',
      '_blank'
    );
    setSeenGuideState(true);
  };

  const onUpload = () => {
    handleUpload('open');
  };

  const onDrop = useCallback(acceptedFiles => {
    const fileConvert = acceptedFiles[0];
    const fileName = 'signature';
    const optionNewFile = {
      lastModified: fileConvert.lastModified,
      lastModifiedDate: fileConvert.lastModifiedDate,
      type: fileConvert.type,
    };
    const newFile = new File([fileConvert], fileName, optionNewFile);
    handleUpload('close');
    setShowUploadModal(false);
    setSignedFileUploaded(newFile);
    setIsUploaded(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  const onContinue = () => {
    setCurrentStep(3);
  };

  const clickTryAgain = e => {
    e.preventDefault();
    window.location.href = '/dashboard/nodes/new';
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2.5xl whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-2s">
              Please enter the public address
              <HtmlTooltip
                title={
                  <div>
                    <Typography color="inherit">
                      The public address is your Public Key
                    </Typography>
                  </div>
                }
              >
                <InfoIcon
                  style={{ cursor: 'pointer' }}
                  color="secondary"
                  fontSize="small"
                />
              </HtmlTooltip>{' '}
              of your validator node and press submit
            </p>
            <div className="lg:relative mt-12 animate__animated animate__fadeInUp animate__delay-6s">
              <input
                type="text"
                readOnly={isVerified}
                className="w-full h-16 text-xl px-7 lg:pr-72 rounded-full shadow-md focus:outline-none"
                name="publicAddress"
                {...register('publicAddress', {
                  validate: value =>
                    check_validator_public_key_regex(value) !== false ||
                    'This is not a valid address',
                })}
              />
              <span className="lg:absolute right-0">
                <LoadingButton
                  type="submit"
                  isDisabled={isVerifying || !watchAddress}
                  isLoading={isVerifying}
                  title="Verify"
                  className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary focus:outline-none mt-2 lg:mt-0 disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </span>
              {isVerified && (
                <IconCheckCircle className="absolute bottom-4 -right-20 hidden lg:block text-primary text-3xl" />
              )}
            </div>
            {formState.errors?.publicAddress && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.publicAddress?.message}
              </p>
            )}
          </form>
          <div
            style={{ marginTop: '60px' }}
            className="flex justify-between border-b border-gray pb-2"
          >
            <Link
              to="/dashboard/nodes"
              className="text-center ml-4 text-sm text-dark3 flex flex-col items-center justify-end focus:outline-none animate__animated animate__fadeInUp animate__delay-2s"
            >
              <img
                src="/images/ic_prev_circle_gradient_small.svg"
                alt="back"
                className="mb-1"
              />
              Back
            </Link>
            <div className="animate__animated animate__fadeInUp animate__delay-2s">
              <button
                type="button"
                className="text-center ml-5 text-sm text-dark3 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                disabled={!publicAddress || !isVerified}
                onClick={clickNext}
              >
                <img
                  src="/images/ic_next_circle_gradient_large.svg"
                  alt="go to esign"
                  className="mb-1"
                />
                Next
              </button>
            </div>
          </div>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          {showUploadModal && (
            <>
              <div
                style={{ zIndex: 150 }}
                className="backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0"
              >
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
                          Upload Signed File
                        </button>
                        <span className="hidden lg:block">
                          Or Drop File Here
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="transform -translate-x-1/2 absolute left-1/2 bottom-6 text-primary text-xs underline"
                    onClick={() => handleUpload('close')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </>
          )}
          <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
            Thanks
          </p>
          <p className="text-sm mt-2 text-dark1 whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-4s">
            {`Thanks! Now we need to verify this node address is owned or controlled by you. Please follow\nthe steps below:`}
          </p>
          <div className="mt-12 mr-8">
            <div className="flex animate__animated animate__fadeInUp animate__delay-6s">
              <p className="text-2xl -mt-2 lg:mt-0">1.</p>
              <div className="flex-grow lg:flex ml-8 lg:items-end">
                <p className="text-sm lg:flex-grow pb-1">
                  Download this message file for signing.
                </p>
                <Button
                  isLoading={isDownload}
                  className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                  onClick={setDoneDownload}
                  sizeSpinner={15}
                  disabled={isDownload}
                >
                  Download
                </Button>
              </div>
            </div>
            <div className="flex my-8 animate__animated animate__fadeInUp animate__delay-7s">
              <p className="text-2xl -mt-2 lg:mt-0">2.</p>
              <div className="flex-grow lg:flex ml-8 lg:items-end">
                <p className="text-sm lg:flex-grow pb-1">
                  Sign the message with your node.
                </p>
                <Button
                  className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                  onClick={setSeenGuide}
                  sizeSpinner={15}
                  disabled={!downloaded}
                >
                  Go to GitHub
                </Button>
              </div>
            </div>
            <div className="flex animate__animated animate__fadeInUp animate__delay-8s">
              <p className="text-2xl -mt-2 lg:mt-0">3.</p>
              <div className="flex-grow lg:flex ml-8 lg:items-end">
                <p className="text-sm lg:flex-grow pb-1">
                  Upload the signed file for the system to check.
                </p>
                <div className="flex">
                  <Button
                    isLoading={false}
                    className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                    onClick={onUpload}
                    sizeSpinner={15}
                    disabled={!downloaded || !seenguide}
                  >
                    Upload
                  </Button>
                  {isUploaded && (
                    <IconCheckCircle className="-mr-8 ml-4 mt-2 text-primary text-base" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary focus:outline-none mt-12 disabled:opacity-30"
            disabled={!isUploaded}
            onClick={onContinue}
          >
            Continue
          </button>
        </>
      );
    }
    if (currentStep === 3) {
      if (status === 'checking') {
        return (
          <>
            <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
              Thank you
            </p>
            <p className="text-sm mt-2 text-dark1 whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-4s">
              We are checking your message file. Do not exit this screen.
            </p>
            <div className="lg:relative mt-24 animate__animated animate__fadeIn animate__delay-6s">
              <ReactLoading
                type="spinningBubbles"
                color="#FF473E"
                width={137}
                height={141}
              />
            </div>
          </>
        );
      }
      if (status === 'succeed') {
        return (
          <>
            <IconCheckCircle className="text-6xl 2xl:text-5xl text-success" />
            <p className="mt-12 text-2.5xl">
              Your node is: <span className="text-success">Verified</span>
            </p>
            <p className="text-sm text-dark1 mt-1">
              Way to go! Your signed message has verified your node. This step
              is complete.
            </p>
          </>
        );
      }
      if (status === 'failed') {
        return (
          <>
            <div className="text-5xl">
              <IconX className="text-primary" />
            </div>
            <p className="mt-12 text-2.5xl">
              Your node is: <span className="text-primary">Not Verified</span>
            </p>
            <p className="text-sm text-dark1 mt-1">
              Please go back and start the previous step again. If this has
              happened more than once, contact support.
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <a
                role="button"
                tabIndex={0}
                style={{ padding: '4px 3rem', marginTop: '15px' }}
                className="text-white flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                onClick={clickTryAgain}
              >
                Try Again
              </a>
            </div>
          </>
        );
      }
    }
    return null;
  };

  return (
    <LayoutDashboard>
      <div className="w-full xl:w-4/5 px-8 py-5">{getStepContent()}</div>
    </LayoutDashboard>
  );
};

export default LoadingScreen(DashboardNodesNew, 'final-all');
