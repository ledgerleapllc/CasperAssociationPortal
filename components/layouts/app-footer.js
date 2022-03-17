import { Link } from 'react-router-dom';
// import Facebook from '../../public/images/ic_facebook.svg';
// import Twitter from '../../public/images/ic_twitter.svg';
// import Youtube from '../../public/images/ic_youtube.svg';
// import Linkedin from '../../public/images/ic_linkedin.svg';
// import Medium from '../../public/images/ic_medium.svg';

const AppFooter = ({ theme }) => (
  <div className="lg:visible invisible">
    <p
      className={`${
        theme === 'light' ? 'text-white' : 'text-dark2'
      } text-xs text-center animate__animated animate__fadeIn animate__delay-2s
    `}
    >
      ©{new Date().getFullYear()} Casper Association
    </p>
    <div
      className={`${
        theme === 'light' ? 'text-white' : 'text-dark2'
      } flex text-xs items-center justify-center mt-2 animate__animated animate__fadeIn animate__delay-2s
    `}
    >
      <Link to="/privacy-policy">Privacy Policy</Link>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <a href="/terms-of-service.pdf" target="_blank">
        Terms of Service
      </a>
    </div>
  </div>
);

export default AppFooter;
