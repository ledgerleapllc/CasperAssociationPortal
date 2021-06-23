import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardItem from '../../components/onboard/onboard-item';
import { LoadingScreen } from '../../components/hoc/loading-screen';

const Onboard = () => {
  const router = useRouter();
  const user = useSelector(state => state.authReducer.userInfo);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full md:w-9/12">
            <div className="hidden md:flex space-x-5 border-b border-gray pb-1 mb-3">
              <p className="flex-1 text-gray">Esign Terms</p>
              <p className="flex-1 text-gray">Verify Node Ownership</p>
              <p className="flex-1 text-gray">Submit KYC</p>
            </div>
            <div className="md:flex md:space-x-5">
              <OnboardItem
                className="md:flex-1 cursor-pointer animate__animated animate__fadeInUp animate__delay-2s"
                imageUrl="/images/img_signature.png"
                blurImageUrl="/images/img_signature_blur.png"
                title="Letter and Terms"
                doneStep={!!user.signature_request_id}
                description="You must upload a letter of motivation and agree to the terms of service before continuing to the portal"
                onClick={() => router.push('/onboard/esign-terms')}
              />
              <OnboardItem
                className="md:flex-1 mt-10 md:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-4s"
                imageUrl="/images/img_ownership.png"
                blurImageUrl="/images/img_ownership_blur.png"
                title="Verify Node Ownership"
                doneStep={!!user.node_verified_at}
                description="Please choose Sign In if you have an existing account or Register if this is your first time here."
                onClick={() => router.push('/onboard/verify-node-ownership')}
              />
              <OnboardItem
                className="md:flex-1 mt-10 md:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-6s"
                imageUrl="/images/img_kyc.png"
                blurImageUrl="/images/img_kyc_blur.png"
                title="Submit KYC"
                doneStep={!!user.kyc_verified_at}
                description="Upload your passport and utility bill here for identity and address verification."
                onClick={() => router.push('/onboard/submit-kyc')}
              />
            </div>
          </div>
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default LoadingScreen(Onboard, 'onboarding');
