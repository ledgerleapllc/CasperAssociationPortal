import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../shared/redux-saga/auth/actions';

const OnboardStepper = ({
  title,
  description,
  imageUrl,
  currentStep,
  totalSteps,
  stepContent,
  showNextButton,
  showContinueButton,
  continueButtonTitle,
  hideContinueButton,
  onPrev,
  onNext,
}) => {
  const router = useRouter();
  const [allStepsDone, setAllStepsDone] = useState(false);
  const user = useSelector(state => state.authReducer.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (title === 'Upload Letter of Motivation' &&
        user?.letter_verified_at &&
        user.signature_request_id &&
        user.node_verified_at) ||
      (title === 'Esign Terms' &&
        currentStep === 2 &&
        user.node_verified_at &&
        user?.letter_verified_at) ||
      (title === 'Verify Node Ownership' &&
        currentStep === 3 &&
        user.signature_request_id &&
        user?.letter_verified_at)
    ) {
      setAllStepsDone(true);
    }
  }, [currentStep, title]);

  const onHandleNextSteps = () => {
    if (allStepsDone) {
      router.push('/dashboard');
      dispatch(
        updateUser({
          period: 'final',
        })
      );
    } else {
      onNext();
    }
  };

  const handleTopNextButton = () => {
    if (currentStep === 4 || currentStep === 5) {
      return 'CSPR Owner KYC';
    }
    return 'Operator KYC';
  };

  return (
    <>
      <div className="block lg:hidden w-full flex justify-between animate__animated animate__fadeInUp">
        <button
          type="button"
          className="flex items-center focus:outline-none"
          onClick={onPrev}
        >
          <img
            src="/images/ic_prev_circle.svg"
            alt="prev"
            width="18"
            height="18"
            className="mr-2"
          />
          <span className="text-primary text-sm">Back</span>
        </button>
        {title === 'Submit KYC' ? (
          <ul className="list-disc lg:list-none">
            <li className="text-primary font-bold text-sm">
              {handleTopNextButton()}
            </li>
          </ul>
        ) : (
          <button
            type="button"
            className={`flex items-center focus:outline-none ${
              showNextButton ? 'visible' : 'invisible'
            }`}
            onClick={onNext}
          >
            <span className="text-primary text-sm">Next</span>
            <img
              src="/images/ic_next_circle.svg"
              alt="next"
              width="18"
              height="18"
              className="ml-2"
            />
          </button>
        )}
        {!showNextButton && title === 'Submit KYC' && (
          <ul className="list-disc lg:list-none">
            <li className="text-primary font-bold text-sm">Operator KYC</li>
          </ul>
        )}
      </div>
      <div className="w-full lg:w-8.85/10">
        <div className="hidden lg:flex border-b border-gray pb-1 animate__animated animate__fadeInUp">
          <span className="font-bold text-dark2">{title}</span>
          {title === 'Submit KYC' && (
            <ul className="flex list-disc">
              <li
                className={`mx-44 text-sm text-primary ${
                  currentStep >= 2 ? 'font-bold' : 'text-opacity-50'
                }`}
              >
                Operator KYC
              </li>
              <li
                className={`mx-44 text-sm text-primary ${
                  currentStep >= 4 ? 'font-bold' : 'text-opacity-50'
                }`}
              >
                CSPR Owner KYC
              </li>
            </ul>
          )}
        </div>
        <div
          className="hidden lg:block border-b border-primary border-2 animate__animated animate__fadeInUp"
          style={{ width: `${(currentStep * 100) / totalSteps}%` }}
        />
        <div
          id="custom-content"
          className="mt-2 lg:flex lg:space-x-12 animate__animated animate__fadeInUp"
        >
          <div className="relative w-full lg:w-auto lg:flex-none lg:h-114">
            <img
              src={imageUrl}
              alt="esign terms"
              className="w-full h-44 lg:h-auto object-cover"
            />
            <div className="absolute bottom-0 mx-4 my-8 opacity-30">
              <p className="text-2xl">{title}</p>
              <p className="text-sm text-dark1 mt-2">{description}</p>
            </div>
          </div>
          <div className="flex-grow">{stepContent}</div>
        </div>
        <div className="hidden lg:flex justify-between border-b border-gray pb-2">
          <button
            type="button"
            className={`${
              title === 'Submit KYC' && currentStep === 6 && 'invisible'
            } text-center ml-4 text-sm text-dark3 flex flex-col items-center justify-end focus:outline-none animate__animated animate__fadeInUp animate__delay-2s`}
            onClick={onPrev}
          >
            <img
              src="/images/ic_prev_circle_gradient_small.svg"
              alt="back"
              className="mb-1"
            />
            Back
          </button>
          {!hideContinueButton && (
            <div className="animate__animated animate__fadeInUp animate__delay-4s">
              <button
                type="button"
                className="text-center ml-5 text-sm text-dark3 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
                disabled={!showContinueButton}
                onClick={onHandleNextSteps}
              >
                <img
                  src="/images/ic_next_circle_gradient_large.svg"
                  alt="go to esign"
                  className="mb-1"
                />
                {!allStepsDone ? continueButtonTitle : 'To Dashboard'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardStepper;
