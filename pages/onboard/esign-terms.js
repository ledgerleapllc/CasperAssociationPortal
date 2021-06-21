import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import EsignTermsFirstStep from '../../components/onboard/esign-terms/first-step';
import EsignTermsSecondStep from '../../components/onboard/esign-terms/second-step';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import { helloSignRequest } from '../../shared/redux-saga/onboard/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { updateUser } from '../../shared/redux-saga/auth/actions';

// Create the HelloSign Embedded instance.
// Only do this once!

const EsignTerms = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [client, setClient] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const HelloSign = require("hellosign-embedded");

    setClient(
      new HelloSign({
        clientId: '986d4bc5f54a0b9a96e1816d2204a4a0',
      })
    );
  }, []);

  useEffect(() => {
    if (client) {
      client.on('sign', () => {
        // data: signatureId
        client.close();
        setCurrentStep(currentStep + 1);
      });
    }
  }, [client]);

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
      router.push('/onboard');
      dispatch(
        updateUser({
          signature_request_id: true,
        })
      );
    } else if (currentStep === 1) {
      dispatch(
        helloSignRequest(res => {
          // setCurrentStep(currentStep + 1);
          client.open(res.data.url, {
            clientId: '986d4bc5f54a0b9a96e1816d2204a4a0',
            skipDomainVerification: true,
          });
        })
      );
    }
  };

  const handleByPass = () => {
    dispatch(
      helloSignRequest(res => {
        setCurrentStep(currentStep + 1);
      })
    );
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
        <>
          <EsignTermsFirstStep
            documents={documents}
            selectedDocument={selectedDocument}
            onDocumentSelect={document =>
              setSelectedDocument(
                selectedDocument === document ? null : document
              )
            }
          />
          <div className="mt-8 text-primary">
            <a className="cursor-pointer" onClick={handleByPass}>
              By Pass
            </a>
          </div>
        </>
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

export default LoadingScreen(EsignTerms, 'onboarding');
