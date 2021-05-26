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
    <div className="w-full md:w-9/12 md:max-w-6xl">
      <div className="hidden md:flex border-b border-gray pb-1">
        <span className="font-bold text-dark2">{title}</span>
        {title === 'Submit KYC' && (
          <ul className="flex list-disc">
            <li
              className={`ml-48 text-sm text-primary ${
                currentStep === 2 || currentStep === 3 ? '' : 'text-opacity-50'
              }`}
            >
              Operator KYC
            </li>
            <li className="ml-48 text-sm text-primary text-opacity-50">
              CSPR Owner KYC
            </li>
          </ul>
        )}
      </div>
      <div
        className="hidden md:block border-b border-primary border-2"
        style={{ width: `${(currentStep * 100) / totalSteps}%` }}
      />
      <div className="mt-2 md:flex md:space-x-12">
        <div className="relative w-full md:w-auto md:flex-none md:h-114">
          <img
            src={imageUrl}
            alt="esign terms"
            className="w-full h-44 md:h-auto object-cover"
          />
          <div className="absolute bottom-0 mx-4 my-8 opacity-30">
            <p className="text-2xl">{title}</p>
            <p className="text-sm text-dark1 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex-grow">{stepContent}</div>
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
        {!hideContinueButton && (
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
        )}
      </div>
    </div>
  </>
);

export default OnboardStepper;
