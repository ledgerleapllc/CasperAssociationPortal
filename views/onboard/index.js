import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import AppHeader from '../../components/layouts/app-header';
import AppFooter from '../../components/layouts/app-footer';
import OnboardItem from '../../components/onboard/onboard-item';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import { useDialog } from '../../components/partials/dialog';

const Onboard = () => {
  const router = useHistory();
  const user = useSelector(state => state.authReducer.userInfo);
  const [isBypassing, setIsBypassing] = useState(false);
  const { setDialog, onClosed } = useDialog();

  useEffect(() => {
    if (
      user &&
      Object.keys(user).length > 0 &&
      user.signature_request_id &&
      user.node_verified_at &&
      user.letter_file &&
      !user.letter_verified_at
    ) {
      setDialog({
        type: 'DialogCustom',
        data: {
          content: (
            <div className="text-center mx-auto px-10 py-10">
              <h3 className="text-xl font-bold text-center mb-5">Well done!</h3>
              <p className="text-sm text-center">
                We are waiting for an admin to review your letter of motivation.
                Once complete, you will have access to your dashboard. Please
                look out for an email within the next 2 business days to confirm
                your access to the portal.
              </p>
              <div className="mt-7 flex justify-center gap-5 items-center">
                <button
                  type="button"
                  className="px-8 py-3 font-normal rounded-full bg-primary hover:opacity-40 text-white"
                  onClick={() => onClosed()}
                >
                  Close
                </button>
              </div>
            </div>
          ),
        },
      });
    }
  }, [user]);

  const getValue = () => {
    let flag = 0;
    if (user.signature_request_id) flag += 1;
    if (user.node_verified_at) flag += 1;
    if (user.letter_file) flag += 1;
    if (flag === 3) return 100;
    return 33.33 * flag;
  };

  const clickOnboard = () => {
    if (!user.signature_request_id) router.push('/onboard/esign-terms');
  };

  const clickVerifyNode = () => {
    if (!user.node_verified_at) router.push('/onboard/verify-node-ownership');
  };

  return (
    <>
      <Head>
        <title>Onboard - Casper Association Portal</title>
      </Head>
      <div
        className="flex justify-center min-h-screen"
        id="landing-page__onboard"
      >
        <div
          className="
            flex flex-col w-full
            p-4
            lg:max-w-380 lg:p-9
            xl:max-w-screen-xl xl:p-9
            2xl:max-w-screen-2xl
          "
        >
          <AppHeader theme="dark" />
          <div className="flex-grow flex items-center justify-center mt-16 lg:mt-0">
            <div className="w-full lg:w-9/12">
              <div className="hidden lg:flex space-x-5 border-b border-gray pb-1">
                <p className="flex-1 text-gray">Esign Terms</p>
                <p className="flex-1 text-gray">Verify Node Ownership</p>
                <p className="flex-1 text-gray">Upload Letter of Motivation</p>
              </div>
              <div className="mb-3 custom-progress-bar">
                <div
                  className="lg:block border-b border-primary border-2 animate__animated animate__fadeInUp"
                  style={{ width: `${getValue()}%` }}
                />
              </div>
              <div className="lg:flex lg:space-x-5">
                <OnboardItem
                  className="custom-onboard-item lg:flex-1 cursor-pointer animate__animated animate__fadeInUp animate__delay-0-5s"
                  imageUrl="/images/img_signature.png"
                  blurImageUrl="/images/img_signature_blur.png"
                  title="Terms Agreement"
                  doneStep={!!user.signature_request_id}
                  description="You must agree to the terms of service before you can access the portal."
                  onClick={clickOnboard}
                  stepType="hellosign"
                  userInfoKey="signature_request_id"
                  handleBypass={setIsBypassing}
                />
                <OnboardItem
                  className="custom-onboard-item lg:flex-1 mt-10 lg:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s"
                  imageUrl="/images/img_ownership.png"
                  blurImageUrl="/images/img_ownership_blur.png"
                  title="Verify Node Ownership"
                  doneStep={!!user.node_verified_at}
                  description="If you are a node operator, you must verify the ownership of your node."
                  onClick={clickVerifyNode}
                  stepType="verify-node"
                  userInfoKey="node_verified_at"
                  handleBypass={setIsBypassing}
                  disabled={!user.signature_request_id}
                />
                <OnboardItem
                  className="custom-onboard-item lg:flex-1 mt-10 lg:mt-0 cursor-pointer animate__animated animate__fadeInUp animate__delay-8s"
                  imageUrl="/images/img_kyc.png"
                  blurImageUrl="/images/img_kyc_blur.png"
                  title="Upload Letter of Motivation"
                  doneStep={!!user?.letter_verified_at}
                  description="Write and upload a short letter of motivation outlining why you would like to sign up."
                  onClick={() => router.push('/onboard/upload-letter')}
                  stepType="letter-upload"
                  userInfoKey="letter_verified_at"
                  handleBypass={setIsBypassing}
                  waitingStep={user?.letter_file && !user?.letter_verified_at}
                  disabled={
                    !user.signature_request_id || !user?.node_verified_at
                  }
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
    </>
  );
};

export default LoadingScreen(Onboard, 'onboarding');
