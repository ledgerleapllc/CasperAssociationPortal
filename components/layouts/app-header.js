import Image from 'next/image';
import Hamburger from '../../public/images/ic_hamburger.svg';

const AppHeader = ({ className, theme }) => (
  <div className={`flex items-center justify-between ${className || ''}`}>
    <Image
      className="animate__animated animate__fadeIn"
      src={`/images/casper_logo_${theme}.svg`}
      alt="casper logo"
      width={125}
      height={33}
    />
    <button
      className="animate__animated animate__fadeIn animate__delay-2s"
      type="button"
    >
      <Hamburger
        width={35}
        height={20}
        className={`${theme === 'light' ? 'text-white' : 'text-dark2'}`}
      />
    </button>
  </div>
);

export default AppHeader;
