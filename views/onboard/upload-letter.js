import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import LetterUpload from '../../components/onboard/letter-upload/letter-upload';
import LetterResult from '../../components/onboard/letter-upload/letter-result';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import { uploadLetter } from '../../shared/redux-saga/onboard/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { updateUser } from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../../pages/_app';

const UploadLetter = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const { setLoading } = useContext(AppContext);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);

  const user = useSelector(state => state.authReducer.userInfo);
  const totalSteps = 2;

  useEffect(() => {
    if (user.letter_verified_at) {
      if (user.signature_request_id && user.node_verified_at) {
        dispatch(
          updateUser({
            period: 'final',
          })
        );
        router.push('/dashboard');
      } else {
        router.push('/onboard');
      }
      return;
    }

    if (!user?.letter_file) {
      setCurrentStep(1);
      if (user.letter_rejected_at) {
        setStatus('rejected');
      } else {
        setStatus(null);
      }
    } else {
      setCurrentStep(2);
    }
  }, [user]);

  const handlePrev = () => {
    router.back();
  };

  const handleNext = () => {
    if (currentStep === totalSteps) {
      router.push('/onboard');
      return;
    }

    setLoading(true);
    dispatch(
      uploadLetter(
        {
          newFile: selectedDocument.file,
        },
        () => {
          setLoading(false);
          dispatch(
            updateUser({
              letter_file: selectedDocument.name,
              letter_rejected_at: null,
            })
          );
          setCurrentStep(2);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <LetterUpload
          selectedDocument={selectedDocument}
          onDocumentSelect={document => {
            setSelectedDocument(
              selectedDocument === document ? null : document
            );
          }}
          status={status}
        />
      );
    }
    if (currentStep === 2) {
      return <LetterResult />;
    }
    return <></>;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow md:flex md:items-center justify-center mt-12 md:mt-0">
          <OnboardStepper
            title="Upload Letter of Motivation"
            description="Write and upload a short letter of motivation outlining why you would like to sign up."
            imageUrl="/images/img_signature_blur.png"
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepContent={getStepContent()}
            showNextButton={selectedDocument || currentStep === 2}
            showContinueButton={selectedDocument || currentStep === 2}
            continueButtonTitle="Continue"
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default LoadingScreen(UploadLetter, 'onboarding');
