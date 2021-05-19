import { useRouter } from 'next/router';
import styles from '../styles/welcome.module.scss';
import AppHeader from '../components/Layouts/app-header';
import AppFooter from '../components/Layouts/app-footer';

const Welcome = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="md:w-9/12 p-9 flex flex-col">
        <AppHeader theme="light" />
        <div className="flex-grow flex items-center">
          <div>
            <p className="text-7xl text-white whitespace-pre-line">
              {`Welcome to the Casper\nvoting engine`}
            </p>
            <p className="text-xl text-white whitespace-pre-line mt-5">
              {`Please choose Sign In if you have an existing account or Register if this is your first time\nhere. If you’re just here to explore, sign in as a guest.`}
            </p>
            <div className="mt-6 space-x-4">
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

export default Welcome;
