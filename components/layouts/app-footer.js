// import Facebook from '../../public/images/ic_facebook.svg';
// import Twitter from '../../public/images/ic_twitter.svg';
// import Youtube from '../../public/images/ic_youtube.svg';
// import Linkedin from '../../public/images/ic_linkedin.svg';
// import Medium from '../../public/images/ic_medium.svg';

const AppFooter = ({ theme }) => (
  <div className="flex items-center justify-center lg:visible invisible">
    <p
      className={`${
        theme === 'light' ? 'text-white' : 'text-dark2'
      } text-xs animate__animated animate__fadeIn animate__delay-5s
    `}
    >
      ©{new Date().getFullYear()} Casper Members Portal
    </p>
  </div>
);

export default AppFooter;
