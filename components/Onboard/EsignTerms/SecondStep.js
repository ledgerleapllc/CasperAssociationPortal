const EsignTermsSecondStep = ({ onContinue }) => (
  <div className="pt-8">
    <p className="text-2.5xl">ESigning was successful</p>
    <p className="text-sm text-dark1 mt-1">
      You can continue the onboarding steps.
    </p>
    <button
      type="button"
      className="block md:hidden text-lg text-white w-full h-16 rounded-full bg-primary focus:outline-none mt-12"
      onClick={onContinue}
    >
      Continue
    </button>
  </div>
);

export default EsignTermsSecondStep;
