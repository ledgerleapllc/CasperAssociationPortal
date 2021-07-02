import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import EsignTermsFirstStep from '../../components/onboard/esign-terms/first-step';
import EsignTermsSecondStep from '../../components/onboard/esign-terms/second-step';
import LetterUpload from '../../components/onboard/esign-terms/letter-upload';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import {
  bypassHelloSignRequest,
  helloSignRequest,
  uploadLetter,
} from '../../shared/redux-saga/onboard/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { updateUser } from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../_app';

// Create the HelloSign Embedded instance.
// Only do this once!

const EsignTerms = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [helloSignComplete, setHelloSignComplete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({
    step1: null, // null: not submit yet
    step2: null,
  });
  const [client, setClient] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    state => state?.onboardReducer?.uploadLetter
  );

  const { setLoading } = useContext(AppContext);

  const router = useRouter();

  const totalSteps = 3;
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
    } else if (currentStep === 2) {
      setLoading(true);
      dispatch(
        helloSignRequest(res => {
          // setCurrentStep(currentStep + 1);
          client.open(res.data.url, {
            clientId: process.env.HELLOSIGN_CLIENT_ID,
            skipDomainVerification: true,
          });
          setLoading(false);
        })
      );
    } else if (currentStep === 1) {
      dispatch(
        uploadLetter(
          {
            newFile: selectedDocument.step1.file,
          },
          () => {
            setCurrentStep(currentStep + 1);
          }
        )
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line global-require
    const HelloSign = require('hellosign-embedded');
    setClient(
      new HelloSign({
        clientId: process.env.HELLOSIGN_CLIENT_ID,
      })
    );
  }, []);

  useEffect(() => {
    if (client) {
      client.on('sign', () => {
        // data: signatureId
        client.close();
        setHelloSignComplete(true);
      });
    }
  }, [client]);

  useEffect(() => {
    if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }
  }, [helloSignComplete]);

  const handleByPass = () => {
    dispatch(
      bypassHelloSignRequest(res => {
        setCurrentStep(currentStep + 1);
      })
    );
  };

  const getNextButtonTitle = () => {
    if (currentStep === 2) {
      return 'Go to Esign';
    }

    return 'Continue';
  };

  const getStepContent = () => {
    if (currentStep === 1) {
      return (
        <LetterUpload
          selectedDocument={selectedDocument?.step1}
          onDocumentSelect={document => {
            setSelectedDocument(pre => ({
              ...pre,
              ...{ step1: selectedDocument === document ? null : document },
            }));
          }}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <EsignTermsFirstStep
            documents={documents}
            selectedDocument={selectedDocument?.step2}
            onDocumentSelect={document => {
              setSelectedDocument(pre => ({
                ...pre,
                ...{ step2: selectedDocument === document ? null : document },
              }));
            }}
          />
          {/* <div className="mt-8 text-primary">
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleByPass}
            >
              By Pass
            </button>
          </div> */}
        </>
      );
    }

    return <EsignTermsSecondStep onContinue={handleNext} />;
  };

  const getNextButtonVisibility = () => {
    if (currentStep !== 3) {
      return !!selectedDocument[`step${currentStep}`] || isLoading;
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
