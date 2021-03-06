import { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconCheckCircle from '../../../public/images/ic_check_circle.svg';
import { downloadMessageContent } from '../../../shared/redux-saga/onboard/actions';
import { Button } from '../../partials';

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

  const [isDownload, setIsDownload] = useState(false);

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
          setSteps({
            ...steps,
            downloaded: true,
          });
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
    setSteps({
      ...steps,
      seenguide: true,
    });
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
              disabled={!steps.downloaded}
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
                isLoading={isUploading}
                className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={onUpload}
                sizeSpinner={15}
                disabled={!steps.downloaded || !steps.seenguide || isUploading}
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
        className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary focus:outline-none mt-12 disabled:opacity-30 lg:hidden"
        disabled={!isUploaded}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default VerifyNodeOwnershipSecondStep;
