import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/welcome.module.scss';

const Welcome = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="md:w-9/12 p-9 flex flex-col">
        <div className="flex items-center justify-between">
          <Image
            src="/images/casper_logo.svg"
            alt="casper logo"
            width={125}
            height={33}
          />
          <Image
            src="/images/hamburger.svg"
            alt="hamburger"
            width={35}
            height={20}
            onClick={() => {}}
          />
        </div>
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
                className="rounded-full border-2 border-white text-white w-24 h-24 hover:border-opacity-0 hover:bg-white hover:bg-opacity-40"
              >
                Sign In
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-white text-white w-24 h-24 hover:border-opacity-0 hover:bg-white hover:bg-opacity-40"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white">©2021 CasperLabs.io</p>
          <div className="flex space-x-6">
            <div className="flex bottom-0">
              <Image
                src="/images/ic_facebook.svg"
                alt="facebook"
                width={8}
                height={16}
              />
            </div>
            <div className="flex bottom-0">
              <Image
                src="/images/ic_twitter.svg"
                alt="twitter"
                width={20}
                height={16}
                className="px"
              />
            </div>
            <div className="flex bottom-0">
              <Image
                src="/images/ic_youtube.svg"
                alt="youtube"
                width={22}
                height={16}
              />
            </div>
            <div className="flex bottom-0">
              <Image
                src="/images/ic_linkedin.svg"
                alt="linkedin"
                width={16}
                height={16}
              />
            </div>
            <div className="flex bottom-0">
              <Image src="/images/ic_m.svg" alt="m" width={20} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
