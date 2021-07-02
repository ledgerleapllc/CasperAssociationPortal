import { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconCheckCircle from '../../../public/images/ic_check_circle.svg';
import { handleViewGuide } from '../../../shared/redux-saga/onboard/actions';
import { LoadingButton } from '../../partials';

const VerifyNodeOwnershipSecondStep = ({
  isUploading,
  isUploaded,
  onUpload,
  onContinue,
}) => {
  const dispatch = useDispatch();
  const [steps, setSteps] = useState({
    downloaded: false,
    seenguide: false,
    uploaded: false,
  });

  const [isViewGuideLoading, setIsViewGuideLoading] = useState(false);

  const setDoneDownload = () => {
    setSteps({
      ...steps,
      downloaded: true,
    });
  };

  const setSeenGuide = () => {
    setIsViewGuideLoading(true);
    dispatch(
      handleViewGuide(undefined, () => {
        setSteps({
          ...steps,
          seenguide: true,
        });
        setIsViewGuideLoading(false);
      })
    );
  };

  return (
    <div className="pt-8">
      <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
        Thanks
      </p>
      <p className="text-sm mt-2 text-dark1 whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-4s">
        {`Thanks! Now we need to verify this node address is owned or controlled by you. Please follow\nthe steps below:`}
      </p>
      <div className="mt-12 mr-8">
        <div className="flex animate__animated animate__fadeInUp animate__delay-6s">
          <p className="text-2xl -mt-2 md:mt-0">1.</p>
          <div className="flex-grow md:flex ml-8 md:items-end">
            <p className="text-sm md:flex-grow pb-1">
              Download this message file for signing.
            </p>
            <button
              type="button"
              className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none"
              onClick={setDoneDownload}
            >
              <a href="/files/SAMPLE.pdf" download>
                Download
              </a>
            </button>
          </div>
        </div>
        <div className="flex my-8 animate__animated animate__fadeInUp animate__delay-7s">
          <p className="text-2xl -mt-2 md:mt-0">2.</p>
          <div className="flex-grow md:flex ml-8 md:items-end">
            <p className="text-sm md:flex-grow pb-1">
              Sign the message with your node. See guide for more details.
            </p>
            <LoadingButton
              isLoading={isViewGuideLoading}
              className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
              onClick={setSeenGuide}
              sizeSpinner={15}
              disabled={!steps.downloaded || isViewGuideLoading}
            >
              View Guide
            </LoadingButton>
          </div>
        </div>
        <div className="flex animate__animated animate__fadeInUp animate__delay-8s">
          <p className="text-2xl -mt-2 md:mt-0">3.</p>
          <div className="flex-grow md:flex ml-8 md:items-end">
            <p className="text-sm md:flex-grow pb-1">
              Upload the signed file for the system to check.
            </p>
            <div className="flex">
              <LoadingButton
                isLoading={isUploading}
                className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={onUpload}
                sizeSpinner={15}
                disabled={!steps.downloaded || !steps.seenguide || isUploading}
              >
                Upload
              </LoadingButton>
              {isUploaded && (
                <IconCheckCircle className="-mr-8 ml-4 mt-2 text-primary text-base" />
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary focus:outline-none mt-12 disabled:opacity-30 md:hidden"
        disabled={!isUploaded}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default VerifyNodeOwnershipSecondStep;
