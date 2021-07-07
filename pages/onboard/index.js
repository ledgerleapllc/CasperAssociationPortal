import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardItem from '../../components/onboard/onboard-item';
import { LoadingScreen } from '../../components/hoc/loading-screen';

const Onboard = () => {
  const router = useRouter();
  const user = useSelector(state => state.authReducer.userInfo);
  const [isBypassing, setIsBypassing] = useState(false);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full md:w-9/12">
            <div className="hidden md:flex space-x-5 border-b border-gray pb-1 mb-3">
              <p className="flex-1 text-gray">Esign Terms</p>
              <p className="flex-1 text-gray">Verify Node Ownership</p>
              <p className="flex-1 text-gray">Upload Letter</p>
            </div>
            <div className="md:flex md:space-x-5">
              <OnboardItem
                className="md:flex-1 cursor-pointer animate__animated animate__fadeInUp animate__delay-2s"
                imageUrl="/images/img_signature.png"
                blurImageUrl="/images/img_signature_blur.png"
                title="Terms Agreement"
                doneStep={!!user.signature_request_id}
                description="You must agree to the terms of service before you can access the portal."
                onClick={() => router.push('/onboard/esign-terms')}
                stepType="hellosign"
                userInfoKey="signature_request_id"
                handleBypass={setIsBypassing}
              />
              <OnboardItem
                className="md:flex-1 mt-10 md:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-4s"
                imageUrl="/images/img_ownership.png"
                blurImageUrl="/images/img_ownership_blur.png"
                title="Verify Node Ownership"
                doneStep={!!user.node_verified_at}
                description="If you are a node operator, you must verify the ownership of your node."
                onClick={() => router.push('/onboard/verify-node-ownership')}
                stepType="verify-node"
                userInfoKey="node_verified_at"
                handleBypass={setIsBypassing}
              />
              <OnboardItem
                className="md:flex-1 mt-10 md:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-6s"
                imageUrl="/images/img_kyc.png"
                blurImageUrl="/images/img_kyc_blur.png"
                title="Upload Letter"
                doneStep={!!user.letter_file}
                description="Write and upload a short letter outlining why you would like to sign up."
                onClick={() => router.push('/onboard/upload-letter')}
                stepType="letter-upload"
                userInfoKey="letter_file"
                handleBypass={setIsBypassing}
              />
            </div>
          </div>
        </div>
        <AppFooter theme="dark" />
      </div>
      {isBypassing && (
        <div className="backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0 z-50">
          <ReactLoading
            type="spinningBubbles"
            color="#FF473E"
            width={137}
            height={141}
          />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen(Onboard, 'onboarding');
