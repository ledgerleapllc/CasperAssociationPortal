import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import { useRouter } from 'next/router';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';

const TypeRegister = () => {
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
      <div className="w-full lg:max-w-screen-2xl lg:p-9 p-4 flex flex-col">
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
            <div className="lg:flex lg:flex-col mt-10 lg:justify-center">
              <button
                type="button"
                className=" my-4 text-lg text-white w-full lg:w-full h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md animate__animated animate__fadeInLeft animate__delay-4s"
                onClick={() => router.push('/register')}
              >
                Individual
              </button>
              <button
                type="button"
                className="my-4 text-lg border-2 border-primary text-primary w-full lg:w-full h-16 rounded-full bg-white hover:bg-primary hover:bg-opacity-40 hover:text-white focus:outline-none shadow-md animate__animated animate__fadeInLeft animate__delay-5s"
                onClick={() => router.push('/register')}
              >
                Entity
              </button>
            </div>
            <p className="text-xs text-center mt-5 whitespace-pre-line animate__animated animate__fadeInUp">
              {`Already have an account? `}
              <Link href="/sign-in">
                <a className="text-primary underline font-medium">Sign in</a>
              </Link>
            </p>
          </div>
        </div>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default TypeRegister;
