import { useRouter } from 'next/router';
import { useState } from 'react';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import VerifyNodeOwnershipFirstStep from '../../components/onboard/verify-node-ownership/first-step';
import VerifyNodeOwnershipSecondStep from '../../components/onboard/verify-node-ownership/second-step';
import VerifyNodeOwnershipThirdStep from '../../components/onboard/verify-node-ownership/third-step';

const VerifyNodeOwnership = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [publicAddressVerified, setPublicAddressVerified] = useState(false);
  const [signedFileUploaded, setSignedFileUploaded] = useState(false);
  const [messageFileStatus, setMessageFileStatus] = useState('checking');

  const router = useRouter();

  const totalSteps = 3;

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
      return 'Complete';
    }

    return 'Next';
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <VerifyNodeOwnershipFirstStep
          onSubmit={publicAddress => {
            setPublicAddressVerified(true);
          }}
          isVerified={publicAddressVerified}
        />
      );
    }
    if (currentStep === 2) {
      return (
        <VerifyNodeOwnershipSecondStep
          isUploaded={signedFileUploaded}
          onUpload={() => setSignedFileUploaded(true)}
          onContinue={handleNext}
        />
      );
    }
    if (currentStep === 3) {
      setTimeout(() => {
        setMessageFileStatus('succeed');
      }, 3000);
      return (
        <VerifyNodeOwnershipThirdStep
          status={messageFileStatus}
          onContinue={handleNext}
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

    return true;
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

export default VerifyNodeOwnership;
