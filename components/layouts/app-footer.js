import Facebook from '../../public/images/ic_facebook.svg';
import Twitter from '../../public/images/ic_twitter.svg';
import Youtube from '../../public/images/ic_youtube.svg';
import Linkedin from '../../public/images/ic_linkedin.svg';
import Medium from '../../public/images/ic_medium.svg';

const AppFooter = ({ theme }) => (
  <div className="flex items-center justify-between lg:visible invisible">
    <p
      className={`${
        theme === 'light' ? 'text-white' : 'text-dark2'
      } text-xs animate__animated animate__fadeIn animate__delay-5s
    `}
    >
      ©2021 CasperLabs.io
    </p>
    <div className="flex space-x-6 animate__animated animate__fadeIn animate__delay-5s">
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Facebook
          width={8}
          height={16}
          className={theme === 'light' ? 'text-white' : 'text-primary'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Twitter
          width={20}
          height={16}
          className={theme === 'light' ? 'text-white' : 'text-primary'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Youtube
          width={22}
          height={16}
          className={theme === 'light' ? 'text-white' : 'text-primary'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Linkedin
          width={16}
          height={16}
          className={theme === 'light' ? 'text-white' : 'text-primary'}
        />
      </button>
      <button
        className="flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150"
        type="button"
      >
        <Medium
          width={20}
          height={16}
          className={theme === 'light' ? 'text-white' : 'text-primary'}
        />
      </button>
    </div>
  </div>
);

export default AppFooter;
