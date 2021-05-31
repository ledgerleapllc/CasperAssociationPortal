import Image from 'next/image';
import Facebook from '../icons/facebook';
import Twitter from '../icons/twitter';
import Youtube from '../icons/youtube';
import Linkedin from '../icons/linkedin';
import Medium from '../icons/medium';

const AppFooter = ({ theme }) => (
  <div className="flex items-center justify-between md:visible invisible">
    <p className={`${theme === 'light' ? 'text-white' : 'text-dark2'} text-xs`}>
      ©2021 CasperLabs.io
    </p>
    <div className="flex space-x-6">
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Facebook
          width={8}
          height={16}
          fill={theme === 'light' ? '#fff' : '#FF473E'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Twitter
          width={20}
          height={16}
          fill={theme === 'light' ? '#fff' : '#FF473E'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Youtube
          width={22}
          height={16}
          fill={theme === 'light' ? '#fff' : '#FF473E'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Linkedin
          width={16}
          height={16}
          fill={theme === 'light' ? '#fff' : '#FF473E'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Medium
          width={20}
          height={16}
          fill={theme === 'light' ? '#fff' : '#FF473E'}
        />
      </button>
    </div>
  </div>
);

export default AppFooter;
