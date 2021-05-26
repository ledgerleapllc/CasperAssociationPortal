import { useState } from 'react';
import { useRouter } from 'next/router';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import SubmitKYCFirstStep from '../../components/onboard/submit-kyc/first-step';

const SubmitKYC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitType, setSubmitType] = useState(null);

  const router = useRouter();

  const totalSteps = 2;

  const handlePrev = () => {
    if (currentStep === 1) {
      router.back();
    } else {
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
          onIndividual={() => setSubmitType('individual')}
          onEntity={() => setSubmitType('entity')}
        />
      );
    }

    return <></>;
  };

  const getNextButtonVisibility = () => {
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
            hideContinueButton
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
