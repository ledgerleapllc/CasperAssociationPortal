import useMobileDetect from 'use-mobile-detect-hook';
import { Link, useHistory } from 'react-router-dom';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { LoadingScreen } from '../components/hoc/loading-screen';

const TypeRegister = () => {
  const history = useHistory();
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
          2xl:max-w-screen-2xl"
      >
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center justify-center">
          <div
            className="bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:py-44 lg:px-80"
            style={{
              backgroundImage: `url('/images/login_overlay.png')`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-4xl text-center whitespace-pre-line animate__animated animate__fadeInUp">
              What type of account are you registering?
            </p>
            <div className="lg:flex lg:flex-col mt-10 lg:justify-center animate__animated animate__fadeInUp">
              <button
                type="button"
                className=" my-4 text-lg text-white w-full lg:w-full h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md animate__animated animate__fadeInLeft animate__delay-0-5s"
                onClick={() => history.push('/register-individual')}
              >
                Individual
              </button>
              <button
                type="button"
                className="my-4 text-lg border-2 border-primary text-primary w-full lg:w-full h-16 rounded-full bg-white hover:bg-primary hover:bg-opacity-40 hover:text-white focus:outline-none shadow-md animate__animated animate__fadeInLeft animate__delay-0-5s"
                onClick={() => history.push('/register-entity')}
              >
                Entity
              </button>
            </div>
            <p className="text-xs text-center mt-5 whitespace-pre-line animate__animated animate__fadeInUp animate__delay-1s">
              {`Already have an account? `}
              <Link to="/login">
                <span className="text-primary underline font-medium">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default LoadingScreen(TypeRegister, 'auth');
