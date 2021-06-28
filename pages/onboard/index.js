import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';

import AppFooter from '../../components/layouts/app-footer';
import AppHeader from '../../components/layouts/app-header';
import OnboardItem from '../../components/onboard/onboard-item';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { getOwnerNodes } from '../../shared/redux-saga/onboard/actions';

const Onboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);
  const ownerNodes = useSelector(state => state.onboardReducer.ownerNodes);
  const [isWaiting, setIsWaiting] = useState(undefined);
  const [isBypassing, setIsBypassing] = useState(false);

  useEffect(() => {
    dispatch(getOwnerNodes());
  }, []);

  useEffect(() => {
    const _ownerNodes = ownerNodes?.data?.owner_node || [];
    if (_ownerNodes.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < _ownerNodes.length; i++) {
        if (!_ownerNodes[i].kyc_verified_at) {
          setIsWaiting(true);
          return;
        }
      }
      setIsWaiting(false);
    }
  }, [ownerNodes]);

  const getDetailOwnerNode = () => (
    <div>
      <p>Waiting for all users to verify KYC Details</p>
      <button
        type="button"
        className="text-primary underline"
        onClick={() => router.push('/onboard/submit-kyc')}
      >
        Details
      </button>
    </div>
  );

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
                stepType="hellosign"
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
                handleBypass={setIsBypassing}
              />
              <OnboardItem
                className="md:flex-1 mt-10 md:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-6s"
                imageUrl="/images/img_kyc.png"
                blurImageUrl="/images/img_kyc_blur.png"
                title="Submit KYC"
                doneStep={!!user.kyc_verified_at && !isWaiting}
                waitingStep={isWaiting}
                description={
                  isWaiting
                    ? getDetailOwnerNode()
                    : 'Upload your passport and utility bill here for identity and address verification.'
                }
                onClick={
                  isWaiting
                    ? () => null
                    : () => router.push('/onboard/submit-kyc')
                }
                stepType="submit-kyc"
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
