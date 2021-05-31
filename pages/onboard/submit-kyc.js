import { useState } from 'react';
import { useRouter } from 'next/router';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import SubmitKYCFirstStep from '../../components/onboard/submit-kyc/first-step';
import SubmitKYCSecondStep from '../../components/onboard/submit-kyc/second-step';
import SubmitKYCThirdStep from '../../components/onboard/submit-kyc/third-step';
import SubmitKYCFourthStep from '../../components/onboard/submit-kyc/fourth-step';
import SubmitKYCFifthStep from '../../components/onboard/submit-kyc/fifth-step';
import SubmitKYCSixthStep from '../../components/onboard/submit-kyc/sixth-step';

const SubmitKYC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitType, setSubmitType] = useState(null);
  const [information, setInformation] = useState(null);
  const [beginKYC, setBeginKYC] = useState(null);

  const router = useRouter();

  const totalSteps = 6;

  const handlePrev = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      if (currentStep === 3) {
        setBeginKYC(false);
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === totalSteps) {
      router.push('/onboard/verify-node-ownership');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBeginKYC = () => {
    setBeginKYC(true);
  };

  const getNextButtonTitle = () => {
    if (currentStep === 1) {
      return 'Go to Esign';
    }

    return 'Continue';
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <SubmitKYCFirstStep
          onIndividual={() => {
            setSubmitType('individual');
            handleNext();
          }}
          onEntity={() => {
            setSubmitType('entity');
            handleNext();
          }}
        />
      );
    }
    if (currentStep === 2) {
      return (
        <SubmitKYCSecondStep
          onNext={handleNext}
          onChange={data => setInformation(data)}
        />
      );
    }

    if (currentStep === 3) {
      return (
        <SubmitKYCThirdStep
          beginKYC={beginKYC}
          onNext={handleNext}
          onBeginKYC={handleBeginKYC}
        />
      );
    }

    if (currentStep === 4) {
      return (
        <SubmitKYCFourthStep
          onNext={handleNext}
          onChange={data => setInformation(data)}
        />
      );
    }

    if (currentStep === 5) {
      return <SubmitKYCFifthStep onNext={() => handleNext()} />;
    }

    if (currentStep === 6) {
      return <SubmitKYCSixthStep />;
    }

    return <></>;
  };

  const getNextButtonVisibility = () => {
    if (currentStep === 3) {
      return !!beginKYC;
    }
    return true;
  };

  const getContinueButtonVisibility = () => {
    if (currentStep === 1) {
      return false;
    }

    return true;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow md:flex md:items-center justify-center mt-12 md:mt-0">
          <OnboardStepper
            title="Submit KYC"
            description="Upload your passport and utility bill here for identity and address verification."
            imageUrl="/images/img_kyc_blur.png"
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepContent={getStepContent()}
            showNextButton={getNextButtonVisibility()}
            showContinueButton={getNextButtonVisibility()}
            continueButtonTitle={getNextButtonTitle()}
            hideContinueButton={!getContinueButtonVisibility()}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default SubmitKYC;
