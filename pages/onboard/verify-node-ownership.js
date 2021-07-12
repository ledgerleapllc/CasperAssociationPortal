import { useRouter } from 'next/router';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import VerifyNodeOwnershipFirstStep from '../../components/onboard/verify-node-ownership/first-step';
import VerifyNodeOwnershipSecondStep from '../../components/onboard/verify-node-ownership/second-step';
import VerifyNodeOwnershipThirdStep from '../../components/onboard/verify-node-ownership/third-step';
import { updateUser } from '../../shared/redux-saga/auth/actions';

const VerifyNodeOwnership = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [publicAddressVerified, setPublicAddressVerified] = useState(false);
  const [signedFileUploaded, setSignedFileUploaded] = useState(null);
  const [messageFileStatus, setMessageFileStatus] = useState('checking');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const uploadFileRef = useRef(null);

  useEffect(() => {
    // Close upload dialog when click outside
    document.addEventListener('click', doClickOutside, true);
    return () => {
      document.removeEventListener('click', doClickOutside, true);
    };
  }, []);

  const handleUpload = action => {
    if (action === 'open') {
      const content = document.getElementById('custom-content');
      content.classList.add('remove-animation');
      setShowUploadModal(true);
    } else if (action === 'close') {
      setShowUploadModal(false);
    }
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  const router = useRouter();

  const totalSteps = 3;

  const handlePrev = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setSignedFileUploaded(null);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === totalSteps && messageFileStatus === 'succeed') {
      router.push('/onboard');
      dispatch(
        updateUser({
          node_verified_at: true,
        })
      );
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const getNextButtonTitle = () => {
    if (currentStep === totalSteps) {
      return 'Complete';
    }

    return 'Next';
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <VerifyNodeOwnershipFirstStep
          setPublicAddressVerified={setPublicAddressVerified}
          isVerified={publicAddressVerified}
        />
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <VerifyNodeOwnershipSecondStep
            isUploaded={signedFileUploaded}
            onUpload={() => handleUpload('open')}
            onContinue={handleNext}
          />
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
                          Upload Signed File
                        </button>
                        <span className="hidden lg:block">
                          Or Drap File Here
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
        </>
      );
    }
    if (currentStep === 3) {
      return (
        <VerifyNodeOwnershipThirdStep
          newFile={signedFileUploaded}
          onContinue={handleNext}
          setMessageFileStatus={setMessageFileStatus}
        />
      );
    }

    return <></>;
  };

  const getNextButtonVisibility = () => {
    if (currentStep === 1) {
      return publicAddressVerified;
    }
    if (currentStep === 2) {
      return signedFileUploaded;
    }
    if (currentStep === 3) {
      return messageFileStatus === 'succeed';
    }

    return true;
  };

  const doClickOutside = e => {
    const { target } = e;
    if (!uploadFileRef?.current?.contains(target)) {
      handleUpload('close');
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div
        className="
          flex flex-col w-full
          p-4
          lg:max-w-screen-xl lg:p-9
          2xl:max-w-screen-2xl
        "
      >
        <AppHeader theme="dark" />
        <div className="flex-grow lg:flex lg:items-center justify-center mt-12 lg:mt-0">
          <OnboardStepper
            title="Verify Node Ownership"
            description="Please choose Sign In if you have an existing account or Register if this is your first time here."
            imageUrl="/images/img_ownership_blur.png"
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepContent={getStepContent()}
            showNextButton={getNextButtonVisibility()}
            showContinueButton={getNextButtonVisibility()}
            continueButtonTitle={getNextButtonTitle()}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default LoadingScreen(VerifyNodeOwnership, 'onboarding');
