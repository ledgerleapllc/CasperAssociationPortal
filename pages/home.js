import { useRouter } from 'next/router';
import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import AppHeader from '../components/Layouts/app-header';
import AppFooter from '../components/Layouts/app-footer';

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
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center">
          <div>
            <p className="text-5xl md:text-7xl font-bold text-white whitespace-pre-line">
              {`Welcome to the Casper\nvoting engine`}
            </p>
            <p className="text-xl text-white whitespace-pre-line mt-5">
              {`Please choose Sign In if you have an existing account or Register if this is your first time\nhere. If you’re just here to explore, sign in as a `}
              <span>
                <Link href="/register">
                  <a className="underline">guest.</a>
                </Link>
              </span>
            </p>
            <div className="mt-10 space-x-4">
              <button
                type="button"
                className="rounded-full border-2 border-white text-white w-24 h-24 hover:border-opacity-0 hover:bg-white hover:bg-opacity-40 focus:outline-none"
                onClick={() => router.push('/login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-white text-white w-24 h-24 hover:border-opacity-0 hover:bg-white hover:bg-opacity-40 focus:outline-none"
                onClick={() => router.push('/register')}
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

export default Home;
