import { useRouter } from 'next/router';
import { useState } from 'react';
import AppFooter from '../../components/Layouts/app-footer';
import AppHeader from '../../components/Layouts/app-header';
import OnboardStepper from '../../components/Onboard/OnboardStepper';
import VerifyNodeOwnershipFirstStep from '../../components/Onboard/VerifyNodeOwnership/FirstStep';

const VerifyNodeOwnership = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  const totalSteps = 6;

  const handlePrev = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === totalSteps) {
      router.push('/onboard/submit-kyc');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const getNextButtonTitle = () => {
    if (currentStep === totalSteps) {
      return 'Continue';
    }

    return 'Next';
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return <VerifyNodeOwnershipFirstStep />;
    }

    return <></>;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow md:flex md:items-center justify-center mt-12 md:mt-0">
          <OnboardStepper
            title="Verify Node Ownership"
            description="Please choose Sign In if you have an existing account or Register if this is your first time here."
            imageUrl="/images/img_ownership_blur.png"
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepContent={getStepContent()}
            showNextButton
            showContinueButton
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

export default VerifyNodeOwnership;
