import { useRouter } from 'next/router';
import useMobileDetect from 'use-mobile-detect-hook';
import AppFooter from '../components/Layouts/app-footer';
import AppHeader from '../components/Layouts/app-header';

const Welcome = () => {
  const router = useRouter();
  const detectMobile = useMobileDetect();

  return (
    <div
      className="flex justify-center h-screen"
      style={{
        backgroundImage: `url('/images/bg_welcome${
          detectMobile.isMobile() ? '_mobile' : ''
        }.png')`,
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center justify-center mt-24 md:mt-0">
          <div
            className="bg-white w-full md:w-2/3 px-4 py-12 md:px-28"
            style={{
              backgroundImage: `url('/images/login_overlay.png')`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-2xl md:text-3xl text-center">
              {`Welcome to the Casper ${
                detectMobile.isMobile() ? '' : 'Portal'
              }`}
            </p>
            <p className="text-sm text-dark1 mt-2 text-center">
              A message from our director
            </p>
            <p className="text-sm text-dark1 mt-4">
              Node operator,
              <br />
              <br />
              First, thank you for being an essential part of Casper. Our node
              operators are the beating heart at the very core of our
              technology. Our Casper Association exists to serve not just the
              Casper Protocol, but also you, the smaller parts that comprise our
              greater whole. Never forget that as the world builds on Casper,
              their machinations live on your collective servers.
              <br />
              <br />
              As a node operator, you are eligible to become a member of the
              Casper Association where you will help determine the future of the
              Casper blockchain. Our members only portal allows you to discuss
              the Casper protocol or your needs as an operator, vote on major
              updates to the blockchain, and even propose new features and
              functions for the technology. Your success as a node operator is
              Casper’s success, so inside you will also find instrumental tools
              to help you as a node operator. Tools like node health monitoring,
              node status alerts, and network statistics and features not found
              elsewhere support you in your mission. As Casper grows, so will
              the features of the association portal, so get in here and help
              guide Casper alongside us through the 2020s.
            </p>
            <div className="flex mt-12 w-full">
              <img
                src="/images/ic_signature.svg"
                alt="signature"
                width={16}
                height={14}
              />
              <p className="text-xs md:text-sm text-dark1 ml-5">
                Electronically sign the membership agreement.
              </p>
            </div>
            <div className="flex mt-5 w-full">
              <img
                src="/images/ic_ownership.svg"
                alt="ownership"
                width={16}
                height={14}
              />
              <p className="text-xs md:text-sm text-dark1 ml-5">
                Register your node and prove ownership.
              </p>
            </div>
            <div className="flex mt-5 w-full">
              <img
                src="/images/ic_user.svg"
                alt="user"
                width={16}
                height={14}
              />
              <p className="text-xs md:text-sm text-dark1 ml-5">
                Submit KYC details for your node.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="mt-12 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none"
                onClick={() => router.push('/onboard')}
              >
                Begin
              </button>
            </div>
          </div>
        </div>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default Welcome;
