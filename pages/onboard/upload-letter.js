import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import LetterUpload from '../../components/onboard/esign-terms/letter-upload';
import OnboardStepper from '../../components/onboard/onboard-stepper';
import { uploadLetter } from '../../shared/redux-saga/onboard/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { updateUser } from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../_app';

const UploadLetter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setLoading } = useContext(AppContext);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const user = useSelector(state => state.authReducer.userInfo);

  const handlePrev = () => {
    router.back();
  };

  const handleNext = () => {
    if (user?.letter_file && !selectedDocument) {
      router.push('/onboard');
      return;
    }

    setLoading(true);
    dispatch(
      uploadLetter(
        {
          newFile: selectedDocument.file,
        },
        () => {
          setLoading(false);
          dispatch(
            updateUser({
              letter_file: selectedDocument.name,
            })
          );
          if (user?.signature_request_id && user?.node_verified_at) {
            router.push('/dashboard');
            dispatch(
              updateUser({
                period: 'final',
              })
            );
          } else {
            router.push('/onboard');
          }
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow md:flex md:items-center justify-center mt-12 md:mt-0">
          <OnboardStepper
            title="Upload Letter"
            description="Write and upload a short letter outlining why you would like to sign up."
            imageUrl="/images/img_signature_blur.png"
            currentStep={1}
            totalSteps={1}
            stepContent={
              <LetterUpload
                selectedDocument={selectedDocument}
                onDocumentSelect={document => {
                  setSelectedDocument(
                    selectedDocument === document ? null : document
                  );
                }}
              />
            }
            showNextButton={selectedDocument || !!user?.letter_file}
            showContinueButton={selectedDocument || !!user?.letter_file}
            continueButtonTitle="Continue"
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default LoadingScreen(UploadLetter, 'onboarding');
