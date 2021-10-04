import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import EsignTermsFirstStep from '../../components/onboard/esign-terms/first-step';
import EsignTermsSecondStep from '../../components/onboard/esign-terms/second-step';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import {
  bypassHelloSignRequest,
  helloSignRequest,
} from '../../shared/redux-saga/onboard/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { updateUser } from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../_app';

// Create the HelloSign Embedded instance.
// Only do this once!

const EsignTerms = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [helloSignComplete, setHelloSignComplete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const user = useSelector(state => state.authReducer.userInfo);
  const [client, setClient] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    state => state?.onboardReducer?.uploadLetter
  );

  const { setLoading } = useContext(AppContext);

  const router = useRouter();

  const totalSteps = 2;

  useEffect(() => {
    if (user?.signature_request_id) {
      setCurrentStep(2);
    }
  }, [user]);

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
      setLoading(true);
      dispatch(
        helloSignRequest(
          res => {
            setLoading(false);
            client.open(res.data.url, {
              clientId: process.env.HELLOSIGN_CLIENT_ID,
              skipDomainVerification: true,
            });
          },
          () => {
            setLoading(false);
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
    if (currentStep === 1 && helloSignComplete) {
      setCurrentStep(currentStep + 1);
    }
  }, [helloSignComplete]);

  // eslint-disable-next-line no-unused-vars
  const handleByPass = () => {
    dispatch(
      bypassHelloSignRequest(res => {
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
            selectedDocument={selectedDocument}
            onDocumentSelect={document => {
              if (selectedDocument) {
                setSelectedDocument(null);
              } else {
                setSelectedDocument(document);
                window.open(`${process.env.BASE_URL}${document.url}`, '_blank');
              }
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
    if (currentStep === 1) {
      return !!selectedDocument || isLoading;
    }

    return true;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div
        className="
          flex flex-col w-full
          p-4
          lg:max-w-380 lg:p-9
          xl:max-w-screen-xl xl:p-9
          2xl:max-w-screen-2xl
        "
      >
        <AppHeader theme="dark" />
        <div className="flex-grow lg:flex lg:items-center justify-center mt-12 lg:mt-0">
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
