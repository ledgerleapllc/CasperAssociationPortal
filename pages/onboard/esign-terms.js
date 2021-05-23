import { useState } from 'react';
import { useRouter } from 'next/router';
import AppFooter from '../../components/Layouts/app-footer';
import AppHeader from '../../components/Layouts/app-header';
import EsignTermsFirstStep from '../../components/Onboard/EsignTerms/FirstStep';
import EsignTermsSecondStep from '../../components/Onboard/EsignTerms/SecondStep';
import OnboardStepper from '../../components/Onboard/OnboardStepper';

const EsignTerms = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const router = useRouter();

  const totalSteps = 2;
  const documents = ['Doc1', 'Doc2', 'Doc3', 'Doc4'];

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
        <EsignTermsFirstStep
          documents={documents}
          selectedDocument={selectedDocument}
          onDocumentSelect={document =>
            setSelectedDocument(selectedDocument === document ? null : document)
          }
        />
      );
    }

    return <EsignTermsSecondStep onContinue={handleNext} />;
  };

  const getNextButtonVisibility = () => {
    if (currentStep === 1) {
      return !!selectedDocument;
    }

    return true;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow md:flex md:items-center justify-center mt-12 md:mt-0">
          <OnboardStepper
            title="Esign Terms"
            description="You must read and agree to the terms of service before continuing to the portal"
            imageUrl="/images/img_signature_blur.png"
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

export default EsignTerms;
