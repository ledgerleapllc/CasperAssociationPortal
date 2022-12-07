import { useHistory } from 'react-router-dom';
import useMobileDetect from 'use-mobile-detect-hook';
import { LoadingScreen } from '../components/hoc/loading-screen';
import AppHeader from '../components/layouts/app-header';
import AppFooter from '../components/layouts/app-footer';

const Welcome = () => {
  const history = useHistory();
  const detectMobile = useMobileDetect();

  // Begin Onboard
  const beginOnboard = () => {
    localStorage.removeItem('steps');
    history.push('/onboard');
  };

  return (
    <div
      className="flex justify-center h-screen"
      style={{
        backgroundImage: `url('/images/bg_welcome${
          detectMobile.isMobile() ? '_mobile' : ''
        }.jpg')`,
        backgroundSize: 'cover',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <div
        className="
          flex flex-col w-full
          p-4
          lg:max-w-380 lg:p-9
          xl:max-w-screen-xl xl:p-9
          2xl:max-w-screen-2xl"
      >
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center justify-center mt-24 mb-24 lg:mt-0">
          <div
            className="bg-white w-full lg:w-2/3 px-4 py-12 lg:px-28 animate__animated animate__fadeInUp animate__delay-1s"
            style={{
              backgroundImage: `url('/images/login_overlay.png')`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-2xl lg:text-3xl text-center">
              {`Welcome to the Casper ${
                detectMobile.isMobile() ? '' : 'Portal'
              }`}
            </p>
            <p className="text-sm text-dark1 mt-4">
              Dear Casper Blockchain Validator,
              <br />
              <br />
              The Board of the Casper Association welcomes you to the membership
              portal. On this site, you can follow the process and become a
              member of the Casper Association. Once you completed the
              identification and application process, you will be able to vote
              in the Association business and its governance. We are looking
              forward to welcoming you as a member of the Casper Association.
              Any validator can become a member. Validators wishing to become
              members of the Association must:
            </p>
            <div className="flex mt-12 w-full">
              <img
                src="/images/ic_signature.svg"
                alt="signature"
                width={16}
                height={14}
              />
              <p className="text-xs lg:text-sm text-dark1 ml-5">
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
              <p className="text-xs lg:text-sm text-dark1 ml-5">
                Register your node and prove ownership.
              </p>
            </div>
            <div className="flex mt-5 w-full">
              <img
                src="/images/letter.png"
                alt="letter"
                width={16}
                height={20}
              />
              <p className="text-xs lg:text-sm text-dark1 ml-5">
                Upload a letter of motivation.
              </p>
            </div>
            <div className="flex mt-5 w-full">
              <img
                src="/images/ic_user.svg"
                alt="user"
                width={16}
                height={14}
              />
              <p className="text-xs lg:text-sm text-dark1 ml-5">
                Submit KYC details for your node.
              </p>
            </div>
            <p className="text-sm text-dark1 mt-10">
              Once a validator becomes a member, they can participate in
              Association business (e.g. voting, or submitting proposals).
              Member’s validator nodes must maintain certain technical
              requirements in order to participate in association business.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                className="mt-12 text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md animate__animated animate__fadeIn animate__delay-2s"
                onClick={beginOnboard}
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

export default LoadingScreen(Welcome, 'welcome');
