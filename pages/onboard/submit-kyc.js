/* eslint-disable no-lonely-if */
import { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import SubmitKYCFirstStep from '../../components/onboard/submit-kyc/first-step';
import SubmitKYCSecondStep from '../../components/onboard/submit-kyc/second-step';
import SubmitKYCThirdStep from '../../components/onboard/submit-kyc/third-step';
import SubmitKYCFourthStep from '../../components/onboard/submit-kyc/fourth-step';
import SubmitKYCFifthStep from '../../components/onboard/submit-kyc/fifth-step';
import SubmitKYCSixthStep from '../../components/onboard/submit-kyc/sixth-step';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { useDialog } from '../../components/partials/dialog';
import { Shuftipro } from '../../components/onboard/submit-kyc/shuftipro';
import {
  postOwnerNodes,
  updateTypeOwnerNode,
  getOwnerNodes,
} from '../../shared/redux-saga/onboard/actions';
import { updateUser } from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../_app';

const SubmitKYC = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [submitType, setSubmitType] = useState(null);
  const [information, setInformation] = useState(null);
  const [beginKYC, setBeginKYC] = useState(null);
  const [hasOwner, setHasOwner] = useState(false);
  const submitBtnStep2 = useRef(null);
  const { setDialog } = useDialog();
  const dispatch = useDispatch();
  const router = useRouter();
  const ownerNodes = useSelector(state => state.onboardReducer.ownerNodes);
  const { setLoading } = useContext(AppContext);

  const totalSteps = 6;

  useEffect(() => {
    const _ownerNodes = ownerNodes?.data?.owner_node || [];
    if (_ownerNodes.length) {
      setCurrentStep(6);
    } else {
      setCurrentStep(1);
    }
  }, [ownerNodes]);

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
      router.push('/onboard');
      dispatch(
        updateUser({
          kyc_verified_at: true,
        })
      );
    } else {
      if (currentStep === 2) {
        submitBtnStep2.current.click();
      } else if (currentStep === 3) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 4) {
        setLoading(true);
        dispatch(
          updateTypeOwnerNode(
            information,
            () => {
              setLoading(false);
              if (+information.type === 1) {
                setCurrentStep(currentStep + 2);
              } else if (+information.type === 2) {
                setCurrentStep(currentStep + 1);
              }
            },
            () => {
              setLoading(false);
            }
          )
        );
      } else if (currentStep === 5) {
        setLoading(true);
        dispatch(
          postOwnerNodes(
            information,
            () => {
              dispatch(getOwnerNodes());
              setLoading(false);
            },
            () => {
              setLoading(false);
            }
          )
        );
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBeginKYC = () => {
    setDialog({
      type: 'Dialog',
      settings: {
        style: {
          height: '90vh',
          width: '90%',
          maxWidth: '800px',
          overflow: 'scroll',
        },
        hideButton: true,
      },
      data: {
        title: 'KYC',
        content: <Shuftipro />,
      },
      afterClosed: (value) => {
        console.log(value);
        setBeginKYC(true);
        if (value === 'verified') {
          // setBeginKYC(true);
        }
      },
    });
  };

  const handleHasOwner = data => {
    setHasOwner(true);
    setInformation(data.form);
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
          type={submitType}
          ref={submitBtnStep2}
          onNext={handleNext}
          nextStep={() => setCurrentStep(currentStep + 1)}
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
      return (
        <SubmitKYCFifthStep
          onNext={() => handleNext()}
          onHasOwner={data => handleHasOwner(data)}
        />
      );
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
    if (currentStep === 5) {
      return !!hasOwner;
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

export default LoadingScreen(SubmitKYC, 'onboarding');
