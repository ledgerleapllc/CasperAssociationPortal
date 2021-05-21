const OnboardStepper = ({
  currentStep,
  totalSteps,
  stepContent,
  showNextButton,
  showContinueButton,
  continueButtonTitle,
  onPrev,
  onNext,
}) => (
  <>
    <div className="block md:hidden w-full flex justify-between">
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
        Back
      </button>
      <button
        type="button"
        className={`flex items-center focus:outline-none ${
          showNextButton ? 'visible' : 'invisible'
        }`}
        onClick={onNext}
      >
        Next
        <img
          src="/images/ic_next_circle.svg"
          alt="next"
          width="18"
          height="18"
          className="ml-2"
        />
      </button>
    </div>
    <div className="w-full md:w-9/12">
      <p className="hidden md:block border-b border-gray pb-1 font-bold text-dark2">
        Esign Terms
      </p>
      <div
        className="hidden md:block border-b border-primary border-2"
        style={{ width: `${(currentStep * 100) / totalSteps}%` }}
      />
      <div className="mt-2 md:flex md:space-x-12">
        <div className="relative bg-white w-full md:w-auto">
          <img
            src="/images/img_signature_blur.png"
            alt="esign terms"
            className="w-full h-44 md:h-auto object-cover"
          />
          <div className="absolute bottom-0 mx-4 my-10 opacity-30">
            <p className="text-2xl">Esign Terms</p>
            <p className="text-sm text-dark1 mt-2">
              You must read and agree to the terms of service before continuing
              to the portal
            </p>
          </div>
        </div>
        {stepContent}
      </div>
      <div className="hidden md:flex justify-between border-b border-gray pb-2">
        <button
          type="button"
          className="text-center ml-4 text-sm text-dark3 flex flex-col items-center justify-end focus:outline-none"
          onClick={onPrev}
        >
          <img
            src="/images/ic_prev_circle_gradient_small.svg"
            alt="back"
            className="mb-1"
          />
          Back
        </button>
        <button
          type="button"
          className="text-center ml-5 text-sm text-dark3 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed"
          disabled={!showContinueButton}
          onClick={onNext}
        >
          <img
            src="/images/ic_next_circle_gradient_large.svg"
            alt="go to esign"
            className="mb-1"
          />
          {continueButtonTitle}
        </button>
      </div>
    </div>
  </>
);

export default OnboardStepper;
