import { useRouter } from 'next/router';
import useMobileDetect from 'use-mobile-detect-hook';
import AppHeader from '../components/layouts/app-header';
import AppFooter from '../components/layouts/app-footer';
import { LoadingScreen } from '../components/hoc/loading-screen';

const Home = () => {
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
      <div
        className="
          flex flex-col w-full
          p-4
          lg:max-w-380 lg:p-9
          xl:max-w-screen-xl xl:p-9
          2xl:max-w-screen-2xl
        "
      >
        <AppHeader theme="light" showExplorer />
        <div className="flex-grow flex items-center">
          <div>
            <p className="text-5xl lg:text-7xl font-bold text-white whitespace-pre-line animate__animated animate__fadeInUp">
              {`Welcome to the Casper\nAssociation Membership Portal.`}
            </p>
            <p className="text-xl text-white whitespace-pre-line mt-5 animate__animated animate__fadeInUp animate__delay-0-5s">
              Choose sign in below if you already have an account, or choose{' '}
              register if you need to set one up.
            </p>
            <div className="mt-10 space-x-4">
              <button
                type="button"
                className="rounded-full border-2 border-white text-white w-24 h-24 hover:border-opacity-0 hover:bg-white hover:bg-opacity-40 focus:outline-none animate__animated animate__fadeInLeft animate__delay-1s"
                onClick={() => router.push('/login')}
              >
                Log In
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-white text-white w-24 h-24 hover:border-opacity-0 hover:bg-white hover:bg-opacity-40 focus:outline-none animate__animated animate__fadeInLeft animate__delay-1s"
                onClick={() => router.push('/register-type')}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default LoadingScreen(Home, 'auth');
