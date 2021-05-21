import { useState } from 'react';
import { useRouter } from 'next/router';
import AppFooter from '../../components/Layouts/app-footer';
import AppHeader from '../../components/Layouts/app-header';
import Document from '../../components/Icons/document';

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
      router.push('/onboard/veify-node-ownership');
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

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="mt-8">
          <p className="text-2.5xl">
            Members must sign the Membership Agreement
          </p>
          <p className="text-sm mt-2 text-dark1">
            Clicking below will open up the hellosign document for capturing
            your electronic signature
          </p>
          <div className="mt-10 flex flex-wrap space-x-10">
            {documents.map(document => (
              <button
                type="button"
                className="text-center focus:outline-none"
                onClick={() =>
                  setSelectedDocument(
                    selectedDocument === document ? null : document
                  )
                }
              >
                <Document
                  width={38}
                  height={50}
                  strokeColor={
                    document === selectedDocument ? '#FF473E' : '#323339'
                  }
                  strokeWidth={document === selectedDocument ? 2 : 1}
                />
                <p className="text-dark3 mt-1 text-xs">{document}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8">
        <p className="text-2.5xl">ESigning was successful</p>
        <p className="text-sm text-dark1 mt-1">
          You can continue the onboarding steps.
        </p>
        <button
          type="button"
          className="block md:hidden text-lg text-white w-full h-16 rounded-full bg-primary focus:outline-none mt-12"
          onClick={() => handleNext()}
        >
          Continue
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow md:flex md:items-center justify-center mt-12 md:mt-0">
          <div className="block md:hidden w-full flex justify-between">
            <button
              type="button"
              className="flex items-center"
              onClick={() => handlePrev()}
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
              className={`flex items-center ${
                selectedDocument ? 'visible' : 'invisible'
              }`}
              onClick={() => setCurrentStep(currentStep + 1)}
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
                    You must read and agree to the terms of service before
                    continuing to the portal
                  </p>
                </div>
              </div>
              {renderStepContent()}
            </div>
            <div className="hidden md:flex justify-between border-b border-gray pb-2">
              <button
                type="button"
                className="text-center ml-4 text-sm text-dark3 flex flex-col items-center justify-end focus:outline-none"
                onClick={() => handlePrev()}
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
                className={`text-center ml-5 text-sm text-dark3 focus:outline-none ${
                  selectedDocument ? 'visible' : 'invisible'
                }`}
                onClick={() => handleNext()}
              >
                <img
                  src="/images/ic_next_circle_gradient_large.svg"
                  alt="go to esign"
                  className="mb-1"
                />
                {getNextButtonTitle()}
              </button>
            </div>
          </div>
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default EsignTerms;
